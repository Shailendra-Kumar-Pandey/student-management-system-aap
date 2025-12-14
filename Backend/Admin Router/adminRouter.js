import express from 'express';
import fileSystem from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// const fs = require('fs');
// const path = require('path');
// const studentFilePath = path.join(__dirname, '../Database/student.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename );

const studentFilePath = path.join(__dirname, '../Database/student.json');

const adminRouter = express.Router();


let studentData = JSON.parse(fileSystem.readFileSync(studentFilePath, {encoding : 'utf-8'})) || [];


// Create GET API using admin view all student 
adminRouter.get('/getAllStudent', (req, res)=>{
    res.send({massage: "Data Receved Succefully...",
        result : studentData
    })
})

//  Create POST API using admin add new student data 
adminRouter.post('/getAllStudent', (req, res)=>{
    let id = 1;
    if(studentData.length > 0){
        const lastId = studentData[studentData.length-1].id;
        id = Number(lastId) + 1;
     }
    let newStudent = req.body;
    
    newStudent['id'] = id;
            
    studentData.push(newStudent)
        
    fileSystem.writeFileSync(studentFilePath, JSON.stringify(studentData))
        
    res.send({
         result : newStudent.id,
         massage : `${newStudent.name} is Add Student data Successfully....!`
    })
})

//  Create PUT API using admin update student data 
adminRouter.put('/getAllStudent', (req, res)=>{

})

//  Create DELETE API using admin delete student 
adminRouter.delete('/getAllStudent', (req, res)=>{

})

//  Create GET API using admin Single student data get 
adminRouter.get('/getAllStudent', (req, res)=>{

})

export default adminRouter;
// module.exports = { adminRouter };