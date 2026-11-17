// app.js - displays expenses and handles adding and deleting them.

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(Number(amount) || 0);
}

function showExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    // getFilteredExpenses() is defined in Student 2's filter.js.
    const shown = getFilteredExpenses();

    if (shown.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = expenses.length === 0
            ? "No expenses yet. Add your first expense above."
            : "No expenses match this category.";
        list.appendChild(emptyItem);
        return;
    }

    for (const expense of shown) {
        const item = document.createElement("li");
        item.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const title = document.createElement("span");
        title.className = "expense-title";
        title.textContent = expense.title;

        const meta = document.createElement("div");
        meta.className = "expense-meta";

        const date = document.createElement("span");
        date.className = "expense-date";
        date.textContent = expense.date;

        const category = document.createElement("span");
        category.className = "category-tag";
        category.textContent = expense.category;
        category.classList.add(
            "category-" + String(expense.category).toLowerCase()
        );

        meta.appendChild(date);
        meta.appendChild(category);
        details.appendChild(title);
        details.appendChild(meta);

        const actions = document.createElement("div");
        actions.className = "expense-actions";

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = formatCurrency(expense.amount);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.setAttribute("aria-label", "Delete " + expense.title);

        deleteButton.addEventListener("click", function () {
            deleteExpense(expense.id);
            refreshPage();
        });

        actions.appendChild(amount);
        actions.appendChild(deleteButton);
        item.appendChild(details);
        item.appendChild(actions);
        list.appendChild(item);
    }
}

function refreshPage() {
    showExpenses();

    // showSummary() is defined in Student 2's summary.js.
    showSummary();
}

document.getElementById("expenseForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("titleInput").value.trim();
    const amount = Number(document.getElementById("amountInput").value);
    const category = document.getElementById("categoryInput").value;
    const date = document.getElementById("dateInput").value;

    if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
        return;
    }

    addExpense(title, amount, category, date);
    this.reset();
    refreshPage();
});

refreshPage();
