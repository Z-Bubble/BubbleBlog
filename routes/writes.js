var express = require('express');
var router = express.Router();

//将用户模板导入
let Write = require('../models/write');

//添加博客接口
router.post('/add',(req,res,next)=>{
  console.log(req.body);
  let date = new Date();
    
    console.log(date);
    let writeInfo = {
        title:req.body.title,
        content:req.body.content,
        datetime:date,
      }
      //页面表单数据，放入模型
let writeI = new Write(writeInfo)

//保存
writeI.save((err,result)=>{
  if(!err){
    res.send(result)
  }
})
})


module.exports = router;