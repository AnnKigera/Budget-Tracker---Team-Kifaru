// components/Header.js
import React from 'react';
import { Wallet } from './Icons'; // or define icons here

export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
        <Wallet />
        Budget Tracker
      </h1>
      <p className="text-gray-600">Take control of your finances</p>
    </div>
  );
}
