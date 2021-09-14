//call modules
const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

//read data from json file
readDataFromJsonFile = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('./student.json').toString())
        if(!Array.isArray(data)) throw new Error('not array')
    }
    catch(e){
        data = []
    }
    return data
}
//write data to Json File
writeDataToJsonFile = (data)=>{
    try{
        fs.writeFileSync('./student.json', JSON.stringify(data))
    }
    catch(e){
        console.log(chalk.red('error writing data'))
    }
}

//console.log  (readDataFromJsonFile())

//add new student
addStudent = (data) => {
    let students = readDataFromJsonFile()
    // let i = students.filter( students.className, data.className )
    // if(i!='a' || 'b'||'c') return console.log(chalk.red('invalid classname'))
    if(!['a','b','c'].includes(data.className)) return console.log('fe error fe el class')
    let student = {
        
        id : parseInt((Date.now()) * Math.random()),
       
        ...data
    }
    students.push(student)
    writeDataToJsonFile(students)
    console.log(chalk.green(`data inserted successfuly and you student id is ${student.id}`))
}
//show All student 
showAll = () =>{
    students = readDataFromJsonFile()
    students.forEach(student => {
        console.table(student)
    })
}

//search student id, className, subjectName
filterStudents = (key, seachVal) =>{
    let students = readDataFromJsonFile()
    let result = students.filter(student=>{
        return seachVal == student[key]
    })
    return result
}
// get item index by id
searchStudentIndex = (students,key, searchVal) =>{
    let result = students.findIndex(student=>{
        return searchVal == student[key]
    })
    return result
}
//edit
editStudent = (studentId, newData)=>{
    let students = readDataFromJsonFile()
    let studentIndex = searchStudentIndex(students, studentId)
    if(studentIndex==-1) return console.log(chalk.red('student not found'))
    for(n in newData){
        students[studentIndex][n] = newData[n]
    }
    writeDataToJsonFile(students)
    console.log(chalk.green('student data Edited'))
}

//delete
deleteStudent = (studentId)=>{
    let students = readDataFromJsonFile()
    let studentIndex = searchStudentIndex(students, studentId)
    if(studentIndex==-1) return console.log(chalk.red('student not found'))
    students.splice( studentIndex , 1 )
    writeDataToJsonFile(students)
    console.log(chalk.green('student deleted'))
}



module.exports = { addStudent,showAll,filterStudents,deleteStudent}