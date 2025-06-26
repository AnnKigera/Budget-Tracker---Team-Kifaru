// components/CategoryBreakdown.js
import React from 'react';

export default function CategoryBreakdown({ expensesByCategory, totalExpenses }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <div className="space-y-3">
        {Object.entries(expensesByCategory).map(([category, amount]) => {
          const percentage = totalExpenses ? (amount / totalExpenses) * 100 : 0;
          return (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{category}</span>
              <div className="flex items-center gap-3">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
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
  );
}
