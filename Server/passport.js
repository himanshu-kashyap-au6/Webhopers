const passport = require('passport')
const { Strategy: localStrategy } = require('passport-local')
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const Student = require('./models/Student')

passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done)=>{
        try{
            let data = null
            if(email){
                const student = await Student.findOne({email})
                if (student) {
                    const fStudent = await Student.findByEmailAndPassword(email, password)
                    data = fStudent
                }
            }
            return done(null, data)
        }catch(err){
            if(err.name === 'authError') done(null, false, {message: err.message})
            done(err)
        }
    })
)

// passport-jwt Strategy for protective routes
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    ]), 
    secretOrKey: process.env.JWT_SECRET_KEY
}
passport.use(new JWTStrategy(jwtOptions, async ({id}, done)=>{
    try{
        let data = null
        if(id){
            const student = await Student.findOne({_id: id})
            if (student) {
                const fStudent = await Student.findById(id)
                if(!fStudent) return done(null, false, {message: 'Invalid Credentials'})
                else data = fStudent
            }
        }
        done(null, data)
    }catch(err){
        if(err.name === 'Error'){
            done(err)
        }
    }
})
)
