var coludinary = require('cloudinary').v2

coludinary.config({
    cloud_name: process.env.COLUDINARY_CLOUD_NAME,
    api_key: process.env.COLUDINARY_API_KEY,
    api_secret: process.env.COLUDINARY_API_SECRET
})

module.exports = coludinary