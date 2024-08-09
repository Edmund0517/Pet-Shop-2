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
// 首頁
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
            "SELECT * FROM `productshop` WHERE `shid`IN (1,2,3,4,5,6)",
            [],
            function (error, rows) {
              if ((error, rows)) {
                console.log(error);
              }
              var product = rows;
              conn.query(
                "SELECT * FROM  productbrand pb JOIN productshop ps ON pb.bhId=ps.bhId WHERE pb.bhId =6",
                [],
                function (error, rows) {
                  if (error) {
                    console.log(error);
                  }
                  var brand = rows;
                  console.log(brand);
                  res.render("index", {
                    carouselevent,
                    productClass,
                    product,
                    brand,
                  });
                }
              );
              // res.json(data);
            }
          );
        }
      );
    }
  );
});

//篩選頁
app.get("/shop/search/:productClass", [], function (req, res) {
  // res.render("search");
  conn.query("SELECT * FROM productbrand", [], function (error, rows) {
    if (error) {
      console.log(error);
    }
    let brand = rows;
    conn.query("SELECT * FROM producttag", [], function (error, rows) {
      if (error) {
        console.log(error);
      }
      let tag = rows;
      conn.query(
        "SELECT * FROM productshop ps JOIN productandclass pac ON ps.productId = pac.productId JOIN productclass pc ON pac.productClassId = pc.productClassId WHERE productClassname=?",
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

//搜尋商品
app.get("/shop/search/", (req, res) => {
  // let word = req.query;
  conn.query(
    "SELECT * FROM productshop WHERE productName LIKE '%野起來%'",
    [],
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
