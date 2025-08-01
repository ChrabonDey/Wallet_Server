/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ROLE } from "../user/user.interface";
import { User } from "../user/user.model";
import walletModel from "../Wallet/wallet.model";
import transactionModel from "./transaction.model";

export const getTransactionHistory = async (userId: string, page: number = 1, limit: number = 10) => {
  const wallet = await walletModel.findOne({ userId });
  if (!wallet) throw new Error('Wallet not found');

  const skip = (page - 1) * limit;
  const transactions = await transactionModel.find({
    $or: [{ fromWallet: wallet._id }, { toWallet: wallet._id }],
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return transactions;
};

export const getCommissionHistory = async (agentId: string, page: number = 1, limit: number = 10) => {
  const agent = await User.findById(agentId);
  if (!agent || agent.role !== ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
    throw new Error('Agent not found or not approved');
  }

  const wallet = await walletModel.findOne({ userId: agentId });
  if (!wallet) throw new Error('Wallet not found');

  const skip = (page - 1) * limit;
  const transactions = await transactionModel.find({
    fromWallet: wallet._id,
    commission: { $gt: 0 },
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return transactions;
};

export const transactionService={
     getTransactionHistory,
     getCommissionHistory
}