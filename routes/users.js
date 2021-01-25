var express = require('express');
var router = express.Router();
let Joi = require('joi');

//将用户模板导入
let User = require('../models/user')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
router.post('/adduser',(req, res, next)=>{
  
  console.log(req.body);
//用户填写的表单信息可以通过req.body获取到

//res.send('注册了')

/**
 * 向数据库添加用户信息
 */
let userInfo = {
  username:req.body.username,
  password:req.body.password,
  passwordC:req.body.passwordC,
  
}


// //用户验证(用户密码与确认密码是否一致的验证)
// if (userInfo.password !== userInfo.passwordC) {
//   // console.log('密码不一致');
//   let error = {
//     status:0,//错误编码
//     stack:''//错误代码
//   }
//   res.render('error',{error,message:'密码不一致'})
  
// }



// /**
//  * 处理验证的最佳时期
//  * Joi验证
//  */
// // 2,定义规则
// let JoiSchema = Joi.object({
//   username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
//   password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
//   passwordC:Joi.ref('password')
// })
// //验证数据
// // let message = JoiSchema.validate(userInfo)
// // console.log(message.value);

// const message
// try {
//   const value = await JoiSchema.validateAsync(userInfo)
// } catch (err) {
//   console.log(err.message);

//   //响应结果
// //res.render('error_alert',{message})
// }



//页面表单数据，放入模型
let userI = new User(userInfo)

//保存
userI.save((err,result)=>{
  if(!err){
    res.send(result)
  }
})

})



//登录-------查询
router.post('/login',(req,res,next)=>{
  //从表单获取数据
let userinfo = {
  username:req.body.username,
  password:req.body.password,
}
console.log(req.body);
  //验证
  //查询
  User.findOne(userinfo,(err,result)=>{
    // err?console.log('error'+err):console.log(result);
    //错误处理
    if (err) {
      return console.log(err);
    }
    if (result == null) {
      console.log('登陆失败');
      //重定向到注册页
      res.redirect('/regist')
    } else{
      //将用户信息存储
      req.session.username = userinfo.username

      console.log('登陆成功');
      //重定向到首页
      res.redirect('/')
    }
    
  })
    //查询到-----登陆成功------跳转到首页
    //查询不到，重定向注册页面，去测
})




module.exports = router;
