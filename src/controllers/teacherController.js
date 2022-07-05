const {read, write} = require('../utils/FS')

const TEACHER = (req, res) =>{
    const allTeachers = read('users.json').filter(e=>e.role == 'teacher')
    const allCourses = read('courses.json')
    allTeachers.sort(function(a , b){a.id - b.id})
    res.render('teacher.ejs', {allTeachers, allCourses})
}

const TEACHER_POST = (req, res)=>{
    const {name, phoneNumber, typeS2} = req.body
    if(!name || !phoneNumber || !typeS2){
        return res.redirect('/teacher')
    }else{ 
        const allUsers = read('users.json')
        allUsers.forEach(e=>{
            if(e.phoneNumber == phoneNumber ){
                return res.redirect('/teacher')
            }
        })
        allUsers.push({
            id:allUsers[allUsers.length - 1]?.id+1||1,
            name,
            phoneNumber,
            password:phoneNumber,
            course:typeS2,
            role:"teacher"
        })
        write('users.json', allUsers)
    }
    res.redirect('/teacher')
}
module.exports = {
    TEACHER,
    TEACHER_POST
}