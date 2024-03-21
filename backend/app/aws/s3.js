const aws = require("aws-sdk")

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
})

const s3 = new aws.S3()

const uploadFileToS3 = async (file, userId) => {
  console.log('userid', userId)
  const params = {
    Bucket: process.env.BUCKET,
    Key: `${userId}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  }
  console.log(params, 'params')
  try {
    const uploadedFile = await s3.upload(params).promise()
        console.log(uploadedFile, 'uploadedfile')
    const avatarUrl = `https://${process.env.BUCKET}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${uploadedFile.key}`
    console.log('avatarurl', avatarUrl)
    return { ...uploadedFile, avatarUrl }
  } catch (error) {
    console.error("Error uploading file to S3:", error)
        throw error
    }
}

module.exports = uploadFileToS3
