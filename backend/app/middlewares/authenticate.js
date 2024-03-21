const jwt = require('jsonwebtoken')
const authenticateUser = (req, res, next)  => {
    let token = req.headers['authorization']
    if(token) {
        token = token.split(' ')[1]
        try{
            const tokenData = jwt.verify(token, process.env.JWT_SECRET)
            req.user= {
                _id: tokenData._id,
                role: tokenData.role
            }
            console.log('td', tokenData)
            console.log(req.user)
            console.log('auth mw', req.user)
            next()
        }catch(e) {
            res.status(401).json({errors: 'invalid token'})
        }
    } else {
        res.status(400).json({errors: 'token not provided'})
    }
}

module.exports = authenticateUser