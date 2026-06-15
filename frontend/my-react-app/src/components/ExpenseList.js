import React, { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load expenses. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSaved = async (payload) => {
    try {
      if (editing) {
        const res = await updateExpense(editing._id, payload);
        setExpenses(prev => prev.map(e => e._id === res.data._id ? res.data : e));
        setEditing(null);
      } else {
        const res = await createExpense(payload);
        setExpenses(prev => [res.data, ...prev]);
      }
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleEdit = (expense) => setEditing(expense);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this?')) return;
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <ExpenseForm onSaved={handleSaved} editingExpense={editing} />
      {loading ? <div>Loading...</div> : (
        expenses.length === 0 ? <div>No expenses yet</div> : (
          <div>{expenses.map(e => <ExpenseItem key={e._id} expense={e} onEdit={handleEdit} onDelete={handleDelete} />)}</div>
        )
      )}
    </div>
  );
}
