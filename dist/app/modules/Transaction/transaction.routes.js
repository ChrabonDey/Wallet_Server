"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const transaction_controller_1 = require("./transaction.controller");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.get('/history', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.USER, user_interface_1.ROLE.AGENT), transaction_controller_1.transactionController.getTransactionHistory);
router.get('/commissions', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.AGENT), transaction_controller_1.transactionController.getCommissionHistory);
exports.transactionRoutes = router;
