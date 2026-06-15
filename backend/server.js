const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'expenses.json');

app.use(cors());
app.use(express.json());

function readExpenses() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// ✅ GET all expenses
app.get('/api/expenses', (req, res) => {
  try {
    res.json(readExpenses());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADD new expense
app.post('/api/expenses', (req, res) => {
  try {
    const expenses = readExpenses();
    const expense = { _id: crypto.randomUUID(), ...req.body };
    expenses.push(expense);
    writeExpenses(expenses);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ UPDATE expense
app.put('/api/expenses/:id', (req, res) => {
  try {
    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Expense not found' });

    expenses[index] = { ...expenses[index], ...req.body, _id: expenses[index]._id };
    writeExpenses(expenses);
    res.json(expenses[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE expense
app.delete('/api/expenses/:id', (req, res) => {
  try {
    const expenses = readExpenses();
    const filtered = expenses.filter((e) => e._id !== req.params.id);
    writeExpenses(filtered);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
