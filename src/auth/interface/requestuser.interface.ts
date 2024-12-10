import { Request } from "express"


// tipado para la union de payload y el request de express
export interface RequestWhitUser extends Request {
    user:{
      sub:string,
      role:string
    }
  }