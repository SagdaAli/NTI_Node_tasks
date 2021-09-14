
const fs = require('fs')

const readJsonFile = () =>{
    let allCustomers
    try{
        allCustomers = JSON.parse(fs.readFileSync('models/customer.json').toString())
        if(!Array.isArray(allCustomers)) throw new Error()
    }
    catch(e){
        allCustomers = []
    }
    return allCustomers
}
const saveJsonFile = (allCustomers) =>{
    fs.writeFileSync('models/customer.json', JSON.stringify(allCustomers))
}

const addCustomer = (req,res) => {
   
    res.render('add',{
        title:"add customer"
    })
}
const saveCustomer = (req, res)=>{
    // res.send(req.body)
    let allCustomers = readJsonFile()
    let customer = {
        id: Date.now(),
        accnum:Date.now()*Math.random(),
        status:0,
        ...req.body
    }
    allCustomers.push(customer)
    saveJsonFile(allCustomers)
    res.redirect('/')
}

const getAll=(req,res)=>{
    let allCustomers = readJsonFile()
    res.render('all',{
        title:"all customer",
        data:allCustomers,
        isEmpty:allCustomers.length==0? true: false
        
        })
}

const activate = (req, res) => { 
    let allCustomers  = readJsonFile() 
    let customerIndex = searchCustomer(allCustomers , req.params.id) 
    allCustomers[customerIndex].status = 1 
    saveJsonFile(allCustomers ) 
    res.redirect('/')

}


searchCustomer = (allCustomers, id) => {
    let index = allCustomers.findIndex(ele=>{
        return ele.id==id
    })
    return index
}


const editCutomer = (req,res) => {
    let allCustomer = readJsonFile()
    let customerIndex = searchCustomer(allCustomer, req.params.id)
    if(customerIndex==-1) res.render('err404', {
        title:"User Not Found",
        err: `No user With id ${req.params.id}`
    })
    else{
        res.render('edit',{
            title:"Edit User",
            user: allCustomer[customerIndex]
        })    
    }
}
const updateCustomer = (req,res) => {
    let allCustomer = readJsonFile()
    let customerIndex = searchCustomer(allCustomer, req.params.id)
    allCustomer[customerIndex].name= req.body.name
    allCustomer[customerIndex].balance= req.body.balance
    allCustomer[customerIndex].accnum= req.body.accnum
    
    saveJsonFile(allCustomer)
    res.redirect('/')
}


const getCustomer = (req,res) => {
let allData = readJsonFile()
if(req.query.search){
    allData= allData.find(el=>{
       return el.id == req.query.search
    })
}
   res.render('search',{allData})
}
const addBal=(req,res)=>{
    res.render('addbalance', {
        title:"add balance"
})
}

const getAddBal=(req,res)=>{
   let allCustomers=readJsonFile()
   let customerIndex=searchCustomer(allCustomers,req.params.id)
   allCustomers[customerIndex].balance=parseInt(allCustomers[customerIndex].balance)+parseInt(req.body.addbal)
   saveJsonFile(allCustomers)
   res.redirect('/')

}
const withdrow=(req,res)=>{
    res.render('withdrow',{
        title:"withdrow "
    })
}

const getwithdraw= (req, res) => {
    let allCustomers = readJsonFile() 
    let customerIndex = searchCustomer(allCustomers, req.params.id) 
     
        allCustomers[customerIndex].balance=parseInt(allCustomers[customerIndex].balance)- parseInt(req.body.withdrow )
        saveJsonFile(allCustomers) 
        res.redirect('/') 
    } 



const err404 = (req,res)=>{
    res.render('err404', {
        title:"Error Page",
        err: "not found"
    })
}
module.exports={getAll,addCustomer,saveCustomer,editCutomer,updateCustomer,err404,activate,getCustomer,addBal,getAddBal,withdrow,
    getwithdraw}