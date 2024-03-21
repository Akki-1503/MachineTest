require('dotenv').config()
const express = require('express')
const cors = require('cors')
const usersCltr = require('./app/controllers/userController')
const authenticateUser = require('./app/middlewares/authenticate')
const authorizeUser = require('./app/middlewares/authorization')
const configureDB = require('./config/db')
const empCtlr = require('./app/controllers/empController')

const multer = require('multer')
const upload = multer()

const PORT = 3321
const app = express()
app.use(express.json())
app.use(cors())
configureDB()

app.post('/api/users/register', usersCltr.register)

app.post('/api/users/login', usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.post('/api/emp/create', authenticateUser, upload.single('avatar'),
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, empCtlr.createEmp)

app.get('/api/emp/list', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, empCtlr.listEmp)

app.get('/api/emp/show/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, empCtlr.showEmp)

app.put('/api/emp/update/:id', authenticateUser, upload.single('avatar'),
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, empCtlr.editEmp)

app.delete('/api/emp/delete/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, empCtlr.deleteEmp)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
    console.log(process.env.JWT_SECRET)
})
