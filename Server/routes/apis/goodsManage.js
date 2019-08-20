const express = require("express");
const router = express.Router();
const passport = require("passport");

const GoodsSell = require("../../models/GoodsSell");
const Meter = require("../../models/Meter");
const SellData = require("../../models/SellData")
const StockData = require("../../models/StockData")

//$router GET api/goodsManage/goodsSell/getMeters
//@desc   获取表头数据
//@access private
router.get(
  "/goodsSell/getMeters",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Meter.find().populate('labels')//同时查询关联的多个表格
      .then(meters => {
        if (!meters) res.status(404).json("没有任何内容！");
        res.json(meters);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router GET api/goodsManage/goodsSell/getSellDatas
//@desc   获取销售数据
//@access private
router.get(
  "/goodsSell/getSellDatas",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    SellData.find()
      .then(datas => {
        if (!datas) res.status(404).json("没有任何内容！");
        res.json(datas);
      })
      .catch(err => res.status(404).json(err));
  }
);


//$router GET api/goodsManage/goodsStock/getStockDatas
//@desc   获取库存信息数据
//@access private
router.get(
  "/goodsStock/getStockDatas",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StockData.find()
      .then(stockDatas => {
        if (!stockDatas) res.status(404).json("没有任何内容！");
        res.json(stockDatas);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router POST api/goodsManage/goodsStock/addStockDatas
//@desc   添加库存商品库存信息
//@access private
router.post(
  "/goodsStock/addStockDatas",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const stockDataFields = {};
    if (req.body.type) stockDataFields.type = req.body.type;
    if (req.body.name) stockDataFields.name = req.body.name;
    if (req.body.amount) stockDataFields.amount = req.body.amount;
    if (req.body.price) stockDataFields.price = req.body.price;
    if (req.body.place) stockDataFields.place = req.body.place;
    if (req.body.remark) stockDataFields.remark = req.body.remark;
    new StockData(stockDataFields).save().then(stockDatas => {
      res.json(stockDatas);
      // console.log(stockDatas)
    });
  }
);

//$router POST api/goodsManage/goodsStock/:id
//@desc   获取单个商品库存信息
//@access private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StockData.findOne({ _id: req.params.id })
      .then(stockDatas => {
        if (!stockDatas) res.status(404).json("没有任何内容！");
        res.json(stockDatas);
      })
      .catch(err => res.status(404).json(err));
  }
);

//$router POST api/goodsManage/goodsStock/edit
//@desc   编辑商品库存信息
//@access private
router.post(
  "/goodsManage/goodsStock/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const stockDataFields = {};
    if (req.body.type) stockDataFields.type = req.body.type;
    if (req.body.name) stockDataFields.name = req.body.name;
    if (req.body.amount) stockDataFields.amount = req.body.amount;
    if (req.body.price) stockDataFields.price = req.body.price;
    if (req.body.place) stockDataFields.place = req.body.place;
    if (req.body.remark) stockDataFields.remark = req.body.remark;
    StockData.findOneAndUpdate(
      { _id: req.params.id },
      { $set: stockDataFields },
      { new: true }
    ).then(stockDatas => {
      res.json(stockDatas);
    });
  }
);

//$router DELETE api/goodsManage/goodsStock/delete/:id
//@desc   删除商品库存信息
//@access private
router.delete(
  "/goodsManage/goodsStock/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StockData.findOneAndRemove({ _id: req.params.id })
      .then(stockDatas => {
        stockDatas.save().then(stockDatas => res.json(stockDatas));
      })
      .catch(err => res.status(404).json("删除失败！"));
  }
);


module.exports = router;
