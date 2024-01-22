import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((t) => t.amount);
  const expenses =
    amounts
      .filter((e) => e < 0)
      .reduce((a, e) => a + e, 0)
      .toFixed(2) || '0.00';
  const income =
    amounts
      .filter((e) => e >= 0)
      .reduce((a, e) => a + e, 0)
      .toFixed(2) || '0.00';
  return (
    <div>
      <div className='inc-exp-container'>
        <div>
          <h4>Income</h4>
          <p id='money-plus' className='money plus'>
            +${transactions ? income : '0.00'}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id='money-minus' className='money minus'>
            -${Math.abs(expenses)}
          </p>
        </div>
      </div>
    </div>
  );
};
