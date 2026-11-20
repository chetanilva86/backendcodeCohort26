class apiError extends Error{
    constructor(statuscode , message){
        super(message),
        this.statuscode = statuscode,
        this.opirational = true,
        this.captureStackTrace = (this.this.constructor)
    }

    static badrequest (message = "badrequest"){
return  new apiError(400,message)
    }

    static unautherized(message = "unautherized "){
        return new apiError(401,message)
    }

    static conflict (message = "user already exists"){
        return new apiError(409,message)
    }
    static forbidden (message = "forvidden"){
        return new apiError(412,message)
    }
    static notfound (message = "notfound"){
        return new apiError(412,message)
    }


}

export default apiError