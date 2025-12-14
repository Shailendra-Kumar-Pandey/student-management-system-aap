import express from 'express';
import fileSystem from 'fs';        // const fs = require('fs');
import path from 'path';            // const path = require('path');
import { fileURLToPath } from 'url';

const adminRouter = express.Router();

// const studentFilePath = path.join(__dirname, '../Database/student.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename );
const studentFilePath = path.join(__dirname, '../Database/student.json');


let studentData = JSON.parse(fileSystem.readFileSync(studentFilePath, {encoding : 'utf-8'})) || [];

// Create GET API using admin view all student 
adminRouter.get('/getAllStudent', (req, res)=>{
    res.send({massage: "Data Receved Succefully...",
        result : studentData
    })
})

//  Create POST API using admin add new student data 
adminRouter.post('/addNewStudent', (req, res)=>{
    let id = 1;
    if(studentData.length > 0){
        const lastId = studentData[studentData.length-1].id;
        id = Number(lastId) + 1;
     }
    let newStudent = req.body;
    console.log(newStudent)
    
    newStudent['id'] = id;
            
    studentData.push(newStudent)
        
    fileSystem.writeFileSync(studentFilePath, JSON.stringify(studentData))
        
    res.send({
         result : newStudent.id,
         massage : `${newStudent.name} is Add Student data Successfully....!`
    })
})

//  Create PUT API using admin update student data 
adminRouter.put('/updateStudentData', (req, res)=>{
    if(!req.query.id){
         return res.send({
               massage : "Please Provide ID Number..."
          })
      }
        
    let updateStudentIndex = studentData.findIndex((e) => Number(e.id) === Number(req.query.id))
          
    if(updateStudentIndex < 0){
       return res.send({
           massage : "Please Enter Vailid ID Number..."
       })
   }else{
                
        let updateStudentdata = req.body;
        let id = Number(req.query.id);
        updateStudentdata['id'] = id;
 
        studentData[updateStudentIndex] = updateStudentdata;
        fileSystem.writeFileSync(studentFilePath, JSON.stringify(studentData));
        return res.send({
            result : updateStudentdata,
            massage : "Student Data Update Successfully...!"
         })
    }
})

// //  Create DELETE API using admin delete student 
adminRouter.delete('/deleteStudentData', (req, res)=>{
    if(!req.query.id){
        return res.send({
            massage : "Please Provide ID Number..."
        })
    }
        
    let studentIndex = studentData.findIndex((e) => Number(e.id) === Number(req.query.id))
    let deleteStudent = studentData[studentIndex]; 
        
    if(studentIndex < 0){
        return res.send({
            massage : "Please Enter Vailid ID Number please try again letter..."
        })
    }

        studentData.splice(studentIndex, 1);
        fileSystem.writeFileSync(studentFilePath, JSON.stringify(studentData));
            
        return res.send({
            reult : deleteStudent,
            massage : `${deleteStudent.name} ID ${deleteStudent.id} Student DELETE Successfully...`
        })
})

// //  Create GET API using admin Single student data get 
adminRouter.get('/singleStudentData', (req, res)=>{
    if(!req.query.id){
           return res.send({
               massage : "Please Provide ID Number..."
           })
    }
    
    let singleStudent = studentData.find((e) => Number(e.id) === Number(req.query.id))
    
   if(!singleStudent){
       return res.send({
           massage : "Please Enter Vailid ID Number please try again letter..."
       })
   }

    return res.send({
        result : singleStudent,
        massage : `${singleStudent.name} ID ${singleStudent.id} Fetch Successfully...`
    })

})

export default adminRouter;             // module.exports = { adminRouter };