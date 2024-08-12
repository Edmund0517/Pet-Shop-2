const { render } = require("ejs");
var express = require("express");
const cors = require('cors');
var mysql = require("mysql");
var app = express();
//測試0805
const shopRoute = require("./route/shopRoute0811"); //後面放shop路徑

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //express使用ejs作為模板引擎
app.set("view engine", "ejs");
app.use(cors());

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

app.use("/shop", shopRoute);
app.get("*", (req, res) => {
  res.status(404).send("錯誤頁面喔。。。");
});
app.listen(8000, () => {
  console.log("伺服器正在聆聽port 8000~~");
});
