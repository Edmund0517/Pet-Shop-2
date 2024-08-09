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

    console.log(products);
    //購物車
    const cartItems = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId = ps.productId WHERE memberId = 2"
    );

    res.status(200).json({
      carouselevent, //輪播
      productClass, //產品類別
      products, //熱搜產品
      brand, //同品牌商品
      cartItems, //購物車
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
//首頁-增加和修改商品 //這裡要改成抓會員ID
router.post("/", async (req, res) => {
  const memberId = req.body.memberId; // 這裡要改成抓會員ID
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const totalPrice = req.body.quantity * price;
  console.log(totalPrice);
  //總金額
  try {
    // 先檢查購物車內是否已經存在相同的商品
    const existingItem = await query(
      "SELECT * FROM cartitems WHERE memberId = ? AND productId = ?",
      [memberId, productId]
    );

    if (existingItem.length > 0) {
      // 如果已經存在，則更新數量
      const cartItemsresult = await query(
        "UPDATE cartitems SET cartQuantity = ? WHERE memberId = ? AND productId = ?",
        [quantity, memberId, productId]
      );
      //加入會員訂單
      // const orders = await query("", []);
      console.log(cartItemsresult);
      res.json({ message: "更新購物車成功" });
    } else {
      // 如果不存在，則新增商品到購物車 會員訂單 商品訂單
      const insertCartitems = await query(
        "INSERT INTO cartitems (memberId, productId, cartQuantity) VALUES (?, ?, ?)",
        [memberId, productId, quantity]
      );
      // const insertOrders = await query(
      //   "INSERT INTO orders(memberId, totalPrice, status) VALUES (?,?,'noPay')",
      //   [memberId, totalPrice]
      // );

      console.log(insertCartitems, insertOrders);
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

//搜尋商品頁
router.get("/search", async (req, res) => {
  const word = `%${req.query.name}%`;
  console.log(word);
  try {
    //品牌
    const brand = await query("SELECT * FROM productbrand", []);
    //tag
    const tag = await query("SELECT * FROM producttag", []);
    //購物車
    const cartItems = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId = ps.productId WHERE memberId = 2"
    );
    //搜尋到的產品
    const searchWord = await query(
      `SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid WHERE productName LIKE ?`,
      [word]
    );
    res.json({
      brand, //品牌
      tag, //關鍵字
      searchWord, //搜尋到的產品
      cartItems, //購物車
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!!!");
  }
});
//搜尋商品頁-增加和修改商品 //這裡要改成抓會員ID
router.post("/search", async (req, res) => {
  const memberId = req.body.memberId; // 這裡要改成抓會員ID
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    // 先檢查購物車內是否已經存在相同的商品
    const existingItem = await query(
      "SELECT * FROM cartitems WHERE memberId = ? AND productId = ?",
      [memberId, productId]
    );

    if (existingItem.length > 0) {
      // 如果已經存在，則更新數量
      const result = await query(
        "UPDATE cartitems SET quantity = ? WHERE memberId = ? AND productId = ?",
        [quantity, memberId, productId]
      );
      console.log(result);
      res.json({ message: "更新成功" });
    } else {
      // 如果不存在，則新增商品
      const result = await query(
        "INSERT INTO cartitems (memberId, productId, quantity) VALUES (?, ?, ?)",
        [memberId, productId, quantity]
      );
      console.log(result);
      res.json({ message: "新增成功" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "操作失敗" });
  }
});
//搜尋商品頁-刪除
router.delete("/search", async (req, res) => {
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

//商品class篩選頁
router.get("/search/class/:productClass", async (req, res) => {
  try {
    const brand = await query("SELECT * FROM productbrand", []);
    const tag = await query("SELECT * FROM producttag", []);
    const productClass = await query(
      "SELECT * FROM productshop ps JOIN productandclass pac ON ps.productId = pac.productId JOIN productclass pc ON pac.productClassId = pc.productClassId JOIN productformat pf ON ps.fhid = pf.fhid WHERE productClassname=?",
      [req.params.productClass]
    );
    //購物車
    const cartItems = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId = ps.productId WHERE memberId = 2"
    );
    res.json({
      brand, //品牌
      tag, //標籤
      productClass, //篩選出類別的商品
      cartItems, //購物車
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "失敗" });
  }
});
//商品class篩選頁-增加和修改商品 //這裡要改成抓會員ID
router.post("/search/class/:productClass", async (req, res) => {
  const memberId = req.body.memberId; // 這裡要改成抓會員ID
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    // 先檢查購物車內是否已經存在相同的商品
    const existingItem = await query(
      "SELECT * FROM cartitems WHERE memberId = ? AND productId = ?",
      [memberId, productId]
    );

    if (existingItem.length > 0) {
      // 如果已經存在，則更新數量
      const result = await query(
        "UPDATE cartitems SET quantity = ? WHERE memberId = ? AND productId = ?",
        [quantity, memberId, productId]
      );
      console.log(result);
      res.json({ message: "更新成功" });
    } else {
      // 如果不存在，則新增商品
      const result = await query(
        "INSERT INTO cartitems (memberId, productId, quantity) VALUES (?, ?, ?)",
        [memberId, productId, quantity]
      );
      console.log(result);
      res.json({ message: "新增成功" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "操作失敗" });
  }
});
//商品class篩選頁-刪除
router.delete("/search/class/:productClass", async (req, res) => {
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

//單項產品頁
router.get("/search/product/:productId", async (req, res) => {
  try {
    //品牌
    const brand = await query("SELECT * FROM productbrand", []);
    //tag
    const tag = await query("SELECT * FROM producttag", []);
    //單項產品
    const productId = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid  WHERE productId=?",
      [req.params.productId]
    );
    //購物車
    const cartItems = await query(
      "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId = ps.productId WHERE memberId = 2"
    );
    res.json({
      brand, //品牌
      tag, //關鍵字
      productId, //產品ID
      cartItems, //購物車
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
//單項產品頁-商品加入購物車 //這裡要改成抓會員ID
router.post("/search/product/:productId", async (req, res) => {
  const memberId = req.body.memberId; // 這裡要改成抓會員ID
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    // 先檢查購物車內是否已經存在相同的商品
    const existingItem = await query(
      "SELECT * FROM cartitems WHERE memberId = ? AND productId = ?",
      [memberId, productId]
    );

    if (existingItem.length > 0) {
      // 如果已經存在，則更新數量
      const result = await query(
        "UPDATE cartitems SET quantity = ? WHERE memberId = ? AND productId = ?",
        [quantity, memberId, productId]
      );
      console.log(result);
      res.json({ message: "更新成功" });
    } else {
      // 如果不存在，則新增商品
      const result = await query(
        "INSERT INTO cartitems (memberId, productId, quantity) VALUES (?, ?, ?)",
        [memberId, productId, quantity]
      );
      console.log(result);
      res.json({ message: "新增成功" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "操作失敗" });
  }
});
//單項產品頁-刪除
router.delete("/search/product/:productId", async (req, res) => {
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

//多個tag篩選頁
// router.get("/search/product/tag", async (req, res) => {
//   productTagId = req.body.tag1;
//   try {
//     const productId = await query(
//       "SELECT * FROM `producttag` WHERE `productTagId` IN (?) ",
//       []
//     );

//     res.json({
//       productId, //產品ID
//     });
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

//訂單頁
// router.get("/order", async (req, res) => {
//   try {
//     const order = await query(
//       "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN orderitems oi ON ps.productId=oi.productId JOIN orders od ON od.orderId=oi.orderIdWHERE memberId=2",
//       [memberId]
//     );
//   } catch (error) {}
// });

module.exports = router;
