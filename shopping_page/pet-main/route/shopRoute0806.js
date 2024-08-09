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
  return products.map((product) => ({
    ...product,
    formats: product.formats ? product.formats.split(",") : [],
    productImgs: product.productImgs ? product.productImgs.split(",") : [],
  }));
}

// 將 conn.query 包裝成返回 Promise 的函數
const query = util.promisify(conn.query).bind(conn);
//首頁-查詢
router.get("/", async (req, res) => {
  try {
    //輪播
    const carouselevent = await query(
      "SELECT * FROM carouselevent WHERE startTime >= '2024-07-01' AND endTime <= '2024-07-31'"
    );
    //商品類別
    const productClass = await query(
      "SELECT productClassname, productClassimg FROM productclass"
    );
    //熱搜商品
    const productData = await query(`
      SELECT 
      ps.shid,
      MAX(ps.productId) AS productId,
      MAX(ps.productName) AS productName,
      MAX(ps.fhid) AS fhid,
      MAX(ps.bhId) AS bhId,
      MAX(ps.productContent) AS productContent,
      MAX(ps.productContentimg) AS productContentimg,
      MAX(ps.price) AS price,
      MAX(ps.productDiscount) AS productDiscount,
      MAX(ps.quantity) AS quantity,
      GROUP_CONCAT(DISTINCT pf.format) AS formats,
      GROUP_CONCAT(DISTINCT ps.productImg) AS productImgs
      FROM 
      productshop ps 
      JOIN 
      productformat pf ON ps.fhid = pf.fhid 
      WHERE 
      ps.shid IN (1,2,3,4,5,6)
      GROUP BY 
      ps.shid
      `);

    const products = splitFormatsAndImgs(productData);

    // console.log(products);
    //同品牌商品
    const brandData = await query(
      `SELECT 
      pb.bhId,
      pb.brand,
      ps.shid,
      MAX(ps.productId) AS productId,
      MAX(ps.productName) AS productName,
      MAX(ps.fhid) AS fhid,
      MAX(ps.productContent) AS productContent,
      MAX(ps.productContentimg) AS productContentimg,
      MAX(ps.price) AS price,
      MAX(ps.productDiscount) AS productDiscount,
      MAX(ps.quantity) AS quantity,
      GROUP_CONCAT(DISTINCT pf.format) AS formats,
      GROUP_CONCAT(DISTINCT ps.productImg) AS productImgs
      FROM 
      productbrand pb 
      JOIN 
      productshop ps ON pb.bhId = ps.bhId 
      JOIN 
      productformat pf ON ps.fhid = pf.fhid 
      WHERE 
      pb.bhId = 6
      GROUP BY 
      pb.bhId, ps.shid
      ORDER BY 
      ps.shid`
    );
    const brand = splitFormatsAndImgs(brandData);

    //購物車
    const cartItems = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId = ps.productId WHERE memberId = 2"
    );
    // console.log(products);
    res.json({
      carouselevent, //輪播
      productClass, //產品類別
      products, //熱搜產品
      brand, //同品牌商品
      cartItems, //購物車
      memberId: 2, //會員
    });
    // res.render("index.ejs", {
    //   carouselevent,
    //   productClass,
    //   products,
    //   brand,
    //   cartItems,
    //   memberId: 2,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
//首頁-增加和修改商品 //這裡要改成抓會員ID
router.post("/", async (req, res) => {
  const memberId = (req.body.memberId = 2); // 這裡要改成抓會員ID
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const pFormat = req.body.pFormat;
  // const price = req.body.price;
  // const totalPrice = req.body.quantity * price;
  // console.log(totalPrice);
  //總金額
  try {
    // 先檢查購物車內是否已經存在相同的商品
    const existingItem = await query(
      "SELECT * FROM cartitems WHERE memberId = ? AND productId = ? AND pFormat =?",
      [memberId, productId, pFormat]
    );

    if (existingItem.length > 0) {
      // 如果已經存在，則更新數量
      console.log(existingItem[0].cartQuantity);
      const cartItemsresult = await query(
        "UPDATE cartitems SET cartQuantity = ? WHERE memberId = ? AND productId = ? AND pFormat =?",
        [existingItem[0].cartQuantity + quantity, memberId, productId, pFormat]
      );
      // const cartItemsresult = await query(
      //   "UPDATE cartitems SET cartQuantity = ? WHERE memberId = ? AND productId = ?",
      //   [quantity, memberId, productId]
      // );
      //加入會員訂單
      // const orders = await query("", []);
      console.log(cartItemsresult);
      res.json({ message: "更新購物車成功" });
    } else {
      // 如果不存在，則新增商品到購物車 會員訂單 商品訂單
      const insertCartitems = await query(
        "INSERT INTO cartitems (memberId, productId, pFormat, cartQuantity) VALUES (?, ?, ?, ?)",
        [memberId, productId, pFormat, quantity]
      );

      console.log(insertCartitems);
      res.json({ message: "新增購物車成功,新增訂單成功" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "操作失敗" });
  }
});
//首頁-刪除
router.delete("/", async (req, res) => {
  const memberId = req.body.memberId;
  const productId = req.body.productId;

  try {
    const result = await query(
      "DELETE FROM cartitems WHERE memberId = ? AND productId = ?",
      [memberId, productId]
    );
    console.log(result);
    res.json({ message: "刪除成功" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "刪除失敗" });
  }
});

//創建訂單
router.post("/checkout", async (req, res) => {
  const memberId = (req.body.memberId = 2);
  try {
    // 獲取購物車項目
    const cartItems = await query(
      "SELECT * FROM cartitems WHERE memberId = ?",
      [memberId]
    );

    // 創建訂單
    const orderResult = await query(
      "INSERT INTO orders (memberId, totalPrice, status) VALUES (?, ?, 'pending')",
      [memberId, 0]
    );
    const orderId = orderResult.insertId;

    // 插入訂單項目並計算總價
    let totalPrice = 0;
    for (const item of cartItems) {
      const product = await query(
        "SELECT price FROM productshop WHERE productId = ?",
        [item.productId]
      );
      const itemPrice = product[0].price * item.cartQuantity;
      totalPrice += itemPrice;

      await query(
        "INSERT INTO orderitems (orderId, productId, orderQuantity) VALUES (?, ?, ?)",
        [orderId, item.productId, item.cartQuantity]
      );
    }

    // 更新訂單總價
    await query("UPDATE orders SET totalPrice = ? WHERE Id = ?", [
      totalPrice,
      orderId,
    ]);

    // 清空購物車 結帳完才清空購物車
    // await query("DELETE FROM cartitems WHERE memberId = ?", [memberId]);

    res.json({ success: true, orderId: orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "結帳失敗" });
  }
});

//訂單畫面
router.get("/order", async (req, res) => {
  const memberId = 2; // 假設會員ID為2，實際應該從session獲取
  try {
    const order = await query(
      "SELECT * FROM orders WHERE memberId = ? ORDER BY Id DESC LIMIT 1",
      [memberId]
    );
    const orderItems = await query(
      `
          SELECT 
              oi.*,
              ps.productName,
              ps.price,
              ps.productImg,
              pf.format AS productFormat
          FROM 
              orderitems oi 
          JOIN 
              productshop ps ON oi.productId = ps.productId 
          JOIN 
              productformat pf ON ps.fhid = pf.fhid
          WHERE 
              oi.orderId = ?
      `,
      [order[0].Id]
    );
    console.log(orderItems);
    res.json({
      orderItems: orderItems,
      totalPrice: order[0].totalPrice,
      memberId: memberId,
      orderId: order[0].Id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("獲取訂單詳情失敗");
  }
});
///

//購物車畫面
router.get("/cart", async (req, res) => {
  const memberId = (req.query.memberId = 2);
  try {
    const cartItems = await query(
      `SELECT 
          ps.productName, 
          ci.productId, 
          ci.cartQuantity,
          pf.format AS productFormat,
          ps.productImg,
          ps.price,
		      ps.productDiscount
      FROM 
          productshop ps
      JOIN 
          cartitems ci ON ci.productId = ps.productId
      JOIN 
          productformat pf ON ps.fhid = pf.fhid
      WHERE 
          ci.memberId = ?`,
      [memberId]
    );
    res.json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

//最後的結帳
router.post("/finalOrder", async (req, res) => {
  const memberId = (req.body.memberId = 2);
  const orderId = req.body.orderId;
  try {
    // 更新訂單狀態
    await query(
      "UPDATE orders SET status = 'paid off' WHERE Id = ? AND memberId = ?",
      [orderId, memberId]
    );

    // 清空購物車
    await query("DELETE FROM cartitems WHERE memberId = ?", [memberId]);

    res.json({ success: true, message: "訂單已完成結帳" });
  } catch (error) {
    console.error("Error finalizing order:", error);
    res.status(500).json({ success: false, message: "結帳過程中發生錯誤" });
  }
});
module.exports = router;
