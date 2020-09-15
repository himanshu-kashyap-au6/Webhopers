const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash, compare } = require('bcryptjs')
const { confirmationToken } = require('../token')
const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: false
    },
    city: {
        type: String,
        trim: true,
        required: false
    },
    accessToken: {
        type: String,
        trim: true,
        required: false
    }
})

studentSchema.pre('save', async function(next){
    const pfit = this
    try{
        if(pfit.isModified('password')){
            const hp = await hash(pfit.password, 10)
            pfit.password = hp
            next()
        }
    }catch(err){
        next(err)
    }
})

studentSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const admin = await Student.findOne({email: email})
        if(!admin) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, admin.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return admin
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

studentSchema.methods.toJSON = function(){
    const admin = this.toObject()
    delete admin.password
    delete admin.accessToken
    delete admin.__v
    return admin
}

studentSchema.methods.generateToken = confirmationToken

const Student = mongoose.model('students', studentSchema)
module.exports = Student