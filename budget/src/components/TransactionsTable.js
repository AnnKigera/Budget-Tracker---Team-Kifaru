// components/TransactionsTable.js
import React from 'react';
import { Trash2 } from './Icons';

export default function TransactionsTable({ filteredTransactions, deleteTransaction, filter, setFilter }) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-right py-3 px-4">Amount</th>
              <th className="text-center py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{transaction.date}</td>
                <td className="py-3 px-4">{transaction.description}</td>
                <td className="py-3 px-4">{transaction.category}</td>
                <td className={`py-3 px-4 text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => deleteTransaction(transaction.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">No transactions found</div>
      )}
    </div>
  );
}
