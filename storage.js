// storage.js - keeps the list of expenses and saves it in the browser.

let expenses = [];

try {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    expenses = Array.isArray(savedExpenses) ? savedExpenses : [];
} catch (error) {
    // If stored data is damaged, start with an empty list instead of crashing.
    expenses = [];
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(title, amount, category, date) {
    const expense = {
        id: Date.now(),
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
