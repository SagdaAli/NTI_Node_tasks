const router = require('express').Router()
const auth = require('../middleware/auth')
const taskController = require('../contoller/task.controller')
const upload = require('../middleware/fileUpload')

router.post('/addtask',auth,taskController.addTask)
router.post('/assignto/:id',auth,taskController.assignTask)
router.post('/response/:id', auth, upload.single('img'), taskController.uploadFile)
module.exports=router