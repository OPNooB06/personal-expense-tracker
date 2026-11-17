// storage.js - keeps the list of expenses and saves it in the browser.

let expenses = [];

try {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    expenses = Array.isArray(savedExpenses) ? savedExpenses : [];
} catch (error) {
    // If stored data is damaged or unavailable, start with an empty list.
    expenses = [];
}

function saveExpenses() {
    try {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (error) {
        // Ignore storage quota or sandbox restrictions.
    }
}

function addExpense(title, amount, category, date) {
    const expense = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title: title.trim(),
        amount: Number(amount),
        category: category,
        date: date
    };

    expenses.push(expense);
    saveExpenses();
}

function deleteExpense(id) {
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveExpenses();
}