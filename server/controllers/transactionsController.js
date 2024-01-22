import TransactionModel from '../models/TransactionModel.js';
// @desc		Get all transactions
// @route		GET /api/v1/transactions
// @access	Public
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// @desc		Add transaction
// @route		POST /api/v1/transactions
// @access	Public
export const addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const newTransaction = new TransactionModel({
      text,
      amount,
    });
    await newTransaction.save();
    res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      res.status(400).json({
        success: false,
        error: error,
        messages: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
};

// @desc		Get all transactions
// @route		DELETE /api/v1/transactions/:id
// @access	Public
export const deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findById(id);
    if (!transaction) {
      res.status(404).json({
        success: false,
        message: `No ressource with id: ${id}`,
      });
    } else {
      const deletedTransaction = await transaction.deleteOne();
      res.status(200).json({
        success: true,
        message: 'Deleted',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
