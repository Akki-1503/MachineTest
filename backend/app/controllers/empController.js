const Emp = require('../models/empModel')
const User = require('../models/userModel')

const empCtlr = {}
const aws = require('aws-sdk')
const uploadFileToS3 = require('../aws/s3') 

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
})

const s3 = new aws.S3()

empCtlr.createEmp = async (req, res) => {
    try{
        const body = req.body
        console.log(body, 'body')
        let avatarUrl = null
        if (req.file) {
            const uploadedFile = await uploadFileToS3(req.file, req.user._id)
            avatarUrl = uploadedFile.avatarUrl
            console.log(avatarUrl, 'avatarurl')
        }
        body.createdAt = new Date()

        const emp = new Emp({...body, avatarUrl})
        const empDoc = await emp.save()
        res.json(empDoc)
    } catch(err) {
        console.log('err', err)
        res.json(err)
    }
}

empCtlr.listEmp = async (req, res) => {
    try {
        const emps = await Emp.find({})
        console.log(emps, 'emps')
        res.json(emps)
    } catch (err) {
        res.json(err)
        console.log(err, 'err')
    }
}

empCtlr.showEmp = async (req, res) => {
    try{
        const { id } = req.params
        const emp = await Emp.findById(id)
        console.log('emp', emp)
        res.json(emp)
    }catch(err) {
        console.log(err, 'err')
        res.json(err)
    }
}

empCtlr.editEmp = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, 'editid');
        const body = req.body;
        console.log('edit body', body, req.body, 'req');

        let updateFields = { ...body }; // Copy all fields from the request body

        // Check if avatar file is included in the request
        const avatar = req.file;
        if (avatar) {
            // Upload avatar file to S3 bucket and get the URL
            const uploadedFile = await uploadFileToS3(avatar, 'employee-avatars', req.user._id);
            const avatarUrl = uploadedFile.Location;
            updateFields.avatarUrl = avatarUrl; // Add avatar URL to the updateFields object
        }

        // Find and update the employee document with the specified ID
        const emp = await Emp.findByIdAndUpdate(id, updateFields, { new: true });
        console.log(emp, 'edit emp');
        
        if (!emp) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Return the updated employee document
        res.json(emp);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

empCtlr.deleteEmp = async (req, res) => {
    try {
        const { id } = req.params

        const emp = await Emp.findByIdAndDelete(id)
        if (!emp) {
            return res.status(404).json({ message: "Employee not found" })
        }

        res.json({ message: "Employee deleted successfully" })
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = empCtlr
