import  httpStatus  from 'http-status-codes';
import { Request, Response } from "express";


export const notfound=(req:Request, res:Response)=>{
     res.status(httpStatus.NOT_FOUND).json({
         success:false,
         message: "Route Not Found"
     })
}