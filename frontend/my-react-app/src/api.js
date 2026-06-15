import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

export const getExpenses = () => axios.get(API_URL);
export const createExpense = (expenseData) => axios.post(API_URL, expenseData);
export const updateExpense = (id, expenseData) => axios.put(`${API_URL}/${id}`, expenseData);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
