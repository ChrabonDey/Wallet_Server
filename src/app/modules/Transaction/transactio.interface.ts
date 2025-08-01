import { Types } from "mongoose";

export enum ITypo{
   Add_money= 'add_money' ,

   Withdraw= 'withdraw' ,
   Send_money ='send_money',
  Cash_in= 'cash_in' ,
  Cash_Out='cash_out'
}

export interface ITransaction {
  _id?: string;
  fromWallet: Types.ObjectId;
  toWallet?: string;
  amount: number;
  type: ITypo;
  status: 'pending' | 'completed' | 'reversed';
  fee?: number;
  commission?: number;
  createdAt: Date;
}