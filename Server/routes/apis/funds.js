const express = require("express");
const router = express.Router();
const passport = require("passport");

const FundData = require("../../models/FundData");

//$router POST api/funds/add
//@desc   添加信息接口
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const fundFields = {};
    if (req.body.type) fundFields.type = req.body.type;
    if (req.body.describe) fundFields.describe = req.body.describe;
    if (req.body.income) fundFields.income = req.body.income;
    if (req.body.expend) fundFields.expend = req.body.expend;
    if (req.body.cash) fundFields.cash = req.body.cash;
    if (req.body.remark) fundFields.remark = req.body.remark;
    new FundData(fundFields).save().then(fund => {
      res.json({ code: 0, msg: "添加成功！" });
    }).catch(err => res.status(404).json("添加失败！"));
  }
);

//$router GET api/funds
//@desc   获取所有信息接口
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    FundData.find()
      .then(fund => {
        if (!fund) res.status(404).json("没有任何内容！");
        res.json(fund);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router POST api/funds/:id
//@desc   获取单个信息接口
//@access private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    FundData.findOne({ _id: req.params.id })
      .then(fund => {
        if (!fund) res.status(404).json("没有任何内容！");
        res.json(fund);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router POST api/funds/edit
//@desc   编辑信息接口
//@access private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const fundFields = {};
    if (req.body.type) fundFields.type = req.body.type;
    if (req.body.describe) fundFields.describe = req.body.describe;
    if (req.body.income) fundFields.income = req.body.income;
    if (req.body.expend) fundFields.expend = req.body.expend;
    if (req.body.cash) fundFields.cash = req.body.cash;
    if (req.body.remark) fundFields.remark = req.body.remark;
    FundData.findOneAndUpdate(
      { _id: req.params.id },
      { $set: fundFields },
      { new: true }
    ).then(fund => {
      res.json({ code: 0, msg: "修改成功！" });
    })
      .catch(err => res.status(404).json("修改失败！"));
  }
);

//$router DELETE api/funds/delete/:id
//@desc   删除信息接口
//@access private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    FundData.findOneAndRemove({ _id: req.params.id })
      .then(fund => {
        fund.save().then(fund => { res.json({ code: 0, msg: "删除成功！" }); });
      })
      .catch(err => res.status(404).json("删除失败！"));
  }
);

module.exports = router;
