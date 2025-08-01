"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const wallet_controller_1 = require("./wallet.controller");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post('/add-money', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.USER, user_interface_1.ROLE.AGENT), wallet_controller_1.WalletController.addMoney);
router.post('/withdraw', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.USER, user_interface_1.ROLE.AGENT), wallet_controller_1.WalletController.withdrawMoney);
router.post('/send-money', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.USER), wallet_controller_1.WalletController.sendMoney);
router.get('/me', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.USER, user_interface_1.ROLE.AGENT), wallet_controller_1.WalletController.getWallet);
router.patch('/block', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.ADMIN), wallet_controller_1.WalletController.blockWallet);
exports.walletRoutes = router;
