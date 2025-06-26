import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import AddTransactionForm from './components/AddTransactionForm';
import CategoryBreakdown from './components/CategoryBreakdown';
import TransactionsTable from './components/TransactionsTable';

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

  const API_BASE_URL = 'http://localhost:8000';

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
        loadMockData();
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      loadMockData();
    }
  };

  const loadMockData = () => {
    const mockData = [
      { id: 1, amount: 1500, description: 'Salary', category: 'Income', type: 'income', date: '2025-06-20' },
      { id: 2, amount: 50, description: 'Groceries', category: 'Food', type: 'expense', date: '2025-06-21' },
      { id: 3, amount: 30, description: 'Gas', category: 'Transportation', type: 'expense', date: '2025-06-22' },
    ];
    setTransactions(mockData);
  };

  const handleSubmit = async () => {
    if (!newTransaction.amount || !newTransaction.description) {
      alert('Please fill in all required fields.');
      return;
    }

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
        addToLocal(transaction);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      addToLocal(transaction);
    }

    setNewTransaction({
      amount: '',
      description: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const addToLocal = (transaction) => {
    const localTransaction = {
      id: Date.now(),
      ...transaction
    };
    setTransactions([...transactions, localTransaction]);
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactions(transactions.filter(t => t.id !== id));
      } else {
        removeFromLocal(id);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      removeFromLocal(id);
    }
  };

  const removeFromLocal = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
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
        <Header />

        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddTransactionForm
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
            categories={categories}
            handleSubmit={handleSubmit}
          />

          <CategoryBreakdown
            expensesByCategory={expensesByCategory}
            totalExpenses={totalExpenses}
          />
        </div>

        <TransactionsTable
          filteredTransactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default App;
