import apiError from "../../common/utils/api-errors.js";
import crypto from "crypto"
import User from "./auth.model.js"
import {rawToken,hashedToken, generateResetToken, generateAccessToken, generateRfreshToken, verifyRefreshToken} from "../../common/utils/jwt.utils.js"

const hashToken = (Token)=>{
   return  crypto.createHash("sha256").update(Token).digest("hex")
}

const register = async ({name,email,password,role})=>{
    // do user registration
         
 const existing =   await User.findOne({email})
 if (existing) {
    throw apiError.conflict("email already exisits")
 }


const {rawToken,hashedToken} = generateResetToken()

 const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken:hashedToken
})



    let userObj;
    return userobj
}



const login = async ({email,password})=>{
    // take email and find in db 

    const user = await User.findOne({email}).select("+password")
    if(!user){
        throw apiError.unautherized("Invalid Email or Password")
    }

    

    // then check if password is correct 

    // check if verified or not 


    // somehow i will check password

    if(!user.isvarified){
        throw apiError.forbidden("please verify your email before loggin")
    }

    const accessToken = generateAccessToken({id:user._id,role:user.role})
    const RefreshToken = generateRfreshToken({id:user._id})

    user.RefreshToken = hashToken(RefreshToken)

    await user.save({validateBeforeSave:false})

    const userObj = user.toObject()
    delete user.password
    delete user.RefreshToken

    return {user:userObj , accessToken,RefreshToken}

}



const refress = async(token) =>{
    if (!token) {
        throw apiError.unautherized("refresh token missing")
    }
      
        const decoded =   verifyRefreshToken(token)
      const user = await User.findById(decoded.id).select("+refreshToken")
      if (!user) {
        throw apiError.unautherized("user not found")
      }

      if (user.refreshToken !== hashToken(token)) {
        throw apiError.unautherized("user not found")
      }

      const accessToken = generateAccessToken({id:user._id,role:user.role})

      const refreshToken = generateRfreshToken({id:user._id,role:user.role})
      user.refreshToken = hashToken(refreshToken);
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}
    
 

 
}

const logout = async (userId) =>{
    const user = await User.findByIdAndUpdate(userId,{refreshToken:null})
    if(!user) throw apiError.unautherized("user not found")
}

forgotPossword = async (email)=>{
    const user = await User.findOne({email})
    if (!user) {
        throw apiError.notfound("no account wiht that email")
    }
    const {rawToken,hashedToken}= generateResetToken()
    user.resetpasswordtoken = hashedToken;
    user.resetpasswordExpires = Date.now() + 15*60*1000;

    await user.save();

    // todo : mail bhejne nahi aata
}

export {register}