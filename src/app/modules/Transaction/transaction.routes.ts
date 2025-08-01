import express  from 'express';
import { authenticate, restrictTo } from '../../middlewares/authMiddleware';
import { transactionController } from './transaction.controller';
import { ROLE } from '../user/user.interface';


const router = express.Router();

router.get('/history', authenticate, restrictTo(ROLE.USER,ROLE.AGENT), transactionController.getTransactionHistory);
router.get('/commissions', authenticate, restrictTo(ROLE.AGENT), transactionController.getCommissionHistory);

export const transactionRoutes=router;