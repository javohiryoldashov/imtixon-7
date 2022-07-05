const {read , write} = require('../utils/FS')
const sign = require('../utils/JWT')

const HOME = (req, res)=>{
    const allUsers = read('users.json')
    const Courses = read('courses.json')
    const Groups = read('groups.json')
    const Teachers = allUsers.filter(e=>e.role == 'teacher')
    const Students = allUsers.filter(e=>e.role == 'student')
    res.render('home.ejs',{Students,Teachers,Groups,Courses})
}

module.exports = {
    HOME
}