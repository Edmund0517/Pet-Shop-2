const { render } = require("ejs");
var express = require("express");
var mysql = require("mysql");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//express使用ejs作為模板引擎
app.set("view engine", "ejs");
app.listen(3000);
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pet",
});

conn.connect(function (err) {
  if (err) {
    console.log(JSON.stringify(err));
    return;
  }
  console.log("connected");
});
// 首頁 缺購物車資料
app.get("/shop", function (req, res) {
  //   res.send("OK");
  //   res.render("index.ejs");
  conn.query(
    "SELECT * FROM carouselevent WHERE startTime >= '2024-07-01' AND endTime <= '2024-07-31'",
    [],
    function (error, rows) {
      if (error) {
        console.log(error);
      }
      var carouselevent = rows;
      //   res.json(data);
      conn.query(
        "SELECT  productClassname, productClassimg FROM productclass",
        [],
        function (error, rows) {
          if (error) {
            console.log(error);
          }
          var productClass = rows;
          conn.query(
            "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid WHERE shid IN (1,2,3,4,5,6)",
            [],
            function (error, rows) {
              if ((error, rows)) {
                console.log(error);
              }

              var product = rows;
              console.log(product);
              conn.query(
                "SELECT * FROM productbrand pb JOIN productshop ps ON pb.bhId = ps.bhId JOIN productformat pf ON ps.fhid = pf.fhid WHERE pb.bhId = 6",
                [],
                function (error, rows) {
                  if (error) {
                    console.log(error);
                  }
                  var brand = rows;
                  // res.json(carouselevent, productClass, product, brand);
                  // res.render("index", {
                  //   carouselevent,
                  //   productClass,
                  //   product,
                  //   brand,
                  // });
                  conn.query(
                    "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid JOIN cartitems ci ON ci.productId=ps.productId WHERE memberId = 2",
                    [],
                    function (error, rows) {
                      if (error) {
                        console.log(error);
                      }
                      let cartItems = rows;
                      console.log(cartItems);
                      res.send(cartItems);
                      // res.render("index", {
                      //   carouselevent,
                      //   productClass,
                      //   product,
                      //   brand,
                      //   cartItems,
                      // });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

//增加商品到購物車
app.post("/shop", function (req, res) {
  var memberId = req.body.memberId; //這裡改成抓會員ID
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  conn.query(
    "INSERT INTO cartitems (memberId, productId, quantity) VALUES (?, ?, ?)",
    [memberId, productId, quantity],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "失敗" });
      }
      console.log(result);
      res.status(200).json({ message: "成功" });
    }
  );
});

//篩選頁 缺價格調整功能 購物車資料
app.get("/shop/search/:productClass", [], function (req, res) {
  // res.render("search");
  //搜尋品牌
  conn.query("SELECT * FROM productbrand", [], function (error, rows) {
    if (error) {
      console.log(error);
    }
    let brand = rows;
    //搜尋tag
    conn.query("SELECT * FROM producttag", [], function (error, rows) {
      if (error) {
        console.log(error);
      }
      let tag = rows;
      //搜尋相對應class產品
      conn.query(
        "SELECT * FROM productshop ps JOIN productandclass pac ON ps.productId = pac.productId JOIN productclass pc ON pac.productClassId = pc.productClassId JOIN productformat pf ON ps.fhid = pf.fhid WHERE productClassname=?",
        [req.params.productClass],
        function (error, rows) {
          if (error) {
            console.log(error);
          }
          productClass = rows;
          console.log(productClass);
          res.render("search", { brand, tag, productClass });
        }
      );
    });
  });
});

//篩選頁 加入收藏新增資料

//搜尋商品 缺購物車資料
app.get("/shop/search/", (req, res) => {
  let word = req.query.name;
  let searchWord = `%${word}%`;
  console.log(word);
  conn.query(
    `SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid WHERE productName LIKE ?`,
    [searchWord],
    function (error, rows) {
      if (error) {
        console.log(error);
      }
      let word = rows;
      console.log(word);
    }
  );
  // res.render("search", { name})
});

//單項產品頁 缺購物車資料
app.get("/shop/product/:productId", [], (req, res) => {
  let productId = req.params.productId;
  conn.query(
    "SELECT * FROM productshop ps JOIN productformat pf ON ps.fhid = pf.fhid  WHERE productId=?",
    [productId],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      let product = rows;
      console.log(product);
      res.render("product", { product });
    }
  );
  // res.send(productId);
});
