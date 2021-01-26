var express = require('express');
var router = express.Router();

//文章模块导入
let Write = require('../models/write');

/* GET home page. */
router.get('/', async function(req, res, next) {

  let data = await Write.find()
  console.log(data);

  let username = req.session.username || ''

  res.render('index', { username,data });
});
//登陆路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//文章详情页路由配置
router.get('/details',function(req,res){
  let username = req.session.username || ''
  res.render('details',{username})
})
//写文章页路由配置
router.get('/write',function(req,res){
  let username = req.session.username || ''
  res.render('write',{username})
})
//注册页路由配置
router.get('/regist',function(req,res){
  res.render('regist',{})
})

//0000001页路由配置
router.get('/0000001',function(req,res){
  res.render('0000001',{})
})
module.exports = router;
