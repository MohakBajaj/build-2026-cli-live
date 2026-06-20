# PR Review Agent

Automatically reviews a pull request the moment it opens and pings the maintainer.

Implements [issue #3](https://github.com/MohakBajaj/build-2026-cli-live/issues/3):
*"Build an agent which reviews a PR as soon as it opens and Ping me."*

## What it does

When a pull request is **opened**, **reopened**, or **marked ready for review**, the
workflow [`.github/workflows/pr-review-agent.yml`](../.github/workflows/pr-review-agent.yml):

1. **Requests a GitHub Copilot code review** (best-effort — skipped silently if Copilot
   code review is not enabled for the repo).
2. **Builds an automated review summary** — files changed, additions/deletions, and the
   list of changed files.
3. **Pings the maintainer** with a comment that `@`-mentions them, includes the summary,
   and provides a review checklist.

Draft PRs are skipped until they are marked ready for review.

## Configuration

| Setting | How | Default |
| --- | --- | --- |
| Who gets pinged | Repository variable `PR_PING_USERNAME` | The repository owner |
| Copilot review | Enable **Settings → Copilot → Code review** for the repo | Best-effort |

To set the ping target:

```bash
gh variable set PR_PING_USERNAME --body "your-github-username"
```

## Permissions

The workflow uses the built-in `GITHUB_TOKEN` with `pull-requests: write`. No extra
secrets are required.
