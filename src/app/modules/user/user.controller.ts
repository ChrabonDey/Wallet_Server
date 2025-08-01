/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes"
import { Userservice } from "./user.service";
import catchAsync from "../../utils/catchAsync";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await Userservice.createUserService(req.body);
    res.status(httpStatus.CREATED).json({
        message: "User created successfully",
        user
    });
});
const getallUsers=catchAsync(async (req:Request,res:Response ,next:NextFunction)=>{


          const user= await Userservice.getAllusers();
         
         res.status(httpStatus.OK).json({
             message:"User found successfully",
             user
         })
});


export const approveAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { _id, status } = req.body;

  if (!_id) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "User ID (_id) is required" });
    return;
  }
  if (!status || (status !== 'approved' && status !== 'suspended')) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "Status must be 'approved' or 'suspended'" });
    return;
  }

  console.log('approveAgent called with:', { _id, status });

  const user = await Userservice.approveAgent({ _id }, status);

  res.status(httpStatus.OK).json({
    message: "User updated successfully",
    user,
  });
});
       
        
       


         

export const UserController={
 createUser ,
 getallUsers,
 approveAgent
}

//higher order function means this kind of function who basically get a function in parameter and return a function