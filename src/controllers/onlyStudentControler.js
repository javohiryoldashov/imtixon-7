const {read} = require('../utils/FS')

const  OnlyStudent = (req, res)=>{
    const {data} = req
    // console.log(data);
    const Students = read('users.json').filter(e=>e.role == 'student')
    const findStudent = Students.find(i=>i.id == data.id)
    // console.log(findStudent,'okokok');
    const studentGroup = Students.filter(e=>e.groups == findStudent.groups)
    res.render('onlyStudent.ejs',{studentGroup})
}
module.exports ={
    OnlyStudent
}