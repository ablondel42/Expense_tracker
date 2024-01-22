import { Router } from 'express';
const transactionsRouter = Router();
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from '../controllers/transactionsController.js';

transactionsRouter.route('/').get(getTransactions);
transactionsRouter.route('/').post(addTransaction);
transactionsRouter.route('/:id').delete(deleteTransaction);

export default transactionsRouter;
