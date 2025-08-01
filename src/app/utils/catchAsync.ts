import { NextFunction, Request, Response } from "express";

type AsyncHandler=(req:Request,res:Response ,next:NextFunction)=>Promise<void>

const catchAsync=(fn:AsyncHandler) =>(req:Request,res:Response ,next:NextFunction) =>{
     Promise.resolve(fn(req,res,next)).catch((error) => {
          console.log(error);
          next(error)
     })
}

export default catchAsync;