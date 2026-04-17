import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // ── INITIAL LOAD (LOCAL STORAGE) ──
  // I am initializing all four data arrays from LocalStorage to ensure persistence.
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('walletwise_incomes');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('walletwise_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('walletwise_accounts');
    return saved ? JSON.parse(saved) : [];
  });

  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem('walletwise_debts');
    return saved ? JSON.parse(saved) : [];
  });

  // ── PERSISTENCE ENGINE ──
  // These effects ensure that any change to the state is immediately written to the browser's disk.
  useEffect(() => {
    localStorage.setItem('walletwise_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('walletwise_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('walletwise_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('walletwise_debts', JSON.stringify(debts));
  }, [debts]);

  // ── GLOBAL CALCULATIONS ──
  const totalIncome = useMemo(() => 
    incomes.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0), [incomes]);

  const totalExpense = useMemo(() => 
    expenses.reduce((acc, curr) => acc + parseFloat(curr.spent || 0), 0), [expenses]);

  const totalBalance = totalIncome - totalExpense;

  // ── SHARED ACTIONS ──
  const addIncome = (data) => setIncomes([...incomes, { ...data, id: Date.now() }]);
  const addExpense = (data) => setExpenses([...expenses, { ...data, id: Date.now() }]);
  const addAccount = (data) => setAccounts([...accounts, { ...data, id: Date.now() }]);
  const addDebt = (data) => setDebts([...debts, { ...data, id: Date.now() }]);
  
  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const deleteIncome = (id) => setIncomes(incomes.filter(i => i.id !== id));
  const deleteDebt = (id) => setDebts(debts.filter(d => d.id !== id));

  return (
    <FinanceContext.Provider value={{ 
      incomes, expenses, accounts, debts,
      totalIncome, totalExpense, totalBalance, 
      addIncome, addExpense, addAccount, addDebt,
      deleteExpense, deleteIncome, deleteDebt
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);