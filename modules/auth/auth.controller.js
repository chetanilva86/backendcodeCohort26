import * as authService from "./auth.service"

import apiResponse from "../../common/utils/api-response"

const register = async ()=>{
 const user =   await authService.register(req.body)
    apiResponse.created(res, "registration success",user)
}

export {register}