const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
console.log(jwt_secret)
const z = require('zod')


function usermiddleware(req,res,next){
    const authen = req.headers.authorization;

    if(!authen || !authen.startsWith("Bearer ")){
        return res.status(401).json({msg:"Autherization failed. No access Token"})
    }

    const Token =   authen.split(" ")[1]
    try{
        const decoded = jwt.verify(Token, jwt_secret)
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(403).json({msg:"Could not verify Token"})
    }
   
    
} 

module.exports = usermiddleware;