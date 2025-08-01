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
exports.transactionController = exports.getCommissionHistory = exports.getTransactionHistory = void 0;
const transaction_service_1 = require("./transaction.service");
const getTransactionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const transactions = yield transaction_service_1.transactionService.getTransactionHistory(userId, page, limit);
        res.json(transactions);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getTransactionHistory = getTransactionHistory;
const getCommissionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const transactions = yield transaction_service_1.transactionService.getCommissionHistory(userId, page, limit);
        res.json(transactions);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getCommissionHistory = getCommissionHistory;
exports.transactionController = {
    getTransactionHistory: exports.getTransactionHistory,
    getCommissionHistory: exports.getCommissionHistory
};
