// app.js - shows the expense list, handles the form and the delete buttons

function showExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  const shown = getFilteredExpenses();

  if (shown.length === 0) {
    list.innerHTML = "<li>No expenses to show.</li>";
    return;
  }

  for (const e of shown) {
    const li = document.createElement("li");
    li.textContent = e.date + " - " + e.title + " (" + e.category + "): ₹" + e.amount;

    // Delete button
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.className = "delete-btn";
    btn.onclick = function () {
      deleteExpense(e.id);
      refreshPage();
    };
    li.appendChild(btn);

    list.appendChild(li);
  }
}

// Redraw everything on the page
function refreshPage() {
  showExpenses();
  showSummary();
}

// When the form is submitted, add the expense
document.getElementById("expenseForm").addEventListener("submit", function (event) {
  event.preventDefault();

  addExpense(
    document.getElementById("titleInput").value,
    document.getElementById("amountInput").value,
    document.getElementById("categoryInput").value,
    document.getElementById("dateInput").value
  );

  this.reset();
  refreshPage();
});

refreshPage();