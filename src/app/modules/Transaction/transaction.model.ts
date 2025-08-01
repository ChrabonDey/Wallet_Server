import mongoose, { Schema } from "mongoose";
import { ITransaction, ITypo } from "./transactio.interface";


const TransactionSchema=new Schema<ITransaction>({
    fromWallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  toWallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  amount: { type: Number, required: true, min: 0 },
  type: { 
    type: String, 
    enum: Object.values(ITypo), 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'reversed'], 
    default: 'pending' 
  },
  fee: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
