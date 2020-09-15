const { sign } = require('jsonwebtoken')

module.exports = {
    async confirmationToken(){
        const student = this
        const accessToken = await sign({id: student._id}, process.env.JWT_SECRET_KEY, {expiresIn: '12h'})
        if(accessToken){
            student.accessToken = accessToken 
        }
        await student.save()
        return accessToken
    }
}