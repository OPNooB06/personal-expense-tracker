// summary.js - total, category-wise totals and budget warning 
function showSummary() { 
  // 1. Total spending 
  let total = 0; 
  for (const e of expenses) { total += e.amount; } 
  document.getElementById("totalAmount").textContent = "₹" + total; 
}