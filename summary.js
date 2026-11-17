// summary.js - total, category-wise totals and budget warning
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
}
