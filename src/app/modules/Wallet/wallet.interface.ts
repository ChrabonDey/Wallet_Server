import { Types } from "mongoose";


export interface IWallet{
    _id?:string,
 userId: Types.ObjectId,
    balance:number,
    isBlocked:boolean
}