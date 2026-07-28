# Codacy ESLint 9

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/)](https://app.codacy.com/gh/codacy/codacy-eslint9/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CircleCI](https://circleci.com/gh/codacy/codacy-eslint9.svg?style=svg)](https://circleci.com/gh/codacy/codacy-eslint9)

## Manually upgrading packages / plugins / configs

```shell
npm run upgrade
```

## Adding new packages / plugins / configs

Install the package / plugin using npm:
```shell
npm install package-name -w codacy
```

## Configuring new plugins

**NOTE**: Before adding a plugin to the Codacy UI, make sure it has widespread use and is actively maintained.

1.  If the plugin has descriptions for rules on GitHub, reference them
    at `workspaces/doc-generator/src/index.ts` to include them on the generated documentation.

    -   Add another element to the array `downloadDocs` similar to the following example:
        ```typescript
        {
          // plugin package-name
          packageName: "eslint-plugin-xss",
          // path to .md patterns files within github
          relativeUrl: `/Rantanen/eslint-plugin-xss/master/docs/rules/`,
          // prefix for tag relases (for example if tags are "v.1.0.0" you have to prefix tags with "v.")
          // or "false" if package has no tags released
          // (default) "v"
          versionPrefix: "v",
          // change to true if it should fail in case of missing .md files for any pattern
          // (default) false
          rejectOnError: false
        }
        ```

    -   In `lib/models/plugins.ts` add a new value to the array with the name of the package/plugin:
        ```typescript
        // make sure it matches the correct name of the package
        const packageNames = [
          //(...)
          "@angular-eslint/eslint-plugin",
          //(...)
          "eslint-plugin-xss",
          //(...)
        ]
        ```

2.  [Generate documentation](#generating-documentation) so it adds the new plugin documentation.

3.  Add a new test in `workspaces/doc-generator/docs/multiple-tests` that uses the newly added plugin.
    You can use the Getting Started section of the package documentation to find a small usage example. 

## Generating documentation

```shell
npm start -w docs-generator
```

## Test changes to codacy-seed locally

You may need to test changes that comes from our [codacy-engine-typescript-seed](https://github.com/codacy/codacy-engine-typescript-seed).

1.  Create a package with your changes on the seed:
    *   Don't forget to update the dependencies: `npm install`
    *   Compile the library: `npm run compile`
    *   Package the library: `npm pack`
    > This should generate a codacy-seed-0.0.1.tgz on your codacy-seed repository

2.  Copy the `codacy-seed-0.0.1.tgz` into the root of this repository

3.  Install the package: `npm install codacy-seed-0.0.1.tgz`

4.  Update Dockerfile and `.dockerignore` so you copy the `codacy-seed-0.0.1.tgz` inside the docker you will be building
    *   Add `!codacy-seed-0.0.1.tgz` to your `.dockerignore`
    *   Add the package to the docker before `RUN npm install`: `COPY codacy-seed-0.0.1.tgz ./`

5.  Publish your docker locally as normal: `npm run build:docker:dev`

## Limitations

### Incompatible rules

There are some ESLint rules that will be ignored when running this Docker container. For more details on the ignored rules, check `blacklistRegexes` defined at [blacklist.ts](src/blacklist.ts).

Usually, these rules need an Internet connection and/or to check `node_modules`, and would not run successfully on our Docker container environment.

## Agent Playbook: Updating This Repository End-to-End

This section is written for an AI coding agent (or a human) tasked with updating this repo — most commonly bumping the wrapped ESLint version (and/or one of the many `eslint-plugin-*` versions), but also base image / orb bumps. Follow it top to bottom; it tells you what to change, how to regenerate derived files, how to test locally, and how to interpret CI so you can iterate on failures without guessing.

### 1. What this repository is

This is a **Codacy engine**: a Node.js/TypeScript wrapper (executed directly via `ts-node`/`node --import=register.js`, no separate compile step — see `entrypoint.sh` and `register.js`) that packages [ESLint 9](https://eslint.org/) plus a very large set of `eslint-plugin-*` / `@scope/eslint-plugin-*` packages as a Docker image Codacy's platform runs against a customer's source code. It is an **npm workspaces** project with three workspaces: `workspaces/docs-generator`, `workspaces/codacy` (the actual engine, `src/index.ts` / `src/engineImpl.ts`), and `lib` (shared models/utilities: `lib/models/plugins.ts`, `lib/models/blacklist.ts`, `lib/models/patterns.ts`, `lib/models/defaultPatterns.ts`, `lib/utils/metadata.ts`).

The `workspaces/docs-generator/docs/` directory **is** the equivalent of a Checkstyle-style `docs/patterns.json` engine, just under a different path:

- `workspaces/docs-generator/docs/patterns.json` — every ESLint/plugin rule Codacy knows about, their tool `name`/`version`, level/category, parameters, and whether it's enabled by default. **Generated, do not hand-edit.**
- `workspaces/docs-generator/docs/description/description.json` + `workspaces/docs-generator/docs/description/*.md` — human-readable titles/descriptions per rule shown in the Codacy UI. **Generated, do not hand-edit** (most are scraped from each plugin's own docs on GitHub, per the `downloadDocs` list in `workspaces/docs-generator/src/index.ts`).
- `workspaces/docs-generator/docs/multiple-tests/*` — fixtures (source files + expected `patterns.xml`/results) used by `codacy-plugins-test` to validate the engine's real output. There is **no** `docs/tests/*` (single-pattern) directory in this repo — only the "multiple" test type is used.

The generator itself is `workspaces/docs-generator/src/docsGenerator.ts` (invoked via `workspaces/docs-generator/src/index.ts`). It loads the actual ESLint rule definitions and plugin metadata in-process (via `lib/models/plugins.ts` / `getAllRules`), reads `../codacy/package.json` for plugin versions, and for plugins listed in `downloadDocs` fetches rule `.md` docs straight from each plugin's GitHub repo over HTTP (via `axios`) at a version-matched git tag. This means the generator needs **network access** at run time. `toolName`/`toolVersion` in `lib/utils/metadata.ts` are derived directly from the installed `eslint` package's `ESLint.version` — bumping the `eslint` dependency automatically changes the version stamped into `patterns.json`.

### 2. Files that encode versions — check all of these on every update

| File | What it controls | What to check |
|---|---|---|
| `package.json` → `dependencies.eslint` | Core ESLint version wrapped by this engine; also drives `toolVersion` in generated `patterns.json` | Bump to the target ESLint release. |
| `package.json` → `dependencies["eslint-plugin-*"]` / `@scope/eslint-plugin-*` | Every third-party rule set exposed to Codacy users | Bump the specific plugin(s) in scope for the task; check plugin release notes for renamed/removed/added rules. |
| `workspaces/codacy/package.json` → `dependencies` | The actual runtime dependency set used by the engine at analysis time (largely mirrors root `package.json`, but is the copy that matters for `docsGenerator`'s `initializeDependencies()`, which reads `../codacy/package.json`) | Keep in sync with root `package.json` for any plugin/eslint version you bump — recent bump commits touch both files together. |
| `package-lock.json` | Locked dependency tree | Regenerated automatically by `npm install`; commit it alongside the version bumps. |
| `.circleci/config.yml` → `codacy/base` orb | Shared CircleCI steps (checkout, versioning, docker build/publish, tagging) | Bump when asked, or when `codacy/plugins-test` needs a newer companion `codacy/base` (check CircleCI orb registry, or use `git log -p .circleci/config.yml` as a fallback reference for the bump cadence). |
| `.circleci/config.yml` → `codacy/plugins-test` orb | Runs `codacy-plugins-test` (`run_multiple_tests: true`) in CI after the image is built | Same as above. |
| `Dockerfile` → base image (`node:lts-alpine3.24`) | Node runtime the packaged engine runs on | Historically bumped in lockstep with ESLint version bumps in this repo (`alpine3.20` → `3.22` → `3.24`) — check whether the target ESLint release needs a newer Node, and bump if so. |

**Important, current-state caveat:** the README's older "Manually upgrading packages / plugins / configs" section documents `npm run upgrade` (backed by `preupgrade`/`upgrade`/`postupgrade` scripts using `npm-check-updates`). As of the most recent history (`git log --oneline -- package.json`, commit "Organize all packages, bump all possible versions"), **all `scripts` were deleted from the root `package.json`**, so `npm run upgrade` no longer exists. Until/unless those scripts are restored, bump dependency versions **manually** by editing the `dependencies` block(s) directly (in both `package.json` and `workspaces/codacy/package.json`), then run `npm install` at the repo root (this updates `package-lock.json` for all workspaces) and regenerate docs by hand with `npm start -w docs-generator` (see step 3 below) instead of relying on the old `postupgrade` hook.

Look at recent bump commits for the shape of a typical diff: `git log --oneline --all | grep -iE "bump|update|upgrade|version"`, then `git show <hash>`. Recent examples ("Bump ESLint 9.38.0", "TCE-1231 Bump ESLint 9.32.0") touch `package.json` and `workspaces/codacy/package.json` (eslint/plugin versions), `.circleci/config.yml` and `Dockerfile` (orb/base image, only when relevant), `package-lock.json`, and the regenerated `workspaces/docs-generator/docs/patterns.json`, `docs/description/*`, and `docs/multiple-tests/*/patterns.xml` together.

### 3. Step-by-step update procedure

1. **Bump the version(s)** directly in `package.json` and `workspaces/codacy/package.json` `dependencies` (and `.circleci/config.yml` orbs / `Dockerfile` base image, if in scope for the task).
2. **Install dependencies:** `npm install` at the repo root (installs all workspaces since they're declared under `workspaces` in the root `package.json`).
3. **Regenerate the docs.** Requires network access (the generator fetches rule docs from plugin GitHub repos):
   ```bash
   npm start -w docs-generator
   ```
   This rewrites `workspaces/docs-generator/docs/patterns.json`, `docs/description/description.json`, and `docs/description/*.md`. Review the diff for new/removed/renamed rules and update `docs/multiple-tests/*/patterns.xml` fixtures (and any Codacy-config fixtures) to match — recent bump commits show these files change together.
4. **Type-check** (there is no separate compile artifact checked in for the engine; it runs directly via `ts-node`/`tsx`, but both `start` scripts run `tsc --noEmit` first):
   ```bash
   npm run start -w codacy   # runs `tsc --noEmit && node ...`
   ```
5. **Build the Docker image** (same as CI): `docker build -t codacy-eslint9:latest .` — this itself also runs `npm start -w docs-generator` inside the image (see `Dockerfile`), so a successful build is a second confirmation the generator still works end-to-end.
6. **Run `codacy-plugins-test` locally** before pushing — clone https://github.com/codacy/codacy-plugins-test and run the **multiple** DockerTest command (this repo only ships `docs/multiple-tests`, not single-pattern `docs/tests`) against your local image tag.
7. **Iterate on failures**, re-running the DockerTest command after each fix.
8. **Commit** the dependency bump(s) together with the regenerated `workspaces/docs-generator/docs/` files (and any orb/base-image bumps) in one change.
9. **Push and open a PR.** CI (`.circleci/config.yml`) runs `codacy/checkout_and_version` → `publish_docker_local` (builds and saves the image) → `plugins_test` (`codacy_plugins_test/run`, multiple tests) → `codacy/publish_docker` (main only) → `codacy/tag_version` (main only).
10. **Poll the PR's real CI checks until they all pass — local validation is NOT the finish line.** After every push, run `gh pr checks <pr-url>` and keep re-polling (short sleep while any check is `pending`) until all checks finish. If a check fails, fetch its actual log (CircleCI API/UI for the failing job — don't guess), find the true root cause, fix it, push again (never `--no-verify`, never force-push), and re-poll. Repeat until every check is green. The CI environment's toolchain/network access can differ from your local one, so a clean local run does not guarantee CI passes — this is especially true here since `docs-generator` depends on live network calls to plugin GitHub repos, which can behave differently (rate limits, moved files) inside CI. Only stop iterating when every check passes, or you hit a genuine product/infra decision that needs a human — in which case explain it in the PR rather than guessing.

### 4. Common failure modes and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm start -w docs-generator` fails to fetch a plugin's rule docs | Plugin moved/renamed its docs path, changed tag prefix, or removed a rule's `.md` file | Adjust the matching entry in the `downloadDocs` array in `workspaces/docs-generator/src/index.ts` (`relativeUrl`, `versionPrefix`, or set `rejectOnError: false`) |
| A rule referenced in a `docs/multiple-tests/*/patterns.xml` fixture no longer exists after regenerating docs | Rule renamed or removed upstream in the bumped ESLint/plugin version | Update or remove the stale `<module name="...">` entries in the affected fixtures to match the new, verified-correct output |
| `codacy-plugins-test` "multiple" DockerTest fails on a fixture folder | Expected results stale for new rule behavior/defaults | Regenerate/update the expected results in `docs/multiple-tests/<fixture>/` to match the new (verified correct) output |
| `docsGenerator`'s dependency lookup silently uses stale versions | `workspaces/codacy/package.json` wasn't updated to match the root `package.json` bump | Bump both files together (see table in section 2) |

### 5. Definition of done

- Version bump(s) reflected in all files that encode them (`package.json`, `workspaces/codacy/package.json`, `package-lock.json`, and `.circleci/config.yml`/`Dockerfile` if in scope).
- `workspaces/docs-generator/docs/patterns.json`, `docs/description/*`, and `docs/multiple-tests/*/patterns.xml` regenerated/updated and committed, with fixture inconsistencies resolved.
- `npm install` and the `tsc --noEmit` type-check pass locally.
- Docker image builds successfully (`docker build .`).
- `codacy-plugins-test` "multiple" DockerTest passes locally against the freshly built image.
- **After pushing and opening/updating the PR, every CI check on it is green.** Poll `gh pr checks <pr-url>` and iterate on any failure (fetch the real CI log, fix, push, re-poll) until all pass — a passing local build is not sufficient, because the CI toolchain and network conditions can differ from your local one (see step 10).

## What is Codacy

[Codacy](https://www.codacy.com/) is an Automated Code Review Tool that monitors your technical debt, helps you improve your code quality, teaches best practices to your developers, and helps you save time in Code Reviews.

### Among Codacy’s features

-   Identify new Static Analysis issues
-   Commit and Pull Request Analysis with GitHub, BitBucket/Stash, GitLab (and also direct git repositories)
-   Auto-comments on Commits and Pull Requests
-   Integrations with Slack, HipChat, Jira, YouTrack
-   Track issues in Code Style, Security, Error Proneness, Performance, Unused Code and other categories

Codacy also helps keep track of Code Coverage, Code Duplication, and Code Complexity.

Codacy supports PHP, Python, Ruby, Java, JavaScript, and Scala, among others.

### Free for Open Source

Codacy is free for Open Source projects.
