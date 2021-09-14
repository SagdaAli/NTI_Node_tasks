const router = require("express").Router()
const customerController=require('../controller/customer.controller')

router.get('',customerController.getAll)

router.get('/addCustomer', customerController.addCustomer)
router.post('/addCustomer', customerController.saveCustomer)

router.get('/editCustomer/:id', customerController.editCutomer)
router.post('/editCustomer/:id', customerController.updateCustomer)

router.get('/activate/:id',customerController.activate)

router.get('/search', customerController.getCustomer)

router.get('/addBal/:id', customerController.addBal)
router.post('/addBal/:id', customerController.getAddBal)

router.get('/withdrow/:id', customerController.withdrow)
router.post('/withdrow/:id', customerController.getwithdraw)


router.get('/withdrow', customerController.withdrow)
router.get('*', customerController.err404)
module.exports=router