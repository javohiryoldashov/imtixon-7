const {read, write} = require('../utils/FS')

const COURSES = (req, res) =>{
    const allCourses = read('courses.json')
    res.render('courses.ejs', {allCourses})
}
const COURSES_POST = (req, res)=>{
    const {name, price, type} = req.body
    if(!name || !price || !type){
        return res.redirect('/courses')
    }else{ 
    const allCourses = read('courses.json')
    allCourses.forEach(e=>{
            if(e.name == name ){
                return res.redirect('/courses')
            }
        })
    allCourses.push({
        id:allCourses[allCourses.length - 1]?.id +1||1,
        name,
        price:`${price} so'm`,
        type
    })
    write('courses.json', allCourses)
}
    res.redirect("/courses")
}
const  COURSES_DELETE =(req, res)=>{
    const {id} = req.params
    const DeleteCourses = read('courses.json')
    const index = DeleteCourses.findIndex(j=>j.id == id)
    DeleteCourses.splice(index, 1)
    write('courses.json', DeleteCourses)
    res.send('/courses')
}

module.exports = {
    COURSES,
    COURSES_POST,
    COURSES_DELETE
}