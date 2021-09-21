const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    userAdded:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       // required:true
    },
    assigned:[
       {assigned:{type:String}}
],
    taskTitle:{
        type:String,
        trim:true,
        required:true,
        maxLength:50
    },
    taskContent:{
        type:String,
        trim:true,
        required:true,
        maxLength:500
    },
    responses:[
        {
            emp:{},
            file:{}

        }
    ]


},{timestamps:true})

const Task=mongoose.model('Task',taskSchema)
module.exports=Task