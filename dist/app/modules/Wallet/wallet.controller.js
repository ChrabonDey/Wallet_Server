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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = exports.blockWallet = exports.getWallet = exports.sendMoney = exports.withdrawMoney = exports.addMoney = void 0;
const wallet_service_1 = require("./wallet.service");
const user_interface_1 = require("../user/user.interface");
const addMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const userId = req.user._id;
        const agentId = req.user.role === user_interface_1.ROLE.AGENT ? userId : undefined;
        const result = yield wallet_service_1.walletService.addMoney(userId, amount, agentId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addMoney = addMoney;
const withdrawMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const userId = req.user._id;
        const agentId = req.user.role === user_interface_1.ROLE.AGENT ? userId : undefined;
        const result = yield wallet_service_1.walletService.withdrawMoney(userId, amount, agentId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.withdrawMoney = withdrawMoney;
const sendMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { toUserId, amount } = req.body;
        const fromUserId = req.user._id;
        const result = yield wallet_service_1.walletService.sendMoney(fromUserId, toUserId, amount);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.sendMoney = sendMoney;
const getWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const wallet = yield wallet_service_1.walletService.getWallet(userId);
        res.json(wallet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getWallet = getWallet;
const blockWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletId, block } = req.body;
        const wallet = yield wallet_service_1.walletService.blockWallet(walletId, block);
        res.json(wallet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.blockWallet = blockWallet;
exports.WalletController = {
    addMoney: exports.addMoney,
    sendMoney: exports.sendMoney,
    getWallet: exports.getWallet,
    blockWallet: exports.blockWallet,
    withdrawMoney: exports.withdrawMoney
};
