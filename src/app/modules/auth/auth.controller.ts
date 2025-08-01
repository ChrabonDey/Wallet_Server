/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from './auth.service';



const credential=  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const loginInfo= await AuthService.credentialsLogin(req.body)
    res.status(httpStatus.OK).json({
        success:true,
        message: "Login successfully",
        data:loginInfo
    });
});

export const AuthControllers={
    credential
}