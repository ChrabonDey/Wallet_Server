import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import mongoose from 'mongoose';
import walletModel from './wallet.model';
import transactionModel from '../Transaction/transaction.model';
import { User } from '../user/user.model';
import { SystemConfig } from '../SystemConfig/system.model';
import { ROLE } from '../user/user.interface';

export const addMoney = async (userId: string, amount: number, agentId?: string) => {
  if (amount <= 0) throw new Error('Amount must be positive');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await walletModel.findOne({ userId }).session(session);
    if (!wallet || wallet.isBlocked) throw new Error('Wallet not found or blocked');

    // Check if agent is approved if agentId is provided
    if (agentId) {
      const agent = await User.findById(agentId).session(session);
      if (!agent || agent.role !== ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
        throw new Error('Agent not found or not approved');
      }
    }

    const config = await SystemConfig.findOne().session(session);
    const fee = config?.transactionFee || 5;
    const commission = agentId ? (config?.commissionRate || 0.01) * amount : 0;

    wallet.balance += (amount - fee);
    await wallet.save({ session });

    const transaction = new transactionModel({
      fromWallet: wallet._id,
      amount,
      type: agentId ? 'cash_in' : 'add_money',
      status: 'completed',
      fee,
      commission,
    });
    await transaction.save({ session });

    if (agentId) {
      const agentWallet = await walletModel.findOne({ userId: agentId }).session(session);
      if (!agentWallet || agentWallet.isBlocked) throw new AppError(httpStatus.BAD_REQUEST, 'Agent wallet not found or blocked');
      agentWallet.balance += commission;
      await agentWallet.save({ session });
    }

    await session.commitTransaction();
    return { wallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const sendMoney = async (fromUserId: string, toUserId: string, amount: number) => {
  if (amount <= 0) throw new Error('Amount must be positive');
  if (fromUserId === toUserId) throw new Error('Cannot send money to self');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fromWallet = await walletModel.findOne({ userId: fromUserId }).session(session);
    const toWallet = await walletModel.findOne({ userId: toUserId }).session(session);

    if (!fromWallet || fromWallet.isBlocked) throw new Error('Sender wallet not found or blocked');
    if (!toWallet || toWallet.isBlocked) throw new Error('Receiver wallet not found or blocked');
    if (fromWallet.balance < amount) throw new Error('Insufficient balance');

    const config = await SystemConfig.findOne().session(session);
    const fee = config?.transactionFee || 5;

    fromWallet.balance -= (amount + fee);
    toWallet.balance += amount;

    await fromWallet.save({ session });
    await toWallet.save({ session });

    const transaction = new transactionModel({
      fromWallet: fromWallet._id,
      toWallet: toWallet._id,
      amount,
      type: 'send_money',
      status: 'completed',
      fee,
    });
    await transaction.save({ session });

    await session.commitTransaction();
    return { fromWallet, toWallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const withdrawMoney = async (userId: string, amount: number, agentId?: string) => {
  if (amount <= 0) throw new Error('Amount must be positive');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await walletModel.findOne({ userId }).session(session);
    if (!wallet || wallet.isBlocked) throw new Error('Wallet not found or blocked');
    if (wallet.balance < amount) throw new Error('Insufficient balance');

    // Check if agent is approved if agentId is provided
    if (agentId) {
      const agent = await User.findById(agentId).session(session);
      if (!agent || agent.role !== ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
        throw new Error('Agent not found or not approved');
      }
    }

    const config = await SystemConfig.findOne().session(session);
    const fee = config?.transactionFee || 5;
    const commission = agentId ? (config?.commissionRate || 0.01) * amount : 0;

    wallet.balance -= (amount + fee);
    await wallet.save({ session });

    const transaction = new transactionModel({
      fromWallet: wallet._id,
      amount,
      type: agentId ? 'cash_out' : 'withdraw',
      status: 'completed',
      fee,
      commission,
    });
    await transaction.save({ session });

    if (agentId) {
      const agentWallet = await walletModel.findOne({ userId: agentId }).session(session);
      if (!agentWallet || agentWallet.isBlocked) throw new Error('Agent wallet not found or blocked');
      agentWallet.balance += commission;
      await agentWallet.save({ session });
    }

    await session.commitTransaction();
    return { wallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getWallet = async (userId: string) => {
  const wallet = await walletModel.findOne({ userId });
  if (!wallet) throw new AppError(httpStatus.BAD_REQUEST, 'Wallet not found');
  return wallet;
};

export const blockWallet = async (walletId: string, block: boolean) => {
  const wallet = await walletModel.findById(walletId);
  if (!wallet) throw new AppError(httpStatus.BAD_REQUEST, 'Wallet not found');
  wallet.isBlocked = block;
  await wallet.save();
  return wallet;
};

export const walletService = {
  addMoney,
  getWallet,
  sendMoney,
  withdrawMoney,
  blockWallet
};
