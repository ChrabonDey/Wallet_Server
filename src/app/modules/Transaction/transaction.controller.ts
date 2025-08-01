/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { transactionService } from "./transaction.service";

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const transactions = await transactionService.getTransactionHistory(userId, page, limit);
    res.json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommissionHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const transactions = await transactionService.getCommissionHistory(userId, page, limit);
    res.json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const transactionController={
     getTransactionHistory,
     getCommissionHistory
}