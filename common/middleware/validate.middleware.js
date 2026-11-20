import apiError from "../utils/api-errors";

const validate = (dtoClass)=>{
return (req,res,next)=>{
    const {errors,value}=dtoClass.validate(req.body)
    if (errors) {
        throw apiError.badrequest(errors.join(";"))// join toh bas masti main use kiya hai 
    }
    req.body = value 
    next()
}
}

export default validate