var express = require('express');
var router = express.Router();

//文章模块导入
let Write = require('../models/write');

let moment = require('moment')

/* GET home page. */
router.get('/', async function(req, res, next) {

  let cPage = req.query.page || 1
  //console.log(cPage);
  // let data = await Write.find()
  // console.log(data);

  let username = req.session.username || ''

  let data = {
    blogList:[],//文章列表
    currPage:cPage,//当前页数
    PageTotle:'',//总页数
  }

  //设定每页渲染的跳数
  let PageSize = 2

  //确定每页显示的数据
  data.blogList = await Write.find()
  .limit(PageSize)//限定展示出来的条数
  .sort({_id:'desc'})//倒叙
  .skip((data.currPage - 1)*PageSize)//限定从第几条开始截取

  //总数据
  let blogAll = await Write.find()
  //总页码
  data.PageTotle = Math.ceil(blogAll.length/PageSize)
  //console.log(data.PageTotle);

  //将所有的时间戳转换成时间
  data.blogList.map(item => {
    let a = moment(item.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    item.time = a
  })

  res.render('index', { username,data });
});
//登陆路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//文章详情页路由配置
router.get('/details',async function(req,res){
  let id = req.query._id
  console.log(id);

 
  let data = await Write.findOne({_id:id}) 

  data['time'] = moment(data.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')

  let username = req.session.username || ''
  res.render('details',{username,data})
})
//写文章页路由配置
router.get('/write',async function(req,res){
  let username = req.session.username || ''

  let id = req.query._id || ''
  
  
  if (id) {
    let page = req.query.page
    console.log(id);
    console.log(page);
    //文章数据查询渲染
    let dataa = await Write.findOne({_id:id}) 
    //时间处理
    dataa['time'] = moment(dataa.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    res.render('write',{username,dataa})
  }else{
    res.render('write',{username})
  }
  
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
