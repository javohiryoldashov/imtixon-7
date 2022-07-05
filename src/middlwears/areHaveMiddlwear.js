const {read} = require('../utils/FS')

module.exports = (req, res, next)=>{
    const {username, password} = req.body
    const foundUser = read('users.json').find(e=> e.name == username && password == e.password)
    if(!foundUser){
        return res.sendStatus(401)
    }
    req.user = foundUser
    next()
}