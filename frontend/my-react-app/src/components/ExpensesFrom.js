import React, { useState, useEffect } from 'react';

export default function ExpenseForm({ onSaved, editingExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || '');
      setAmount(editingExpense.amount || '');
      setDate(editingExpense.date ? new Date(editingExpense.date).toISOString().split('T')[0] : '');
      setCategory(editingExpense.category || '');
    } else {
      setTitle(''); setAmount(''); setDate(''); setCategory('');
    }
  }, [editingExpense]);

  const submit = (e) => {
    e.preventDefault();
    onSaved({
      title,
      amount: Number(amount),
      date: new Date(date).toISOString(),
      category: category || 'Other'
    });
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button type="submit">{editingExpense ? 'Update' : 'Add'}</button>
    </form>
  );
}
