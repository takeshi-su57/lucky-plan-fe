# GitHub Issue Best Practices

## Issue Title Format

```
[<type>]: <concise description>
```

### Type Prefixes

| Prefix      | When to use                        |
| ----------- | ---------------------------------- |
| `[Bug]`     | Something is broken                |
| `[Feature]` | New functionality request          |
| `[Chore]`   | Maintenance, dependencies, tooling |
| `[Docs]`    | Documentation improvements         |
| `[Refactor]`| Code restructuring                 |
| `[Perf]`    | Performance issue or improvement   |
| `[Question]`| Seeking clarification              |

### Title Examples

```
[Bug]: Login button unresponsive on mobile Safari
[Feature]: Add dark mode toggle to settings page
[Chore]: Upgrade TypeScript to v5.4
[Docs]: Add API authentication guide
[Refactor]: Simplify user state management
```

## Issue Templates

### Bug Report

```markdown
## Description
<!-- Clear, concise description of the bug -->

The login button does not respond to tap events on mobile Safari.

## Steps to Reproduce
1. Open the app on iOS Safari
2. Navigate to `/login`
3. Tap the "Sign In" button
4. Nothing happens

## Expected Behavior
<!-- What should happen -->

User should be redirected to the OAuth flow.

## Actual Behavior
<!-- What actually happens -->

Button does not respond. No console errors.

## Environment
- Browser: Safari 17.2
- OS: iOS 17.3
- Device: iPhone 15
- App Version: 2.1.0

## Screenshots / Logs
<!-- Attach screenshots, screen recordings, or console logs -->
```

### Feature Request

```markdown
## Description
<!-- What feature do you want? -->

Add a dark mode toggle to the user settings page.

## Motivation
<!-- Why is this needed? What problem does it solve? -->

Users have requested dark mode for better readability in low-light
environments. This was the #1 requested feature in our last survey.

## Proposed Solution
<!-- How should it work? -->

- Add a toggle switch under Settings > Appearance
- Support "Light", "Dark", and "System" options
- Persist preference in user profile

## Alternatives Considered
<!-- Other approaches you thought about -->

- Browser-only CSS media query (no user control)
- Separate dark theme URL (poor UX)

## Acceptance Criteria
- [ ] Toggle switch appears in settings
- [ ] Theme persists across sessions
- [ ] System preference is detected by default
- [ ] All pages render correctly in dark mode
```

### Task / Chore

```markdown
## Description
<!-- What needs to be done? -->

Upgrade TypeScript from 5.2 to 5.4.

## Motivation
<!-- Why? -->

- Access to new language features
- Fix known compiler bugs
- Stay within supported versions

## Tasks
- [ ] Update `typescript` in `package.json`
- [ ] Fix any new type errors
- [ ] Verify build passes
- [ ] Run full test suite
```

## Labels Convention

| Label             | Color   | Purpose                    |
| ----------------- | ------- | -------------------------- |
| `bug`             | red     | Something is broken        |
| `enhancement`     | blue    | New feature                |
| `documentation`   | green   | Docs improvement           |
| `good first issue`| purple  | Beginner friendly          |
| `priority:high`   | orange  | Needs immediate attention  |
| `priority:medium` | yellow  | Normal priority            |
| `priority:low`    | gray    | Nice to have               |
| `wontfix`         | white   | Will not be addressed      |
| `duplicate`       | white   | Already reported           |

## Key Rules

1. **Search first** — check if a similar issue already exists before creating one
2. **One issue, one concern** — don't bundle multiple bugs or features together
3. **Be specific** — vague titles like "it's broken" waste everyone's time
4. **Reproduce bugs** — always include steps to reproduce
5. **Add context** — screenshots, logs, and environment info speed up resolution
6. **Use labels** — helps with triage, filtering, and prioritization
7. **Link related work** — reference related issues, PRs, or discussions
8. **Update status** — close issues when resolved, add comments on progress
