// const{Schema,Model,Mongoose} = require("mongoose")

let mongoose = require('../mongodb/db')
//Schema
let Schema = mongoose.Schema

let writeSchema = new Schema({
    title:String,
    content:String,
    author:String,
    datetime:Number,
})
//Model------将会生成数据库集合名（复数）
let Write = mongoose.model('writes',writeSchema)

module.exports = Write