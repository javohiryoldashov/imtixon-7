// const { redirect } = require('express/lib/response')
const {read, write} = require('../utils/FS')

const STUDENTS = (req, res) =>{
    const Courses = read('courses.json')
    const Groups = read('groups.json')
    const users = read('users.json')
    const foundUsers = users.filter(e=> e.role == 'student')
    foundUsers.sort(function(a , b){a.id - b.id})
    res.render('students.ejs', {foundUsers, Courses, Groups})
}

const STUDENT_SEARCH = (req, res)=>{
    const {name} = req.params
    const allStudents = read('users.json').filter(e=>e.role == 'student')

}

const STUDENTS_POST = (req, res)=>{
    const {name, phoneNumber, deta, course, groups} = req.body
    
    if(!name || !phoneNumber || !deta || !course || !groups){
        return res.redirect('/students')
    }else{ 
        const Users = read('users.json')
        Users.forEach(e=>{
            if(e.password == phoneNumber ){
                res.sendStatus(401).json({
                    message:"Qo'shilgan raqam kiritilgan"
                })
            }
        })
        Users.push({
            id:Users[Users.length - 1]?.id +1 || 1,
            name,
            phoneNumber,
            deta,
            password:phoneNumber,
            course,
            role:"student",
            groups
        })
        write('users.json', Users)
    }
    res.redirect("/students")
}

const STUDENTS_DELETE =(req, res)=>{
    const {id} = req.params
    const DeleteStudent = read('users.json')
    const index = DeleteStudent.findIndex(j=>j.id == id)
    DeleteStudent.splice(index, 1)
    write('users.json', DeleteStudent)
    res.send('/students')
}
module.exports = {
    STUDENTS,
    STUDENTS_POST,
    STUDENTS_DELETE  
}