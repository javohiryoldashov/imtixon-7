const {read, write} = require('../utils/FS')

const GROUPS = (req, res) =>{
    const Groups = read('groups.json')
    const Teacher = read('users.json').filter(e=>e.role == 'teacher')
    const Courses = read('courses.json')
    Groups.sort(function(a , b){a.id - b.id})
    res.render('groups.ejs', {Groups,Teacher, Courses})
}



const GroupsTaea = (req, res)=>{
    const {cours} = req.params
    const Groups = read('groups.json')
    const Courses = read('courses.json')
    Groups.sort(function(a , b){a.id - b.id})

    const Teacher = read('users.json').filter(e=>e.role == 'teacher' && e.course == cours)
    res.render('groups.ejs', {Teacher, Courses, Groups})
}



const GROUP_POST =(req, res)=>{ 
    const {groupName, coursName, teacherName, groupDays, groupHours} = req.body
    // console.log(req.body);
    const Groups = read('groups.json')

    Groups.forEach(e=>{
        if(e.groupName == groupName){
            return res.sendStatus(401).json({
                message:"Qo'shilgan raqam kiritilgan"
            })
        }
    })
    Groups.push({
        id:Groups[Groups.length -1]?.id+1||1,
        groupName,
        coursName,
        teacherName,
        groupDays,
        groupHours,
        
    })

    write('groups.json', Groups)
    res.redirect("/groups")
}


module.exports ={
    GROUPS,
    GROUP_POST,
    GroupsTaea
}