// app.js - displays expenses, handles adding/deleting, and powers modern dashboard UI enhancements.

const CATEGORY_META = {
    Food: { icon: "🍽️", color: "var(--cat-food)" },
    Travel: { icon: "🚕", color: "var(--cat-travel)" },
    Shopping: { icon: "🛍️", color: "var(--cat-shopping)" },
    Bills: { icon: "⚡", color: "var(--cat-bills)" },
    Other: { icon: "📦", color: "var(--cat-other)" }
};

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(Number(amount) || 0);
}

function formatReadableDate(dateStr) {
    if (!dateStr) return "";
    const parts = String(dateStr).split("-");
    if (parts.length !== 3) return dateStr;
    const parsed = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (Number.isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getTodayIsoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 2600);
}

function syncCategoryPills(selectedCategory) {
    const pills = document.querySelectorAll("#categoryPills .pill-tab");
    pills.forEach(function (pill) {
        const isMatch = pill.getAttribute("data-category") === selectedCategory;
        pill.classList.toggle("active", isMatch);
    });
}

function showExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    // getFilteredExpenses() is defined in Student 2's filter.js.
    const baseShown = Array.isArray(getFilteredExpenses()) ? getFilteredExpenses().slice() : [];
    const filterSelect = document.getElementById("filterCategory");
    const selectedCategory = filterSelect ? filterSelect.value : "All";
    const searchInput = document.getElementById("searchInput");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const sortSelect = document.getElementById("sortSelect");
    const sortMode = sortSelect ? sortSelect.value : "newest";

    syncCategoryPills(selectedCategory);

    // Ensure category filter & search work seamlessly before and after Student 2's filter.js merge
    const shown = baseShown.filter(function (expense) {
        const matchesCategory = selectedCategory === "All" || expense.category === selectedCategory;
        const matchesSearch = !query ||
            String(expense.title).toLowerCase().includes(query) ||
            String(expense.category).toLowerCase().includes(query) ||
            String(expense.date).toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    shown.sort(function (a, b) {
        if (sortMode === "highest") return b.amount - a.amount;
        if (sortMode === "lowest") return a.amount - b.amount;
        if (sortMode === "oldest") return String(a.date).localeCompare(String(b.date)) || (a.id - b.id);
        return String(b.date).localeCompare(String(a.date)) || (b.id - a.id);
    });

    const countBadge = document.getElementById("shownCountBadge");
    if (countBadge) {
        countBadge.textContent = shown.length + (shown.length === 1 ? " item" : " items");
    }

    const clearAllBtn = document.getElementById("clearAllBtn");
    if (clearAllBtn) {
        clearAllBtn.hidden = expenses.length === 0;
    }

    if (shown.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = expenses.length === 0
            ? "No expenses yet. Add your first expense on the left or load Demo Data."
            : "No expenses match your current filter or search.";
        list.appendChild(emptyItem);
        return;
    }

    for (const expense of shown) {
        const item = document.createElement("li");
        item.className = "expense-item";

        const leftGroup = document.createElement("div");
        leftGroup.className = "expense-left";

        const catKey = String(expense.category || "Other");
        const catSlug = "category-" + catKey.toLowerCase();
        const metaInfo = CATEGORY_META[catKey] || CATEGORY_META.Other;

        const avatar = document.createElement("div");
        avatar.className = "category-avatar " + catSlug;
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = metaInfo.icon;

        const details = document.createElement("div");
        details.className = "expense-details";

        const title = document.createElement("span");
        title.className = "expense-title";
        title.textContent = expense.title;

        const meta = document.createElement("div");
        meta.className = "expense-meta";

        const date = document.createElement("span");
        date.className = "expense-date";
        date.textContent = formatReadableDate(expense.date);
        date.title = expense.date;

        const category = document.createElement("span");
        category.className = "category-tag " + catSlug;
        category.textContent = expense.category;

        meta.appendChild(date);
        meta.appendChild(category);
        details.appendChild(title);
        details.appendChild(meta);

        leftGroup.appendChild(avatar);
        leftGroup.appendChild(details);

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
            showToast("Removed \"" + expense.title + "\"");
        });

        actions.appendChild(amount);
        actions.appendChild(deleteButton);
        item.appendChild(leftGroup);
        item.appendChild(actions);
        list.appendChild(item);
    }
}

function updateDashboardEnhancements() {
    let total = 0;
    const totals = {};

    for (const expense of expenses) {
        const amt = Number(expense.amount) || 0;
        total += amt;
        totals[expense.category] = (totals[expense.category] || 0) + amt;
    }

    // Progressive fallback when summary.js is still an empty stub on feature-member1
    const totalEl = document.getElementById("totalAmount");
    const categoryList = document.getElementById("categoryTotals");
    const budgetInput = document.getElementById("budgetInput");
    const budgetMessage = document.getElementById("budgetMessage");

    const isSummaryStub = categoryList && categoryList.children.length === 0 && expenses.length > 0;
    if (isSummaryStub || expenses.length === 0) {
        if (totalEl) {
            totalEl.textContent = "₹" + total;
        }
        if (categoryList) {
            categoryList.innerHTML = "";
            for (const category in totals) {
                const li = document.createElement("li");
                li.textContent = category + ": ₹" + totals[category];
                categoryList.appendChild(li);
            }
        }
        if (budgetInput && budgetMessage) {
            const budgetVal = Number(budgetInput.value);
            if (budgetVal > 0 && total > budgetVal) {
                budgetMessage.textContent = "Warning: you crossed your budget by ₹" + (total - budgetVal);
                budgetMessage.className = "warning";
            } else if (budgetVal > 0) {
                budgetMessage.textContent = "You can still spend ₹" + (budgetVal - total);
                budgetMessage.className = "ok";
            } else {
                budgetMessage.textContent = "";
                budgetMessage.className = "";
            }
        }
    }

    // Color-accent any categoryTotals <li> items (works with Student 2's summary.js too)
    if (categoryList) {
        Array.from(categoryList.children).forEach(function (li) {
            const text = li.textContent || "";
            const catName = text.split(":")[0].trim();
            const meta = CATEGORY_META[catName];
            if (meta) {
                li.style.borderLeftColor = meta.color;
            }
        });
    }

    // Mini KPIs
    const countEl = document.getElementById("statCount");
    const avgEl = document.getElementById("statAvg");
    const topCatEl = document.getElementById("statTopCategory");

    if (countEl) countEl.textContent = String(expenses.length);
    if (avgEl) {
        const avg = expenses.length > 0 ? Math.round(total / expenses.length) : 0;
        avgEl.textContent = "₹" + avg.toLocaleString("en-IN");
    }

    let topCategory = "—";
    let topCategoryAmount = 0;
    for (const cat in totals) {
        if (totals[cat] > topCategoryAmount) {
            topCategoryAmount = totals[cat];
            topCategory = cat;
        }
    }
    if (topCatEl) {
        topCatEl.textContent = topCategory;
    }

    // Visual Category Distribution Bar
    const distBar = document.getElementById("distributionBar");
    const distCaption = document.getElementById("distributionCaption");
    if (distBar) {
        distBar.innerHTML = "";
        if (total > 0) {
            const categoriesOrder = ["Food", "Travel", "Shopping", "Bills", "Other"];
            categoriesOrder.forEach(function (cat) {
                const catTotal = totals[cat] || 0;
                if (catTotal > 0) {
                    const pct = Math.max(4, Math.round((catTotal / total) * 100));
                    const seg = document.createElement("div");
                    seg.className = "dist-segment dist-" + cat.toLowerCase();
                    seg.style.width = pct + "%";
                    seg.title = cat + ": ₹" + catTotal + " (" + Math.round((catTotal / total) * 100) + "%)";
                    distBar.appendChild(seg);
                }
            });
            if (distCaption) {
                const topPct = Math.round((topCategoryAmount / total) * 100);
                distCaption.textContent = topCategory + " leads at " + topPct + "% of spend";
            }
        } else if (distCaption) {
            distCaption.textContent = "Add expenses to view breakdown";
        }
    }

    // Budget Progress Meter & Header Status Badge
    const budget = budgetInput ? Number(budgetInput.value) : 0;
    const progressFill = document.getElementById("budgetProgressFill");
    const usagePercent = document.getElementById("budgetUsagePercent");
    const statusBadge = document.getElementById("budgetStatusBadge");

    if (budget > 0) {
        const rawPct = Math.round((total / budget) * 100);
        const clampedPct = Math.min(100, Math.max(0, rawPct));
        if (progressFill) {
            progressFill.style.width = clampedPct + "%";
            progressFill.classList.toggle("is-warning", total > budget);
            progressFill.classList.toggle("is-ok", total <= budget);
        }
        if (usagePercent) {
            usagePercent.textContent = rawPct + "% of ₹" + budget.toLocaleString("en-IN");
        }
        if (statusBadge) {
            if (total > budget) {
                statusBadge.textContent = "Over Budget";
                statusBadge.className = "status-pill status-warn";
            } else {
                statusBadge.textContent = "Within Budget";
                statusBadge.className = "status-pill status-ok";
            }
        }
    } else {
        if (progressFill) {
            progressFill.style.width = "0%";
            progressFill.className = "budget-progress-fill";
        }
        if (usagePercent) {
            usagePercent.textContent = "Set a limit to track %";
        }
        if (statusBadge) {
            statusBadge.textContent = "No budget set";
            statusBadge.className = "status-pill";
        }
    }
}

function refreshPage() {
    showExpenses();

    // showSummary() is defined in Student 2's summary.js.
    showSummary();

    updateDashboardEnhancements();
}

// Form submission
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
    document.getElementById("dateInput").value = getTodayIsoDate();
    refreshPage();
    showToast("Added \"" + title + "\" (" + formatCurrency(amount) + ")");
});

// Initialize interactive controls
(function initModernUI() {
    const dateInput = document.getElementById("dateInput");
    if (dateInput && !dateInput.value) {
        dateInput.value = getTodayIsoDate();
    }

    const currentDateBadge = document.getElementById("currentDateBadge");
    if (currentDateBadge) {
        currentDateBadge.textContent = new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    // Restore saved theme
    try {
        const savedTheme = localStorage.getItem("expense_theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    } catch (e) {}

    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            try {
                localStorage.setItem("expense_theme", next);
            } catch (e) {}
        });
    }

    // Restore saved budget if summary.js hasn't loaded it yet
    const budgetInput = document.getElementById("budgetInput");
    if (budgetInput) {
        try {
            if (!budgetInput.value) {
                budgetInput.value = localStorage.getItem("budget") || "";
            }
        } catch (e) {}
        budgetInput.addEventListener("input", function () {
            try {
                localStorage.setItem("budget", budgetInput.value);
            } catch (e) {}
            refreshPage();
        });
    }

    // Quick amount chips
    document.querySelectorAll("[data-add-amount]").forEach(function (chip) {
        chip.addEventListener("click", function () {
            const addVal = Number(chip.getAttribute("data-add-amount")) || 0;
            const amountInput = document.getElementById("amountInput");
            if (amountInput) {
                const currentVal = Number(amountInput.value) || 0;
                amountInput.value = currentVal + addVal;
                amountInput.focus();
            }
        });
    });

    // Category filter dropdown listener & quick pills
    const filterSelect = document.getElementById("filterCategory");
    if (filterSelect) {
        filterSelect.addEventListener("change", function () {
            refreshPage();
        });
    }

    document.querySelectorAll("#categoryPills .pill-tab").forEach(function (pill) {
        pill.addEventListener("click", function () {
            const cat = pill.getAttribute("data-category") || "All";
            if (filterSelect) {
                filterSelect.value = cat;
                filterSelect.dispatchEvent(new Event("change"));
            } else {
                refreshPage();
            }
        });
    });

    // Search & Sort controls
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            showExpenses();
        });
    }

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            showExpenses();
        });
    }

    // Demo Data button
    const sampleBtn = document.getElementById("sampleDataBtn");
    if (sampleBtn) {
        sampleBtn.addEventListener("click", function () {
            const today = getTodayIsoDate();
            const samples = [
                { title: "High-Protein Groceries & Oats", amount: 680, category: "Food", date: today },
                { title: "Metro Smart Card Recharge", amount: 300, category: "Travel", date: today },
                { title: "Fiber Broadband Monthly Bill", amount: 825, category: "Bills", date: today },
                { title: "USB-C Braided Cable & Notebook", amount: 450, category: "Shopping", date: today },
                { title: "Post-Workout Smoothie & Snacks", amount: 190, category: "Food", date: today }
            ];
            samples.forEach(function (s) {
                addExpense(s.title, s.amount, s.category, s.date);
            });
            if (budgetInput && !budgetInput.value) {
                budgetInput.value = "5000";
                try {
                    localStorage.setItem("budget", "5000");
                } catch (e) {}
            }
            refreshPage();
            showToast("Loaded 5 sample expenses");
        });
    }

    // Export CSV button
    const exportBtn = document.getElementById("exportCsvBtn");
    if (exportBtn) {
        exportBtn.addEventListener("click", function () {
            if (expenses.length === 0) {
                showToast("No expenses to export yet");
                return;
            }
            const header = ["ID,Title,Category,Amount (INR),Date"];
            const rows = expenses.map(function (e) {
                const safeTitle = "\"" + String(e.title).replace(/"/g, "\"\"") + "\"";
                return [e.id, safeTitle, e.category, e.amount, e.date].join(",");
            });
            const csvContent = header.concat(rows).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "expenses-" + getTodayIsoDate() + ".csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            showToast("Exported expenses to CSV");
        });
    }

    // Two-step Clear All button (no blocking confirm() dialog)
    const clearAllBtn = document.getElementById("clearAllBtn");
    let clearArmed = false;
    let clearTimer = null;
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", function () {
            if (!clearArmed) {
                clearArmed = true;
                clearAllBtn.textContent = "Click to Confirm";
                clearTimer = setTimeout(function () {
                    clearArmed = false;
                    clearAllBtn.textContent = "Clear All";
                }, 3000);
                return;
            }
            clearTimeout(clearTimer);
            clearArmed = false;
            clearAllBtn.textContent = "Clear All";
            expenses = [];
            saveExpenses();
            refreshPage();
            showToast("Cleared all expenses");
        });
    }
})();

refreshPage();