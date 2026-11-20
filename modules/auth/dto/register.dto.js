import Joi from "joi";
import basedto from "../../../common/dto/base.dto.js"

class RegisterDto extends basedto{
static schema = joi.object({
    name:joi.string().trim().min(2).max(50).required(),
    email:joi.string().trim().min(2).max(50).required(),
    password:joi.string().trim().min(2).max(50).required(),
    role:joi.string().valid("customer","seller").default("customer"),
})
}


export default RegisterDto 