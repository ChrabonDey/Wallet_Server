import { envVars } from './../../config/env';
import  bcryptjs  from 'bcryptjs';
import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import jwt  from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/no-explicit-any */
const credentialsLogin=async(payload :Partial<IUser>)=>{
    const{email,password}=payload
      const isUserExist= await User.findOne({email})
    
         
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
   }

 const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string );
 if( !isPasswordMatch ){
     throw new AppError(httpStatus.BAD_REQUEST, "incorrect Password") 
}

  const token = jwt.sign({ id: isUserExist._id }, envVars.JWT_SECRET, { expiresIn: '1d' });
 

return {
    email:isUserExist.email,
    token

}
}


export const AuthService={
    credentialsLogin
}