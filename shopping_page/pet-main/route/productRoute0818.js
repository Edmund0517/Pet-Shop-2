const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pet",
});

//把formats和productImgs內容用逗號隔開
function splitFormatsAndImgs(products) {
  return products.map((product) => {
    const splitAndTrim = (str) =>
      str ? str.split(",").map((item) => item.trim()) : [];
    const splitAndTrimAndParseFloat = (str) =>
      str ? str.split(",").map((item) => parseFloat(item.trim())) : [];

    return {
      ...product,
      productIds: splitAndTrim(product.productId),
      formats: splitAndTrim(product.formats),
      fhids: splitAndTrim(product.fhids),
      prices: splitAndTrimAndParseFloat(product.prices),
      discounts: splitAndTrimAndParseFloat(product.discounts),
      productImgs: splitAndTrim(product.productImgs),
    };
  });
}

// 將 conn.query 包裝成返回 Promise 的函數
const query = util.promisify(conn.query).bind(conn);

// 獲取所有商品
router.get("/products", async (req, res) => {
  try {
    const brands = await query("SELECT * FROM productbrand");
    const tags = await query("SELECT * FROM producttag");

    const products = await query(`
      SELECT 
        ps.shid,
        GROUP_CONCAT(DISTINCT ps.productId ORDER BY pf.fhid) AS productId,
        MAX(ps.productName) AS productName,
        MAX(ps.bhId) AS bhId,
        MAX(ps.productContent) AS productContent,
        MAX(ps.productContentimg) AS productContentimg,
        MAX(ps.quantity) AS quantity,
        GROUP_CONCAT(pf.format ORDER BY pf.fhid) AS formats,
        GROUP_CONCAT(pf.fhid ORDER BY pf.fhid) AS fhids,
        GROUP_CONCAT(ps.price ORDER BY pf.fhid) AS prices,
        GROUP_CONCAT(ps.productDiscount ORDER BY pf.fhid) AS discounts,
        GROUP_CONCAT(ps.productImg ORDER BY pf.fhid) AS productImgs
      FROM 
        productshop ps
      JOIN 
        productformat pf ON ps.fhid = pf.fhid
      GROUP BY 
        ps.shid
    `);
    // console.log("Products before sending:", products);
    // res.json({
    //   products: splitFormatsAndImgs(products),
    //   memberId: req.body.memberId || 2, // req.session.memberId || 2假設使用 session，或者硬編碼為 2
    //   brands: brands,
    //   tags: tags,
    // });
    res.json({
      products: splitFormatsAndImgs(products),
      memberId: req.body.memberId || 2, // req.session.memberId || 2假設使用 session，或者硬編碼為 2
      brands: brands,
      tags: tags,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "獲取商品列表失敗" });
  }
});

// 篩選商品
router.post("/products/filter", async (req, res) => {
  const { brands, tags } = req.body;
  try {
    let sqlQuery = `
      SELECT 
        main.shid,
        main.productId,
        main.productName,
        main.bhId,
        main.productContent,
        main.productContentimg,
        main.quantity,
        main.formats,
        main.fhids,
        GROUP_CONCAT(prices.price ORDER BY prices.productId) AS prices,
        GROUP_CONCAT(prices.productDiscount ORDER BY prices.productId) AS discounts,
        main.productImgs
      FROM (
        SELECT 
          ps.shid,
          GROUP_CONCAT(DISTINCT ps.productId ORDER BY ps.productId) AS productId,
          MAX(ps.productName) AS productName,
          MAX(ps.bhId) AS bhId,
          MAX(ps.productContent) AS productContent,
          MAX(ps.productContentimg) AS productContentimg,
          MAX(ps.quantity) AS quantity,
          GROUP_CONCAT(DISTINCT pf.format ORDER BY ps.productId) AS formats,
          GROUP_CONCAT(DISTINCT pf.fhid ORDER BY ps.productId) AS fhids,
          GROUP_CONCAT(DISTINCT ps.productImg ORDER BY ps.productId) AS productImgs
        FROM 
          productshop ps
        JOIN 
          productformat pf ON ps.fhid = pf.fhid
        LEFT JOIN
          productandtag pt ON ps.productId = pt.productId
        ${brands && brands.length > 0 ? "WHERE ps.bhId IN (?)" : ""}
        ${
          tags && tags.length > 0
            ? (brands && brands.length > 0 ? "AND" : "WHERE") +
              " pt.productTagId IN (?)"
            : ""
        }
        GROUP BY 
          ps.shid
        ${
          tags && tags.length > 0
            ? "HAVING COUNT(DISTINCT pt.productTagId) = ?"
            : ""
        }
      ) AS main
      JOIN (
        SELECT DISTINCT productId, price, productDiscount
        FROM productshop
      ) AS prices ON FIND_IN_SET(prices.productId, main.productId)
      GROUP BY 
        main.shid
    `;

    const values = [];
    if (brands && brands.length > 0) values.push(brands);
    if (tags && tags.length > 0) {
      values.push(tags);
      values.push(tags.length);
    }

    const products = await query(sqlQuery, values);
    res.json({ products: splitFormatsAndImgs(products) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "篩選商品失敗" });
  }
});
module.exports = router;
