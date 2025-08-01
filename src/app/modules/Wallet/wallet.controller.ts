/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { walletService } from "./wallet.service";
import { ROLE } from "../user/user.interface";

export const addMoney = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = (req as any).user._id;
    const agentId = (req as any).user.role === ROLE.AGENT? userId : undefined;
    const result = await walletService.addMoney(userId, amount, agentId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const withdrawMoney = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = (req as any).user._id;
    const agentId = (req as any).user.role === ROLE.AGENT ? userId : undefined;
    const result = await walletService.withdrawMoney(userId, amount, agentId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const sendMoney = async (req: Request, res: Response) => {
  try {
    const { toUserId, amount } = req.body;
    const fromUserId = (req as any).user._id;
    const result = await walletService.sendMoney(fromUserId, toUserId, amount);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const wallet = await walletService.getWallet(userId);
    res.json(wallet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const blockWallet = async (req: Request, res: Response) => {
  try {
    const { walletId, block } = req.body;
    const wallet = await walletService.blockWallet(walletId, block);
    res.json(wallet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const  WalletController={
    addMoney,
    sendMoney,
    getWallet,
    blockWallet,
    withdrawMoney
}