# Contributing to move.base

First off, thank you for considering contributing to move.base! It's people like you that make move.base such a great project.


## Why the hack would I read this?

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open-source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.


## How can I contribute?

You can contribute to move.base in many different ways. From writing tutorials or blog posts, extending the documentation, writing user stories, and bug reports or writing code to enhance the project itself.


# Ground Rules

First, and foremost be welcoming to newcomers and encourage diverse new contributors from all backgrounds. See the [move.base Community Code of Conduct](https://github.com/dot-base/.github/blob/master/CODE_OF_CONDUCT.md).


## Issues, Branches, and PR Management

Please create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.

### Labels

On all of our repositories, we use labels inspired by [Dave Lunny's article on "Sane Github Labels"](https://medium.com/@dave_lunny/sane-github-labels-c5d2e6004b63). These are organized into three categories and prefixed accordingly: status, type, and priority. Here is a list of [all available labels](https://github.com/dot-base/fhir-server/labels).


## Branches

To indicate that you are working on a specific feature create a branch using the following naming convention: ```[TYPE]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]```. Branches are always written in [kebab case](https://medium.com/better-programming/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841).

Examples: 
- for features: ```feature/#123-contributing-guideline-overhaul```
- for bugs: ```bug/#418-broken-coffeepot```


## Protected Branches & Pull Requests 

Both, the master and the dev branch are protected on all of our repositories. This means that you cannot directly push to these branches. Therefore every change to these branches in move.base repositories is applied through pull requests.

**TL;DR** Every change to move.base repositories is done through pull requests.


## Commit Messages

Better commit messages lead to easier version control, which leads to a better project, which leads to happier developers which lead to better commit messages. You get the picture. Here are some guidelines how to [write good commit messages](https://www.freecodecamp.org/news/a-beginners-guide-to-git-how-to-write-a-good-commit-message/).


# Automation and useful defaults

We always aim to improve our development process and workflows. To ease the first steps of new contributors and unify frequent processes we use automation and default settings as a feature. Meaning that wherever possible processes are automated and useful defaults are set for all contributors.

Three good examples are the protected branch settings described above, the move.base build pipeline and linting automation.

If you have suggestions on new automations, feel free to open an issue and discuss them with the community!


## Build pipeline

In most of the move.base repositories you'll find a ```.github/workflows/docker-publish.yml``` file which defines the docker image build process for a repository. These files are in place to save the time of contributors and unify the build process.


## Linting

If not otherwise indicated by the repositories readme file, all repositories have automatic code linting enabled. Where applicable we used [Prettier](https://prettier.io/) or one of its plugins for that.

TL;DR Don't worry about code formatting, we got you ;).


# How to report a bug

## Security Vulnerabilities
If you find a security vulnerability, do NOT open an issue. Email movebase@charite.de instead. We will come back to you about that :).

## Other Bug Reports

For all other bug reports please open a new issue in the corresponding repository and select `Bug` (Look for the Fire Icon ;). This will set you up with a nice template, waiting to be filled with your bug report.

If you don't know which repository to create the bug report in, just create it in the [main move.base repository](https://github.com/dot-base/dot-base) and leave the sorting to us.


# Code review process

To automatically enforce code quality we use the **four eyes principle**. Meaning, every piece of code in the move.base project is reviewed by at least one other contributor.

Since we use pull requests to maintain the project, a pull request has to have at least one approving review to be merged into the move.base codebase.
