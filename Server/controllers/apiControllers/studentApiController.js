const Student = require('../../models/Student')
const cloudinary = require('../../cloudinary')
const convertBufferToString = require('../../convertBufferToString')
const { hash } = require('bcryptjs')
module.exports = {
    async registerStudent(req, res){
        try{
            if(req.file === undefined) return res.json({statusCode: 400, message: 'Image is required'})
            const imageContent = await convertBufferToString(req.file.originalname, req.file.buffer);
            const imageResponse = await cloudinary.uploader.upload(imageContent)
            const image = imageResponse.secure_url
            const { email, name, password, phone, state, city } = req.body;
            if (!email || !name || !password || !phone || !image ) {
                return res.json({ statusCode: 400, message: "Bad request" });
            }
            if(phone<1000000000 || phone> 9999999999) return res.json({statusCode: 400, message: 'Invalid phone number'})
            const check = await Student.findOne({email})
            if(check) return res.json({statusCode: 401, message: 'Bad request Email Already exist...!!!'})
            const student = await Student.create({ email, name, password, phone, state, city, image });
            return res.status(201).json({statusCode: 201, student});
        }catch(err){

            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async studentLogin(req, res){
        try{
            const commenUser = req.user
            const accessToken = await commenUser.generateToken()
            return res.status(200).json({statusCode: 200, commenUser, accessToken: `JWT ${accessToken}`, expiresIn: '12h'})  
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async studentUpdate(req, res){
        try{
            const { name, newPassword, city, state } = req.body
            let image
            if(req.file !== undefined){
                const imageContent =await  convertBufferToString(req.file.originalname, req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                image = imageResponse.secure_url
            }
            const { studentId } = req.params
            const student = await Student.findOne({_id:studentId})
            if(!student) return res.json({ statusCode: 400, message: 'No Such student Exists'})
            if( name || image || newPassword || city || state ){
                if(name) await student.updateOne({ name })
                if(image) await student.updateOne({ image })
                if(city) await student.updateOne({ city })
                if(state) await student.updateOne({ state })
                if(newPassword){
                    const hp = await hash(newPassword, 10)
                    await student.updateOne({ password: hp })
                }
                return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
            }
        }catch(err){
            console.log(err.message)
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }},

    async studentLogOut(req, res){
        try{
            const commenUser = req.user
            await commenUser.updateOne({accessToken: ""})
            commenUser.save()
            return res.status(200).json({statusCode: 200, message: 'LogOut Successfully'})  
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
}