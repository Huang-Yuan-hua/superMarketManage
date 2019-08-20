const express = require("express");
const router = express.Router();
const md5 = require("blueimp-md5");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");

const User = require("../../models/User");

//$router POST api/users/addAccount
//@desc   管理员添加新账号
//@access private
router.post("/addAccount", passport.authenticate("jwt", { session: false }), (req, res) => {
  // console.log(req.body.num)
  const users = {};
  users.name = "worker" + req.body.num;
  users.password = md5("123456");
  users.identity = "员工";
  users.avatar = "avatar.jpg"
  new User(users).save().then(users => {
    res.json(users);
  });
});

//$router POST api/users/resetPassword
//@desc   重置密码
//@access private
router.post(
  "/resetPassword/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { password: md5("123456") } },
      { new: true }
    ).then(user => {
      res.json(user);
    }).catch(err => res.status(404).json("密码重置失败！"));
  }
);

//$router POST api/users/changePassword
//@desc   修改密码
//@access private
router.post(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body)
    User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { password: md5(req.body.pass) } },
      { new: true }
    ).then(user => {
      res.json(user);
    }).catch(err => res.status(404).json("密码修改失败！"));
  }
);

//$router DELETE api/users/delete/:id
//@desc   删除账号
//@access private
router.delete(
  "/deleteAccount/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json("删除失败！"));
  }
);

//$router POST api/users/editAccount
//@desc   编辑当前账号
//@access private
router.post(
  "/editAccount/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const theUser = {};
    if (req.body.name) theUser.name = req.body.name;
    if (req.body.identity) theUser.identity = req.body.identity;
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: theUser },
      { new: true }
    ).then(user => {
      res.json(user);
    });
  }
);

//$router POST api/users/login
//@desc   返回请求的token jwt password
//@access public
router.post("/login", (req, res) => {
  // console.log(req.body)
  const { name, password } = req.body;
  //查询数据库是否存在该用户
  User.findOne({ name, password: md5(password) }, (err, user) => {
    if (user) {
      const rule = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        identity: user.identity
      };
      jwt.sign(
        rule,
        "secret",
        { expiresIn: 1000 * 60 * 60 * 24 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token,
            code: 0,
            msg: "欢迎使用超市收支管理系统！"
          });
        }
      );
    } else {
      res.json({ code: 1, msg: "用户名或密码不正确！" });
    }
  });
});

//$router POST api/users/getUserInfo
//@desc   获取当前用户信息接口
//@access private
router.get(
  "/getUserInfo/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.user_id })
      .then(userInfo => {
        if (userInfo) {
          res.json(userInfo);
        } else {
          res.status(404).json("没有任何内容！");
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router GET api/getUsers
//@desc   获取所有账号信息接口
//@access private
router.get(
  "/getUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ identity: "员工" })
      .then(user => {
        if (!user) res.status(404).json("没有任何内容！");
        res.json(user);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router GET api/users/infoEdit
//@desc   返回userinfo
//@access private
router.post(
  "/infoEdit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const infoFields = {};
    if (req.body.formData.name) infoFields.name = req.body.formData.name;
    if (req.body.formData.phoneNumber)
      infoFields.phoneNumber = req.body.formData.phoneNumber;
    if (req.body.formData.email) infoFields.email = req.body.formData.email;
    if (req.body.formData.motto) infoFields.motto = req.body.formData.motto;
    if (req.body.avatar) infoFields.avatar = req.body.avatar;
    User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $set: infoFields },
      { new: true }
    ).then(info => {
      res.json(info);
    });
  }
);

// const moment = require("moment");
var timestamp = "";
// var timepath = moment().format("YYYY-MM-DD");
var destination = "../../../client/src/assets/avatar";
var filename = "";

var storage = multer.diskStorage({
  //这里destination是一个字符串
  destination: "." + destination,
  filename: (req, file, cb) => {
    //自定义设置文件的名字
    timestamp = new Date().getTime();
    filename = "avatar-" + timestamp + "." + file.originalname.split(".")[1];
    cb(null, filename);
  }
});

var upload = multer({
  storage: storage
});

//处理来自页面的axios请求。单文件上传
//多文件上传使用upload.array('file', number)
router.post("/file", upload.single("file"), (req, res, next) => {
  //拼接文件上传后的路径
  // var url = "http://" + req.headers.host + destination + filename;
  var url = filename;
  res.json({
    code: true,
    msg: "上传成功",
    imageUrl: url
  });
});

module.exports = router;
