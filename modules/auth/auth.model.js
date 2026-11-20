import { boolean } from "joi";
import mongoose from "mongoose";
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



export default mongoose.model("User",userSchema);