import React, { createContext, useReducer } from 'react';
import GlobalReducer from './GlobalReducer';
import axios from 'axios';

// State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Context
export const GlobalContext = createContext(initialState);

// Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_TRANSACTIONS_FAIL',
        payload: error.response.data.errors,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_TRANSACTION_FAIL',
        payload: error.response.data.errors,
      });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(`/api/v1/transactions`, transaction);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_TRANSACTION_FAIL',
        payload: error.response.data.errors,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
