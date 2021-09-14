const yargs = require('yargs')
const students = require('./student')
yargs.command({
    command : 'add',
    describe:"add new student",
    builder:{
        name:{
            type:String
        },
        className:{
            type:Number
        },
        subjects:[
            {
              subName:{
                  type:string
              }  
            },
            {
              subgrade:{
                  type:number
              }
            }
        ]
    },
    handler : function(argv){
        
        students.addStudent(argv.name, argv.className,argv.subjects)
    }
})

// show all student yarge

yargs.command({
    command:"showAll",
    handler: function(){
        students.showAll()
    }
})

yargs.command({
    command:"editStudent",
    builder:{
        studentId: {demandOption:true, type:Number},
        name:{
            type:String,
        },
        className:{
            type:String,
        },
        subjects:[
            {
              subName:{
                  type:string
              }  
            },
            {
              subgrade:{
                  type:number
              }
            }
        ]
       
    },
    handler:function(argv){
        let newData = {}
        heads = ['name', 'className', 'subjects']
        heads.forEach(h=>{
         if(argv[h]) newData[h]=argv[h]
        })
        
        console.log(newData)
        students.edit(argv.studentId, newData)
    }
})
yargs.command({
    command:"delStudent",
    builder:{
        studentId:{demandOption:true, type:Number}
    },
    handler: function(argv){
        students.deleteStudent(argv.studentId)
    }
})
//get single student by id 
yargs.command({
    command:"gitSingleStudent",
    builder:{
        studentId:{demandOption:true, type:Number}
    },
    handler: function(argv){
        let allStud =students.readDataFromJsonFile()
        students.searchStudentIndex(allStud,studentId,argv.studentId)
    }
})



yargs.argv