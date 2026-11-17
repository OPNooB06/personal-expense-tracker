// storage.js - keeps the list of expenses and saves it in the browser

// Read saved expenses from localStorage (empty list if nothing is saved yet)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save the list into localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}