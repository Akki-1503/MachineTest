const mongoose = require('mongoose')

const configureDB = async () => {
    try{
        const db = mongoose.connect('mongodb://127.0.0.1:27017/Machine-Test')
        console.log('connected to db')
    } catch(err) {
        console.log('error connecting to db', err)
    }
}

module.exports = configureDB
