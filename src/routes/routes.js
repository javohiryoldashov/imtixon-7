const express = require('express')
const router = express.Router()
const {read} = require('../utils/FS')
// .........................CONTROLLERS
const LOGINCANTROLLER = require('../controllers/loginController')
const HOMECONTROLLER = require('../controllers/homeController')
const GROUPSCONTROLLER = require('../controllers/groupsController')
const STUDENTSCONTROLLER = require('../controllers/studentsController')
const TEACHERCONTROLLER = require('../controllers/teacherController')
const COURSESCONTROLLER = require('../controllers/coursesController')
const ONLYTEACHERCONTROLLER = require('../controllers/onlyTeacherController')
const ONLYSTUDENTCONTROLLER = require('../controllers/onlyStudentControler')
// console.log(COURSESCONTROLLER);
//............. MIDLLWEARS
const verifayRole = require('../middlwears/areHaveMiddlwear')
const verify_token = require('../middlwears/verify_token')
const verify_role = require('../middlwears/verifay_role')
// ...
router
    .get('/login', LOGINCANTROLLER.LOGIN)
    .get('/', verify_token,verify_role, HOMECONTROLLER.HOME)
    .get('/students', verify_token,verify_role, STUDENTSCONTROLLER.STUDENTS)
    .get('/groups', verify_token,verify_role, GROUPSCONTROLLER.GROUPS)
    .get('/teacher',verify_token,verify_role, TEACHERCONTROLLER.TEACHER)
    .get('/courses',verify_token, verify_role, COURSESCONTROLLER.COURSES)
    .get('/onlyTeacher',verify_token, ONLYTEACHERCONTROLLER.OnlyTeacher )
    .get('/onlyStudent',verify_token, ONLYSTUDENTCONTROLLER.OnlyStudent )
    .get('/groups/:cours',verify_token, GROUPSCONTROLLER.GroupsTaea )
    .post('/login', verifayRole, LOGINCANTROLLER.LOGIN_POST)
    .post('/students',verify_token,verify_role,STUDENTSCONTROLLER.STUDENTS_POST)
    .post('/groups', verify_token,verify_role,GROUPSCONTROLLER.GROUP_POST)
    .post('/students', verify_token,verify_role,STUDENTSCONTROLLER.STUDENTS_DELETE)
    .post('/teacher', verify_token,verify_role,TEACHERCONTROLLER.TEACHER_POST)
    .post('/courses', verify_token,verify_role,COURSESCONTROLLER.COURSES_POST)
    .delete('/students/:id', STUDENTSCONTROLLER.STUDENTS_DELETE)
    .delete('/courses/:id', COURSESCONTROLLER.COURSES_DELETE)
    .get('/api', (_, res) => {const allGroups = read("groups.json"); res.send(allGroups);})
    .get('/api/v2', (_, res) => {const allTeachers = read("users.json").filter(e=>e.role == 'teacher');res.send(allTeachers);})

    .get('/ap1', (_, res) => {const allStudents = read("users.json").filter(e=>e.role == 'student'); res.send(allStudents);})
    .get('/api1/v3', (_, res) => {const allGroups = read("groups.json");res.send(allGroups);})

    
module.exports = {router}