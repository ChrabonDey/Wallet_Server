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
exports.walletService = exports.blockWallet = exports.getWallet = exports.withdrawMoney = exports.sendMoney = exports.addMoney = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const wallet_model_1 = __importDefault(require("./wallet.model"));
const transaction_model_1 = __importDefault(require("../Transaction/transaction.model"));
const user_model_1 = require("../user/user.model");
const system_model_1 = require("../SystemConfig/system.model");
const user_interface_1 = require("../user/user.interface");
const addMoney = (userId, amount, agentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount <= 0)
        throw new Error('Amount must be positive');
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const wallet = yield wallet_model_1.default.findOne({ userId }).session(session);
        if (!wallet || wallet.isBlocked)
            throw new Error('Wallet not found or blocked');
        // Check if agent is approved if agentId is provided
        if (agentId) {
            const agent = yield user_model_1.User.findById(agentId).session(session);
            if (!agent || agent.role !== user_interface_1.ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
                throw new Error('Agent not found or not approved');
            }
        }
        const config = yield system_model_1.SystemConfig.findOne().session(session);
        const fee = (config === null || config === void 0 ? void 0 : config.transactionFee) || 5;
        const commission = agentId ? ((config === null || config === void 0 ? void 0 : config.commissionRate) || 0.01) * amount : 0;
        wallet.balance += (amount - fee);
        yield wallet.save({ session });
        const transaction = new transaction_model_1.default({
            fromWallet: wallet._id,
            amount,
            type: agentId ? 'cash_in' : 'add_money',
            status: 'completed',
            fee,
            commission,
        });
        yield transaction.save({ session });
        if (agentId) {
            const agentWallet = yield wallet_model_1.default.findOne({ userId: agentId }).session(session);
            if (!agentWallet || agentWallet.isBlocked)
                throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Agent wallet not found or blocked');
            agentWallet.balance += commission;
            yield agentWallet.save({ session });
        }
        yield session.commitTransaction();
        return { wallet, transaction };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.addMoney = addMoney;
const sendMoney = (fromUserId, toUserId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount <= 0)
        throw new Error('Amount must be positive');
    if (fromUserId === toUserId)
        throw new Error('Cannot send money to self');
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const fromWallet = yield wallet_model_1.default.findOne({ userId: fromUserId }).session(session);
        const toWallet = yield wallet_model_1.default.findOne({ userId: toUserId }).session(session);
        if (!fromWallet || fromWallet.isBlocked)
            throw new Error('Sender wallet not found or blocked');
        if (!toWallet || toWallet.isBlocked)
            throw new Error('Receiver wallet not found or blocked');
        if (fromWallet.balance < amount)
            throw new Error('Insufficient balance');
        const config = yield system_model_1.SystemConfig.findOne().session(session);
        const fee = (config === null || config === void 0 ? void 0 : config.transactionFee) || 5;
        fromWallet.balance -= (amount + fee);
        toWallet.balance += amount;
        yield fromWallet.save({ session });
        yield toWallet.save({ session });
        const transaction = new transaction_model_1.default({
            fromWallet: fromWallet._id,
            toWallet: toWallet._id,
            amount,
            type: 'send_money',
            status: 'completed',
            fee,
        });
        yield transaction.save({ session });
        yield session.commitTransaction();
        return { fromWallet, toWallet, transaction };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.sendMoney = sendMoney;
const withdrawMoney = (userId, amount, agentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount <= 0)
        throw new Error('Amount must be positive');
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const wallet = yield wallet_model_1.default.findOne({ userId }).session(session);
        if (!wallet || wallet.isBlocked)
            throw new Error('Wallet not found or blocked');
        if (wallet.balance < amount)
            throw new Error('Insufficient balance');
        // Check if agent is approved if agentId is provided
        if (agentId) {
            const agent = yield user_model_1.User.findById(agentId).session(session);
            if (!agent || agent.role !== user_interface_1.ROLE.AGENT || agent.agentApprovalStatus !== 'approved') {
                throw new Error('Agent not found or not approved');
            }
        }
        const config = yield system_model_1.SystemConfig.findOne().session(session);
        const fee = (config === null || config === void 0 ? void 0 : config.transactionFee) || 5;
        const commission = agentId ? ((config === null || config === void 0 ? void 0 : config.commissionRate) || 0.01) * amount : 0;
        wallet.balance -= (amount + fee);
        yield wallet.save({ session });
        const transaction = new transaction_model_1.default({
            fromWallet: wallet._id,
            amount,
            type: agentId ? 'cash_out' : 'withdraw',
            status: 'completed',
            fee,
            commission,
        });
        yield transaction.save({ session });
        if (agentId) {
            const agentWallet = yield wallet_model_1.default.findOne({ userId: agentId }).session(session);
            if (!agentWallet || agentWallet.isBlocked)
                throw new Error('Agent wallet not found or blocked');
            agentWallet.balance += commission;
            yield agentWallet.save({ session });
        }
        yield session.commitTransaction();
        return { wallet, transaction };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.withdrawMoney = withdrawMoney;
const getWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.default.findOne({ userId });
    if (!wallet)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Wallet not found');
    return wallet;
});
exports.getWallet = getWallet;
const blockWallet = (walletId, block) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.default.findById(walletId);
    if (!wallet)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Wallet not found');
    wallet.isBlocked = block;
    yield wallet.save();
    return wallet;
});
exports.blockWallet = blockWallet;
exports.walletService = {
    addMoney: exports.addMoney,
    getWallet: exports.getWallet,
    sendMoney: exports.sendMoney,
    withdrawMoney: exports.withdrawMoney,
    blockWallet: exports.blockWallet
};
