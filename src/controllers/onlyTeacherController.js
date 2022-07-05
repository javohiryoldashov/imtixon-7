const {read} = require('../utils/FS')

const  OnlyTeacher = (req, res)=>{
    const {data} = req
    // console.log(data);
    const Groups = read('groups.json')
    const Students = read('users.json').filter(e=>e.role == 'student')
    const teachers = read('users.json').filter(e=>e.role == 'teacher')
    const findTeacher = teachers.find(i=>i.id == data.id)
    const findGroup = Groups.find(e=>e.coursName == findTeacher.course) 
    
    const findStudents = Students.filter(i=>i.groups == findGroup.groupName)
    res.render('onlyteacher.ejs',{findStudents})
}
module.exports ={
    OnlyTeacher
}