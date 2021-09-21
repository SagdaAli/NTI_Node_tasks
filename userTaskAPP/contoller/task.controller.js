const Task=require('../models/task.model')
const User = require('../models/user.model')

//add task
const addTask=async(req,res)=>{
    try{
        const task = new Task({
            ...req.body,
            userAdded: req.user._id
        })
        if(req.body.position =="emp" || req.body.position =="ceo") throw new Error('not maneger')
        await task.save()
         
        res.status(200).send( { apiStatus:true, data:task, message:"data added"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: "error adding task" })
    } 
}

//assignTask
const assignTask=async(req,res)=>{
    
   try{
    
    if (req.user.position !="maneger" ) throw new Error('you are not maneger')
    const taskId=req.params.id
    const task =await Task.findById(taskId)
    if(!task) res.send('task not found')
    const assigned=await User.findOne({_id:req.body.empId,position:'emp'})
    if(!assigned) res.send('emp not found')
    task.assigned=req.body.empId    
    await task.save()

    res.status(200).send({
        apiStatus:true,
        data:task,
        message:"assigned successfuly"
    })
}
catch(e){
    res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error in assign task"
    })
}
    
}

//response
const uploadFile=async(req,res)=>{
    try{
        const user = req.user
        if(user.position == "manager") throw new Error('you are not amaneger')
        const task = await Task.findById(req.params.id)
         const response = {emp: user._id, file:req.file.filename}
         task.responses.push(response)
         await task.save()
         res.status(200).send({ 
            status:true, 
            data:task, 
            message: "Uploaded Successfully"
         })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in response file"
        })
    }
}
module.exports={
    addTask,
    assignTask,
    uploadFile
}