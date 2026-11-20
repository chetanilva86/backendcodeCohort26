import crypto from "crypto"
import jwt from "jsonwebtoken"


const generateAccessToken = (playload)=>{
   return  jwt.sign(playload,process.env.JWT_ACCESS_SECRETE,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    })
}

const verifyAccessToken = (token)=>{
      return jwt.verify(token,process.env.JWT_ACCESS_SECRETE)
}

const generateRfreshToken = (playload)=>{
   return  jwt.sign(playload,process.env.JWT_REFRESH_SECRET,{
        expiresIn:process.env.JWT_REFRESH_EXPAIRES_IN || "7d"
    })
}
const verifyRefreshToken = (token)=>{
      return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}


const generateResetToken = ()=>{
const rawToken = crypto.randomBytes(32).toString("hex")
const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")


return {rawToken,hashedToken}
}

export {
    generateResetToken,generateAccessToken,generateRfreshToken,verifyAccessToken,verifyRefreshToken
}