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
  if (!Array.isArray(products)) {
    console.error("splitFormatsAndImgs received non-array:", products);
    return [];
  }
  return products.map((product) => {
    return {
      ...product,
      productIds: product.productId
        ? product.productId.split(",").map((productId) => productId.trim())
        : [],
      formats: product.formats
        ? product.formats.split(",").map((format) => format.trim())
        : [],
      fhids: product.fhids
        ? product.fhids.split(",").map((fhid) => fhid.trim())
        : [],
      prices: product.prices
        ? product.prices.split(",").map((price) => Number(price))
        : [],
      discounts: product.discounts
        ? product.discounts.split(",").map((discount) => Number(discount))
        : [],
      productImgs: product.productImgs ? product.productImgs.split(",") : [],
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
    // res.render("products", {
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
        ps.shid,
        GROUP_CONCAT(DISTINCT ps.productId ORDER BY pf.fhid) AS productId,
        MAX(ps.productName) AS productName,
        MAX(ps.bhId) AS bhId,
        MAX(ps.productContent) AS productContent,
        MAX(ps.productContentimg) AS productContentimg,
        MAX(ps.quantity) AS quantity,
        GROUP_CONCAT(DISTINCT pf.format ORDER BY pf.fhid) AS formats,
        GROUP_CONCAT(DISTINCT pf.fhid ORDER BY pf.fhid) AS fhids,
        GROUP_CONCAT(DISTINCT ps.price ORDER BY pf.fhid) AS prices,
        GROUP_CONCAT(DISTINCT ps.productDiscount ORDER BY pf.fhid) AS discounts,
        GROUP_CONCAT(DISTINCT ps.productImg ORDER BY pf.fhid) AS productImgs
      FROM 
        productshop ps
      JOIN 
        productformat pf ON ps.fhid = pf.fhid
      JOIN
        productandtag pt ON ps.productId = pt.productId
    `;

    const conditions = [];
    const values = [];

    if (brands && brands.length > 0) {
      conditions.push("ps.bhId IN (?)");
      values.push(brands);
    }

    if (tags && tags.length > 0) {
      conditions.push("pt.productTagId IN (?)");
      values.push(tags);
    }

    if (conditions.length > 0) {
      sqlQuery += " WHERE " + conditions.join(" AND ");
    }

    sqlQuery += " GROUP BY ps.shid";

    const products = await query(sqlQuery, values);
    console.log("Products before sending:", products);
    res.json({ products: splitFormatsAndImgs(products) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "篩選商品失敗" });
  }
});
module.exports = router;
