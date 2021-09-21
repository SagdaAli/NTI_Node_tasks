const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../contoller/user.controller')

router.post('/adduser',userController.addUser)
router.post('/login', userController.login)
router.post('/me',auth,userController.me)
router.post('/logout',auth, userController.logOut)
router.post('/logoutAll',auth, userController.logOutAll)
router.patch('/edit/:id',auth,userController.editUser)
module.exports=router