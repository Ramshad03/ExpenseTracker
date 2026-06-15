import React from 'react';

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const d = new Date(expense.date);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8, borderBottom: '1px solid #eee' }}>
      <div>
        <strong>{expense.title}</strong>
        <div style={{ fontSize: 12, color: '#666' }}>{expense.category} • {d.toLocaleDateString()}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: 700 }}>₹{expense.amount}</div>
        <div>
          <button onClick={() => onEdit(expense)}>Edit</button>
          <button onClick={() => onDelete(expense._id)} style={{ marginLeft: 8 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
