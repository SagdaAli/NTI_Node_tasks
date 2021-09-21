const User =require('../models/user.model')


//add user
const addUser=async(req,res)=>{
    try{
        const userData = new User(req.body)
        await userData.save()
        
        res.status(200).send({
            apiStatus:true,
            data:userData,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}

//profile
const me=async(req,res)=>{
    res.send(req.user)
}

//login
const login=async(req,res)=>{
    try{
        let user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ 
            apiStatus:true, 
            data:{user, token}, 
            message:"logged in" })
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message:"cannot login" })
    }
}
//logout
const logOut = async(req,res)=>{
    try{  
        req.user.tokens = req.user.tokens.filter(singleToken=>{
            return singleToken.token != req.token
        })
        req.user.save()
        res.send({
            apiStatus:true, 
            data:"", 
            message:"log out from this device"
        })
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}
//logout all
const logOutAll = async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send({
             apiStatus:true,
             data:"",
             message:"log out from all devices"})
    }
    catch(e){
        res.status(500).send({ 
            apiStatus:false,
             data:e.message,
              message: 'error in logout'
            })
    }
}

//edit profile
const editUser=async(req,res)=>{
    try{
        const userData = await User.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        if(!userData) res.send('user not found')
        res.status(200).send({
            apiStatus:true,
            data:userData,
            message:"data updated successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in updating "
        })
    }
}
module.exports={
    addUser,
    me,
    login,
    logOut,
    logOutAll,
    editUser
}