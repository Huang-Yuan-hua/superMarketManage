const express = require("express");
const router = express.Router();
const passport = require("passport");

const Announce = require("../../models/Announce");

//$router POST api/announces/add
//desc 添加通告接口
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const announcesFileds = {};
    if (req.body.title) announcesFileds.title = req.body.title;
    if (req.body.tooltip) announcesFileds.tooltip = req.body.tooltip;
    if (req.body.content) announcesFileds.content = req.body.content;
    announcesFileds.thumbs = "0";
    announcesFileds.thumbsupUsers = "";
    new Announce(announcesFileds).save().then(announce => {
      res.json(announce);
    });
  }
);

//$router GET api/announces/thumbsup
//@desc  点赞接口
//@access private
router.post(
  "/thumbsup/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const announcesFileds = {};
    if (req.body.thumbs) announcesFileds.thumbs = req.body.thumbs;
    Announce.findOneAndUpdate(
      { _id: req.params.id },
      { $set: announcesFileds },
      { new: true }
    ).then(announce => {
      res.json(announce);
    });
    // const user_id = req.body.user_id;
    // Announce.findOne({ _id: req.params.id }).then(announce => {
    //   //判断查找到的被点赞announce的thumbsupUser（所有点过赞的用户id）中是否有当前用户id
    //   let flag = announce.thumbsupUsers === /^.*user_id*$/ ? true : false;
    //   if (flag) {
    //     //thumbsupUsers中有当前用户id
    //     Announce.update(
    //       { thumbsupUsers: /^.*user_id*$/ },
    //       { $unset: { user_id: "" } }
    //     ).then(announce => {
    //       res.json({ announce }, { code: 1 });
    //     });
    //     announcesFileds.thumbs = req.body.thumbs - 1;
    //   } else {
    //     //thumbsupUsers中没有有当前用户id
    //     Announce.update({ _id: req.params.id }, { $set: { user_id: "" } });
    //     announcesFileds.thumbs = req.body.thumbs + 1;
    //   }
    //   Announce.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { $set: announcesFileds },
    //     { new: true }
    //   );
    // });
  }
);

//$router GET api/announces
//@desc   获取所有公告接口
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Announce.find()
      .then(announce => {
        if (!announce) res.status(404).json("没有任何内容！");
        res.json(announce);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router GET api/announces/:id
//@desc   获取单个公告接口
//@access private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Announce.findOne({ _id: req.params.id })
      .then(announce => {
        if (!announce) res.status(404).json("没有任何内容！");
        res.json(announce);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router POST api/announces/edit
//@desc   编辑公告接口
//@access private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const announcesFileds = {};
    if (req.body.title) announcesFileds.title = req.body.title;
    if (req.body.tooltip) announcesFileds.tooltip = req.body.tooltip;
    if (req.body.content) announcesFileds.content = req.body.content;
    Announce.findOneAndUpdate(
      { _id: req.params.id },
      { $set: announcesFileds },
      { new: true }
    ).then(announce => {
      res.json(announce);
    });
  }
);

//$router DELETE api/announces/delete/:id
//@desc   删除公告接口
//@access private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Announce.findOneAndRemove({ _id: req.params.id })
      .then(announce => {
        announce.save().then(announce => res.json(announce));
      })
      .catch(err => res.status(404).json("删除失败！"));
  }
);

module.exports = router;
