# Git Commit Message Conventions

## Format

```
<type>(<scope>): <short description>

<optional body>

<optional footer>
```

## Common Types

| Type       | When to use                                              |
| ---------- | -------------------------------------------------------- |
| `feat`     | New feature                                              |
| `fix`      | Bug fix                                                  |
| `docs`     | Documentation only                                       |
| `style`    | Formatting, no code change                               |
| `refactor` | Code change that neither fixes a bug nor adds a feature  |
| `perf`     | Performance improvement                                  |
| `test`     | Adding or fixing tests                                   |
| `chore`    | Build process, tooling, dependencies                     |
| `ci`       | CI/CD changes                                            |
| `revert`   | Reverting a previous commit                              |

## Examples

```bash
# Simple feature
git commit -m "feat: add user login page"

# With scope
git commit -m "feat(auth): add JWT token refresh"

# Bug fix
git commit -m "fix(api): handle null response from /users endpoint"

# Breaking change (append !)
git commit -m "feat(api)!: change authentication flow to OAuth2"

# Multi-line with body
git commit -m "fix(cart): prevent duplicate items on rapid click

Debounce the add-to-cart button to prevent race conditions
when users click multiple times within 300ms."

# Chore
git commit -m "chore: upgrade React from 18 to 19"

# Docs
git commit -m "docs: add API usage examples to README"

# Refactor
git commit -m "refactor(utils): extract date formatting into helper"

# Test
git commit -m "test(auth): add unit tests for login validation"

# Revert
git commit -m "revert: revert feat(auth): add JWT token refresh"
```

## Key Rules

1. **Subject line**: imperative mood ("add" not "added" or "adds"), max ~50 chars
2. **No period** at the end of the subject line
3. **Lowercase** first letter after the type
4. **Body** (optional): wrap at 72 chars, explain _what_ and _why_, not _how_
5. **Footer** (optional): reference issues like `Closes #123` or note `BREAKING CHANGE:`

## Reference

This follows the [Conventional Commits](https://www.conventionalcommits.org) specification.
