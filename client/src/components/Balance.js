import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions.map((t) => t.amount);
  const balance = total.reduce((acc, val) => acc + val, 0).toFixed(2);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1 id='balance'>${balance}</h1>
    </div>
  );
};
