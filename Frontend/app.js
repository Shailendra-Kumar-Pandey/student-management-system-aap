// frontend logic

const baseURL = "http://localhost:2000/admin";
const URLgetAllStudents = "/getAllStudent";
const URLdeleteStudent = "/deleteStudentData";
const URLaddNewStudent = "/addNewStudent";
const URLupdateStudentdata = "/updateStudentData";
const URLsingleStudentData = "/singleStudentData";

//get api

let studentData = [];

getAllStudents();


function getAllStudents(){
    fetch(`${baseURL}${URLgetAllStudents}`, {method : 'GET'})
    .then((res) => { 
        return res.json()
    })
    .then((response)=>{
        studentData = response.result;
        displayAllData(studentData)
    })
    .catch((err)=>{
        console.log(err, " Something went wrong...");
    })
}


function displayAllData(arr){
    
    let totleRow = '';

    arr.forEach((ele, i)=>{
    
        let row = `<tr>
                            <td>${i+1}</td>
                            <td>${ele.name}</td>
                            <td>${ele.email}</td>
                            <td>${ele.class}</td>
                            <td>${ele.mobile}</td>
                            <td>
                                <button class="action-btn edit-btn" onclick="editStudentData(${ele.id}), openClose('editModal')">Edit</button>
                                <button class="action-btn delete-btn" onclick="deleteStudent(${ele.id}), openClose('deleteModal')">Delete</button>
                                <i class="fa-solid fa-eye-slash" title="${ele.name}" onclick=" showStudentData(${ele.id}), openClose('personalModel')" style="color: #B197FC;"></i>
                            </td>
                    </tr>`;
        totleRow += row;
    })
    document.getElementById('tBody').innerHTML = totleRow;
}

let isOpen = false;

function openClose(modalID){
    if(isOpen === false){
        document.getElementById(modalID).style.display = 'flex';
        isOpen = true;
    }else{
        document.getElementById(modalID).style.display = 'none'
        isOpen = false;
    }
}




//add New Student Data API:-

let student = {
    name : null,
    email: null,
    class : null,
    mobile : null
}

function addNewStudentData(key, value){
    if(value.trim() === ""){
        student[key] = null;
    }else{
        student[key] = value;
    }
}

function addNewStudent(){
    // Validation
    if(!student.name || !student.email || !student.class || !student.mobile){
        alert("all field Require Plz fill on the Field...");
        return;
    }

    // addNewStudent API:-
    fetch(`${baseURL}${URLaddNewStudent}`, {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(student)
    })
    .then( (res) =>{ 
        return res.json()
    })
    .then((response)=>{
        let id = response.result;
        student['id'] = Number(id);
        studentData.push(student);
    })
    .catch((err)=>{
        console.log(err)
    })

    displayAllData(studentData);
    openClose('addModal')
    student = {
            name : null,
            email : null,
            class : null,
            mobile : null
        }
}

// edit Student Data Logic:-
let uniqeId;
let privesData;
let studentIndex;
function editStudentData(id){
    uniqeId = Number(id);
    privesData = studentData.find((e)=> Number(e.id) === Number(id));

    studentIndex = studentData.findIndex((e)=> Number(e.id) === Number(id))

    document.getElementById('name').value = privesData.name;
    document.getElementById('email').value = privesData.email;
    document.getElementById('class').value = privesData.class;
    document.getElementById('mobile').value = privesData.mobile;
}

function updateStudent(key, value){
     if(value.trim() === ""){
        student[key] = null;
    }else{
        student[key] = value;
    }

    if(student.name === null){
        student.name = privesData.name
    }
    if(student.email === null){
        student.email = privesData.email
    }
    if(student.class === null){
        student.class = privesData.class
    }
    if(student.mobile === null){
        student.mobile = privesData.mobile
    }
}

function updateStudentData(){
     // Validation
    if(!student.name || !student.email || !student.class || !student.mobile){
        alert("all field Require Plz fill on the Field...");
        return;
    }

    fetch(`${baseURL}${URLupdateStudentdata}?id=${uniqeId}`, {
        method : 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(student)
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

    student['id'] = uniqeId;
    studentData[studentIndex] = student;

    displayAllData(studentData);
    openClose('editModal')
    // alert(`Successfully ${student.name} student data updated...!`);

    student = {
            name : null,
            email : null,
            class : null,
            mobile : null
        }
}


// Delete Student Data Logic:-

function deleteStudent(id){
    uniqeId = Number(id);
    studentIndex = studentData.findIndex((e)=> Number(e.id) === Number(id))
}

function confirmStudent(){

    studentData.splice(studentIndex, 1);

    fetch(`${baseURL}${URLdeleteStudent}?id=${uniqeId}`,{
        method : 'DELETE'
    })
    .then((res)=>{ 
        return res.json()
    })
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err)
    })

    displayAllData(studentData);

    openClose('deleteModal')

    // alert(`Delete Student Successfully...`);
}

// Single Student Data Find and Show
function showStudentData(id){
    fetch(`${baseURL}${URLsingleStudentData}?id=${id}`, {method:'GET'})
    .then((res)=>{
        return res.json();
    })
    .then((response)=>{
        let data = response.result
        document.getElementById('studentHead').innerHTML = `<span>${data.name} Data</span>`
        document.getElementById('singleData').innerHTML = `<span>During the admission process, ${data.name} from Class ${data.class} submitted this email ${data.email}
                                                                and mobile number ${data.mobile}</span>`
    })
    .catch((err)=>{
        console.log(err)
    })

}


// Find student in Search Bar

let find = '';

function findStudent(word){
    if(word.trim() === ""){
        find = ""
    }else{
        // find += word;
        find = document.getElementById('searchInput').value
    }
}
let searchData = [];
function findData(){
    if(find === ''){
        alert('Please Enter Student Name...');
        return;
    }
    openClose('studentModel')
    searchData = studentData.filter((e) => e.name.includes(find));
    if(searchData.length === 0){
        document.getElementById('noData').innerHTML = `<span style="color:red">Not Record Found</span>`
        searchDataStudent(searchData)

    }else{
        document.getElementById('noData').innerHTML = `<span style="color:green">Search Student Data</span>`
        searchDataStudent(searchData)
    }
    find = '';

    document.getElementById('searchInput').value = ''

}

function searchDataStudent(arr){
    let totalRow = '';
    arr.forEach((e,i) => {
        let row = ` <tr>
                            <td>${i+1}</td>
                            <td>${e.name}</td>
                            <td>${e.email}</td>
                            <td>${e.class}</td>
                            <td>${e.mobile}</td>
                            <td>
                                <i class="fa-solid fa-eye-slash" title="${e.name}" onclick=" showStudentData(${e.id}), openClose('studentModel'), openClose('personalModel')" style="color: #B197FC;"></i>
                            </td>
                    </tr>        
        `
        totalRow += row
    });
    document.getElementById('SBody').innerHTML = totalRow;
}