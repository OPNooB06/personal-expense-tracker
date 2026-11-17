// storage.js - keeps the list of expenses and saves it in the browser

// Read saved expenses from localStorage (empty list if nothing is saved yet)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save the list into localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add one new expense to the list
function addExpense(title, amount, category, date) {
  const expense = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    category: category,
    date: date
  };
  expenses.push(expense);
  saveExpenses();
}


// Remove the expense with the given id
function deleteExpense(id) {
  expenses = expenses.filter(function (e) {
    return e.id !== id;
  });
  saveExpenses();
}