# Personal Expense Tracker

A simple web page to record daily expenses, see totals by category and get a warning when the budget is crossed. Built as a group assignment for **SEC101: Advanced Tools and Applications (MCA)** using *Git*, *GitHub* and *Markdown*.

## Objectives

- Build a working project together using Git and GitHub
- Practise branching, pull requests, code reviews and merge-conflict resolution
- Document the project using Markdown

## Team Members

| Name | Roll No. | GitHub | Contribution |
| --- | --- | --- | --- |
| Jatin Yadav | 72 | [@OPNooB06](https://github.com/OPNooB06) | Repository setup, saving data, add and delete expense (`storage.js`, `app.js`) |
| Jatin Kumar | 33 | [@Jatin-In](https://github.com/Jatin-In) | Total, category totals, filter and budget warning (`summary.js`, `filter.js`) |

## Features

1. Add an expense with title, amount, category and date
2. Delete an expense
3. Data is saved in the browser (localStorage), so it stays after a refresh
4. Total spending and category-wise totals
5. Filter the list by category
6. Budget limit with a warning when it is crossed

## Technologies

- **HTML5** for the page structure
- **CSS3** for the styling
- **JavaScript** (no libraries) for the logic
- **Git and GitHub** for teamwork

## Project Structure

```text
personal-expense-tracker/
  index.html       page layout
  style.css        styling
  storage.js       save, add and delete expenses
  summary.js       total, category totals, budget warning
  filter.js        category filter
  app.js           shows the list and handles the form
  README.md        this file
  CONTRIBUTING.md  who did what
  screenshots/     images used below
```

## Installation and Execution

1. Clone the repository:

```bash
git clone https://github.com/your-username/personal-expense-tracker.git
cd personal-expense-tracker
```

2. Open `index.html` in any web browser (double-click it). Nothing else needs to be installed.

## Screenshots

![Home page](screenshots/app-home.png)

![Filter by category](screenshots/app-filter.png)

![Budget warning](screenshots/app-budget.png)

![After deleting an expense](screenshots/app-delete.png)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branches, pull requests and reviews.

---

*Made by Jatin Yadav and Jatin Kumar.*