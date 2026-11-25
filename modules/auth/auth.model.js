import { boolean } from "joi";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new  mongoose.Schema({
name:{
    type:String,
    required:[true,"Name is required"],
    minlength:2,
    maxlength:50,
    
},
email:{
    type:String,
    required:[true,"Email is required"],
    unique:true
    
    
},
password:{
    type:String,
    required:[true,"password is required"],
    minlength:2,
    maxlength:50,
    select:false
    
},
role:{
    type:String,
    enum:["customer","seller","admin"],
    default:"customer"

},isvarified:{
    type:boolean,
    default:false
},
verificationToken:{type:string,select:false},
refreshToken:{type:string,select:false},
resetpasswordtoken:{type:string,select:false},
resetpasswordExpires:{type:string,select:false}
},{timestamps:true})

userSchema.pre("save", async  function(next){
if (!this.isModified("password")) {
    return next()
}
this.password = await bcrypt.hash(this.password,6)
next()
})

userSchema.method.comparePassword = async function (cleartextpassword){
   return bcrypt.compare(cleartextpassword,this.password)
}

export default mongoose.model("User",userSchema);