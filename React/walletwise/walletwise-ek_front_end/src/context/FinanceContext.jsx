import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // ── INITIAL LOAD ──
  // I am checking the browser's LocalStorage. If 'walletwise_incomes' exists, I parse it.
  // Otherwise, I start with an empty array so the facilitator begins with a clean slate.
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('walletwise_incomes');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('walletwise_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  // ── PERSISTENCE ENGINE ──
  // I use useEffect to watch for changes. Every time an income or expense is added or deleted,
  // this block runs and updates the browser's storage automatically.
  useEffect(() => {
    localStorage.setItem('walletwise_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('walletwise_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // ── CALCULATIONS ──
  // I am using useMemo to calculate totals so they update instantly on the Dashboard.
  const totalIncome = useMemo(() => 
    incomes.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0), [incomes]);

  const totalExpense = useMemo(() => 
    expenses.reduce((acc, curr) => acc + parseFloat(curr.spent || 0), 0), [expenses]);

  const totalBalance = totalIncome - totalExpense;

  // ── SHARED ACTIONS ──
  const addIncome = (data) => setIncomes([...incomes, { ...data, id: Date.now() }]);
  const addExpense = (data) => setExpenses([...expenses, { ...data, id: Date.now() }]);
  
  // I added a delete function so the facilitator can manage the list
  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const deleteIncome = (id) => setIncomes(incomes.filter(i => i.id !== id));

  return (
    <FinanceContext.Provider value={{ 
      incomes, expenses, totalIncome, totalExpense, totalBalance, 
      addIncome, addExpense, deleteExpense, deleteIncome 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);