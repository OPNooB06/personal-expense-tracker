// summary.js - total, category-wise totals and budget warning
const budgetInput = document.getElementById("budgetInput");
// Load the saved budget and save it whenever the user types a new one
budgetInput.value = localStorage.getItem("budget") || "";
budgetInput.addEventListener("input", function () {
  localStorage.setItem("budget", budgetInput.value);
  showSummary();
});
function showSummary() {
  // 1. Total spending
  let total = 0;
  for (const e of expenses) {
    total += e.amount;
  }
  document.getElementById("totalAmount").textContent = "₹" + total;
  // 2. Category-wise totals
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }
  const categoryList = document.getElementById("categoryTotals");
  categoryList.innerHTML = "";
  for (const category in totals) {
    const li = document.createElement("li");
    li.textContent = category + ": ₹" + totals[category];
    categoryList.appendChild(li);
  }
  // 3. Budget warning
  const budget = Number(budgetInput.value);
  const message = document.getElementById("budgetMessage");
  if (budget > 0 && total > budget) {
    message.textContent =
      "Warning: you crossed your budget by ₹" + (total - budget);
    message.className = "warning";
  } else if (budget > 0) {
    message.textContent = "You can still spend ₹" + (budget - total);
    message.className = "ok";
  } else {
    message.textContent = "";
    message.className = "";
  }
}
