import mongoose, { Schema } from "mongoose";
import { IWallet } from "./wallet.interface";


const WalletSchema=new Schema<IWallet>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance:{type:Number, default:25 ,min:0 },
    isBlocked:{type:Boolean, default:false}
},{
     timestamps:true,
    versionKey:false
})


export default mongoose.model<IWallet>("Wallet",WalletSchema)