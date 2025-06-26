// components/AddTransactionForm.js
import React from 'react';
import { PlusCircle } from './Icons';

export default function AddTransactionForm({ newTransaction, setNewTransaction, categories, handleSubmit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PlusCircle />
        Add Transaction
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <select
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>

        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}
