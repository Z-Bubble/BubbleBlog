var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let username = req.session.username || ''
  res.render('index', { username });
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
