/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError"

export const globalErrorHandler=(err: any,req:Request, res:Response,  next : NextFunction)=>{
    let statusCode=500
    if(err instanceof AppError){
         statusCode= err.statusCode
    } else if(err instanceof Error){
        statusCode=500;
        
    }
   res.status(statusCode).json({
     success:false,
     message: `Something Went Wrong! ${err.message} from chrabon created`,
     err,
     stack:envVars.NODE_ENV==="development"?err.stack :null //basically detected which line give me an error so it find out very well 

   })   
}