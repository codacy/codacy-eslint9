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
