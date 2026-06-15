import React, { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add or Update Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = { title, amount, date };

      if (editingId) {
        await updateExpense(editingId, expenseData);
      } else {
        await createExpense(expenseData);
      }

      setTitle("");
      setAmount("");
      setDate("");
      setEditingId(null);

      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Load data into the form for editing
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date.split("T")[0]);
    setEditingId(expense._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-purple-600  tracking-wide mb-6">
           Expense Tracker
</h1>

        <div className="mb-6 p-4 bg-indigo-600 text-white rounded-xl shadow text-center">
  <h2 className="text-xl font-bold">Total Spent</h2>
  <p className="text-3xl font-semibold mt-2">₹{totalAmount}</p>
</div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl shadow-sm"
        >
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className={`py-2 px-4 text-white rounded-lg ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        {/* LIST */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Your Expenses</h2>
        <div className="flex flex-col gap-3">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-white hover:shadow-md transition"
            >
              <div>
                <h2 className="text-lg font-semibold">{expense.title}</h2>
                <p className="text-gray-600">
                  ₹{expense.amount} •{" "}
                  {new Date(expense.date).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(expense)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(expense._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {expenses.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No expenses yet. Add your first one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
