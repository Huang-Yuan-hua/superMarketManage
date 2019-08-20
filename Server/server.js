const express = require("express");
const mogoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
//引入路由接口文件
const users = require("./routes/apis/users");
const funds = require("./routes/apis/funds");
const announces = require("./routes/apis/announces");
const goodsManage = require("./routes/apis/goodsManage");

//使用body-parser中间件
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

//数据库链接
mogoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("mongodb connected!"))
  .catch(err => console.log(err));

//初始化passport
app.use(passport.initialize());
require("./config/passport")(passport);

//使用routes
app.use("/api/users", users);
app.use("/api/funds", funds);
app.use("/api/announces", announces);
app.use("/api/goodsManage", goodsManage);

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
