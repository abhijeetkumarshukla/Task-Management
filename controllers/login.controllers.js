const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const dotenv = require('dotenv').config()

const userLogin = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
       
         if(user){
            bcrypt.compare(password,user.password, function(err,result){
                if(err){
                 res.status(400).json({message:`somthing went wrong while comparing.`, err})
                }
                if(result){
                   const token = jwt.sign({email:user.email ,"userID":user.id},process.env.SECRET_KEY)
                   res.status(200).json({message:`login done.`,  token:token})
                }
             })
         }else{
           
            
             res.status(401).json({message:`user not found`})
        }  
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = userLogin;