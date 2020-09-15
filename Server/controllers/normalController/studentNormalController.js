module.exports = {
    async getStudentProfile(req, res){
        try{
            return res.json( { student: req.user })
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
}