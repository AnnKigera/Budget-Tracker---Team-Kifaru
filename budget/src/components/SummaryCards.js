// components/SummaryCards.js
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from './Icons';

export default function SummaryCards({ totalIncome, totalExpenses, balance }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>
          <TrendingUp />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>
          <TrendingDown />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <DollarSign />
        </div>
      </div>
    </div>
  );
}
