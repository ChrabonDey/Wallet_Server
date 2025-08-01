import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IsAgent, IUser, ROLE } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import walletModel from '../Wallet/wallet.model';
import { Types } from 'mongoose';

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, role, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    role: role || "USER",
    ...rest,
  });

  
  if (user.role === "USER" || user.role === "AGENT") {
    const wallet = new walletModel({ userId: user._id, balance: 50 });
    await wallet.save();
  }

  return user;
};

const getAllusers= async()=>{
      const users= await User.find({})
      return users
}
export const approveAgent = async (payload: { _id: string }, status: "approved" | "suspended") => {
  const { _id } = payload;

  if (!_id || !Types.ObjectId.isValid(_id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or missing user ID");
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (user.role !== ROLE.AGENT) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is not an agent (role: ${user.role})`);
  }

  user.agentApprovalStatus = status as IsAgent;
  await user.save();

  return user;
};

export const Userservice={
    createUserService,
    getAllusers,
    approveAgent
 }