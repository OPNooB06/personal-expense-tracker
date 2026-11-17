// filter.js - show only the chosen category
function getFilteredExpenses() {
  const selected = document.getElementById("filterCategory").value;
  if (selected === "All") {
    return expenses;
  }
  return expenses.filter(function (e) {
    return e.category === selected;
  });
}
// When the dropdown changes, redraw the page
document
  .getElementById("filterCategory")
  .addEventListener("change", function () {
    refreshPage();
  });
