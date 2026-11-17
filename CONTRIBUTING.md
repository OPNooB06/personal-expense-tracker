# Contributing

This file explains who did what, how we used branches, pull requests and code reviews.

## Individual Contributions

| Student | GitHub | Branch | Files | Features |
| --- | --- | --- | --- | --- |
| Jatin Yadav (Student 1) | @OPNooB06 | `feature-member1` | `storage.js`, `app.js` | Save in browser, add expense, delete expense |
| Jatin Kumar (Student 2) | @Jatin-In | `feature-member2` | `summary.js`, `filter.js` | Total, category totals, filter, budget warning |

Student 1 also created the repository, `.gitignore` and the starter code. Student 2 cloned the repository and resolved the merge conflict.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Final working code |
| `feature-member1` | Student 1 features (4 commits) |
| `feature-member2` | Student 2 features (4 commits) |
| `conflict-member1` | Student 1 heading change for the conflict demo |
| `conflict-member2` | Student 2 heading change for the conflict demo |

## Pull Requests

| PR | Title | Author | Reviewer | Result |
| --- | --- | --- | --- | --- |
| #1 | Add save, add and delete expense features | Student 1 | Student 2 | Approved and merged |
| #2 | Add summary, category filter and budget warning | Student 2 | Student 1 | Approved and merged |
| #3 | Change page heading (conflict demo) | Student 1 | Student 2 | Approved and merged |
| #4 | Change page heading (conflict demo) | Student 2 | Student 1 | Conflict resolved, approved and merged |

## Code Reviews

- Student 2 reviewed `storage.js` and `app.js`, tested the branch locally and left comments on the pull request.
- Student 1 reviewed `summary.js` and `filter.js` and left comments on the pull request.
- Student 1 checked the merge conflict fix in `index.html` before approving.

## Merge Conflict

Both students changed the heading on line 11 of `index.html` in separate branches. Git reported a conflict, Student 2 kept a combined heading, removed the conflict markers, committed the fix and pushed it.

## How to Contribute

1. Create a branch from `main`: `git checkout -b feature-name`
2. Make small commits with clear messages
3. Push the branch and open a pull request
4. Ask your partner to review it
5. Merge with a merge commit after approval