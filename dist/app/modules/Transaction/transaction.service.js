"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = exports.getCommissionHistory = exports.getTransactionHistory = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = __importDefault(require("../Wallet/wallet.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const getTransactionHistory = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, page = 1, limit = 10) {
    const wallet = yield wallet_model_1.default.findOne({ userId });
    if (!wallet)
        throw new Error('Wallet not found');
    const skip = (page - 1) * limit;
    const transactions = yield transaction_model_1.default.find({
        $or: [{ fromWallet: wallet._id }, { toWallet: wallet._id }],
    })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    return transactions;
});
exports.getTransactionHistory = getTransactionHistory;
const getCommissionHistory = (agentId_1, ...args_1) => __awaiter(void 0, [agentId_1, ...args_1], void 0, function* (agentId, page = 1, limit = 10) {
    const agent = yield user_model_1.User.findById(agentId);
    if (!agent || agent.role !== user_interface_1.ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
        throw new Error('Agent not found or not approved');
    }
    const wallet = yield wallet_model_1.default.findOne({ userId: agentId });
    if (!wallet)
        throw new Error('Wallet not found');
    const skip = (page - 1) * limit;
    const transactions = yield transaction_model_1.default.find({
        fromWallet: wallet._id,
        commission: { $gt: 0 },
    })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    return transactions;
});
exports.getCommissionHistory = getCommissionHistory;
exports.transactionService = {
    getTransactionHistory: exports.getTransactionHistory,
    getCommissionHistory: exports.getCommissionHistory
};
