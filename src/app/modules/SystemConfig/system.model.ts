import mongoose, { Schema } from "mongoose";
import { ISystemConfig } from "./system.interface";


const SystemConfigSchema = new Schema<ISystemConfig>({
  transactionFee: { type: Number, default: 5 },
  commissionRate: { type: Number, default: 0.01 },
});

export const SystemConfig= mongoose.model<ISystemConfig>('SystemConfig', SystemConfigSchema);