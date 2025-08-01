import  express  from 'express';
import { authenticate, restrictTo } from "../../middlewares/authMiddleware";
import { WalletController } from "./wallet.controller";
import { ROLE } from '../user/user.interface';



const router = express.Router();

router.post('/add-money', authenticate, restrictTo(ROLE.USER,ROLE.AGENT), WalletController.addMoney);
router.post('/withdraw', authenticate, restrictTo(ROLE.USER,ROLE.AGENT), WalletController.withdrawMoney);
router.post('/send-money', authenticate, restrictTo(ROLE.USER), WalletController.sendMoney);
router.get('/me', authenticate, restrictTo(ROLE.USER,ROLE.AGENT), WalletController.getWallet);
router.patch('/block', authenticate, restrictTo(ROLE.ADMIN), WalletController.blockWallet);

export const walletRoutes=router;