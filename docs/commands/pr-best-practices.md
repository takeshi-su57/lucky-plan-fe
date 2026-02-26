# Pull Request Best Practices

## PR Title Format

Follow the same conventional commit format:

```
<type>(<scope>): <short description>
```

### Examples

```
feat(auth): add OAuth2 login flow
fix(dashboard): resolve chart rendering on mobile
refactor(api): migrate REST endpoints to v2
docs: update deployment guide
```

## PR Description Template

```markdown
## Summary
<!-- 1-3 bullet points describing what this PR does -->

- Add user authentication via OAuth2
- Implement token refresh mechanism
- Add login/logout UI components

## Motivation
<!-- Why is this change needed? Link to the full issue URL (issues live in a separate repo) -->

Resolves https://github.com/takeshi-su57/lucky-plan/issues/123

## Changes
<!-- List the key changes made -->

- Added `AuthProvider` context for managing auth state
- Created `useAuth` hook for consuming auth context
- Added login page with Google/GitHub OAuth options
- Added token refresh logic in API interceptor

## Screenshots
<!-- If UI changes, add before/after screenshots -->

| Before | After |
|--------|-------|
| screenshot | screenshot |

## How to Test
<!-- Steps for reviewers to verify the changes -->

1. Checkout this branch
2. Run `npm install`
3. Navigate to `/login`
4. Click "Sign in with Google"
5. Verify redirect and token storage

## Checklist
- [ ] Self-reviewed the code
- [ ] Added/updated tests
- [ ] No new warnings or errors
- [ ] Tested on target browsers/devices
- [ ] Updated documentation if needed
```

## PR Size Guidelines

| Size      | Lines Changed | Recommendation          |
| --------- | ------------- | ----------------------- |
| XS        | 1-10          | Quick review            |
| Small     | 11-100        | Ideal size              |
| Medium    | 101-300       | Acceptable              |
| Large     | 301-500       | Consider splitting      |
| XL        | 500+          | Split into smaller PRs  |

## Key Rules

1. **Keep PRs small** — easier to review, fewer bugs, faster merge
2. **One concern per PR** — don't mix features, fixes, and refactors
3. **Descriptive title** — reviewers should understand the change at a glance
4. **Link issues** — use the full issue URL (e.g. `Resolves https://github.com/takeshi-su57/lucky-plan/issues/123`) since issues live in a separate repository. Never use shorthand `#123` references
5. **Self-review first** — review your own diff before requesting others
6. **Add context** — explain _why_, not just _what_ changed
7. **Use draft PRs** — for work-in-progress to get early feedback
8. **Respond to all comments** — resolve or discuss every review comment before merging
