const {read, write} = require('../utils/FS')
const {sign} = require('../utils/JWT')

const LOGIN = (req, res) => {
    res.render('login.ejs')
}

const LOGIN_POST = (req, res)=>{
    const {user}= req
    
    if(user.role == 'admin'){
        res.cookie('access_token', sign({id: user.id, role: user.role},{
            maxAge: 1 * 60 * 60 * 1000
        }))
        return res.redirect('/')
    }
    
    // console.log(user);
    if(user.role == 'teacher'){
        res.cookie('access_token', sign({id: user.id, role: user.role},{
            maxAge: 1 * 60 * 60 * 1000
        }))
        return res.redirect('/onlyTeacher')
        // Yasalmaga redirect ni teacher ga berish kere
    }
    
    if(user.role == 'student'){
        res.cookie('access_token', sign({id: user.id, role: user.role},{
            maxAge: 1 * 60 * 60 * 1000
        }))
        return res.redirect('/onlyStudent')
        // Yasalmaga redirect ni student ga berish kere
    }

}
module.exports = {
    LOGIN,
    LOGIN_POST
}