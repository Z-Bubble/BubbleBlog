var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//登陆路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//文章详情页路由配置
router.get('/details',function(req,res){
  res.render('details',{})
})
//写文章页路由配置
router.get('/write',function(req,res){
  res.render('write',{})
})
//注册页路由配置
router.get('/regist',function(req,res){
  res.render('regist',{})
})
module.exports = router;
