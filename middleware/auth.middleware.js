const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authUser = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
             res.send('token not found')
        }
        if(token){
         const decoded = jwt.verify(token,process.env.SECRET_KEY)
         req.body.userID = decoded.userID

        }
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = authUser