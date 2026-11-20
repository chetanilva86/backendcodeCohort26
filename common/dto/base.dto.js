import joi from "joi"
 
class basedto {
static schema = joi.object({})

static schema = joi.object({
    name:joi.string().trim().min(2).max(50).required(),
    email:joi.string().trim().min(2).max(50).required(),
    password:joi.string().trim().min(2).max(50).required(),
    role:joi.string().valid("customer","seller").default("customer"),
})

static validate (data){
   const {error,value} =  this.schema.validate(data,{
        abortEarly:false,
        stripUnknown:true
    })

    if(error){
       
         const error =error.details.map((d)=> d.message)
        return {errors,value:null}

    }
    return {errors:null,value}
}
}

export default basedto