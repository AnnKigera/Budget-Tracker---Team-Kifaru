import React, { useState, useEffect } from 'react';
import './App.css';

// If you don't have these icons, you can replace them with text or install lucide-react
// npm install lucide-react
// import { PlusCircle, Trash2, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

// Simple icon components (if you don't want to install lucide-react)
const PlusCircle = () => <span>➕</span>;
const Trash2 = () => <span>🗑️</span>;
const DollarSign = () => <span>💲</span>;
const TrendingUp = () => <span>📈</span>;
const TrendingDown = () => <span>📉</span>;
const Wallet = () => <span>💰</span>;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([
    'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other'
  ]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState('all');

  // API base URL - update this to match your backend
  const API_BASE_URL = 'http://localhost:8000';

  // Load transactions from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        // Fallback to mock data if API is not available
        const mockData = [
          { id: 1, amount: 1500, description: 'Salary', category: 'Income', type: 'income', date: '2025-06-20' },
          { id: 2, amount: 50, description: 'Groceries', category: 'Food', type: 'expense', date: '2025-06-21' },
          { id: 3, amount: 30, description: 'Gas', category: 'Transportation', type: 'expense', date: '2025-06-22' },
        ];
        setTransactions(mockData);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Fallback to mock data
      const mockData = [
        { id: 1, amount: 1500, description: 'Salary', category: 'Income', type: 'income', date: '2025-06-20' },
        { id: 2, amount: 50, description: 'Groceries', category: 'Food', type: 'expense', date: '2025-06-21' },
        { id: 3, amount: 30, description: 'Gas', category: 'Transportation', type: 'expense', date: '2025-06-22' },
      ];
      setTransactions(mockData);
    }
  };

  const handleSubmit = async () => {
    if (!newTransaction.amount || !newTransaction.description) return;

    const transaction = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const createdTransaction = await response.json();
        setTransactions([...transactions, createdTransaction]);
      } else {
        // Fallback to local state if API is not available
        const localTransaction = {
          id: Date.now(),
          ...transaction
        };
        setTransactions([...transactions, localTransaction]);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      // Fallback to local state
      const localTransaction = {
        id: Date.now(),
        ...transaction
      };
      setTransactions([...transactions, localTransaction]);
    }

    setNewTransaction({
      amount: '',
      description: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactions(transactions.filter(t => t.id !== id));
      } else {
        // Fallback to local state
        setTransactions(transactions.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Fallback to local state
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' || t.type === filter
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Wallet />
            Budget Tracker
          </h1>
          <p className="text-gray-600">Take control of your finances</p>
        </div>

        {/* Summary Cards */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Transaction Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PlusCircle />
              Add Transaction
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Transaction description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Transaction
              </button>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
            <div className="space-y-3">
              {Object.entries(expensesByCategory).map(([category, amount]) => {
                const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transactions List */}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.category}</td>
                    <td className={`py-3 px-4 text-sm font-semibold text-right ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;