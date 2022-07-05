const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const {access_token} = req.cookies
    if(!access_token){
        res.redirect('/login')
    }
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        
        if(decode.role != 'admin' && decode.role == 'teacher'){
           return res.redirect('/onlyTeacher')
        }
        if(decode.role != 'admin' && decode.role != 'teacher' && decode.role == 'onlyStudent'){
            return res.redirect('/onlyStudent')
         }
         if(decode.role != 'admin' && decode.role != 'teacher' && decode.role != 'onlyStudent'){
            return res.redirect('/login')
         }
        
        next()
    })
}