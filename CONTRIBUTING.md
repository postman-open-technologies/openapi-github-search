# Contributing

When contributing to this repository, please first discuss the change you wish to make at [Issues](https://github.com/postmanlabs/collection-format-mindmap/issues).

We have a [code of conduct](https://www.postman.com/code-of-conduct) that you're expected to follow in all your interactions with the project.

## Development process

### Prerequisites

Prerequisites here

### Workflow

We follow [Git Flow](https://guides.github.com/introduction/flow/) for changes to this repository. If you're not familiar with using git and GitHub on the command line, [GitHub Desktop](https://desktop.github.com) is an easier alternative.

1. Fork this repo to create a copy hosted on your GitHub account. The Fork button is in the top right of the page.
    * If you're a collaborator on the repo you can instead create a branch.
1. Clone down your copy of this repo onto your local machine: `git clone <YOUR GITHUB REPO URL>`
1. Navigate to the new directory git created: `cd collection-format-mindmap`
1. Check out the `develop` branch: `git checkout develop`
1. Run `npm install` to add all dependencies.
1. Create a new branch for your work based on develop: `git checkout -b <YOUR BRANCH NAME>` Your branch name should be something descriptive of the changes you wish to make, and can include the issue number this change is associated with. Example: `feature/1234-collection-format-mindmap-update`

1. Open a Pull Request to the `collection-format-mindmap` repo:
    * Navigate to the [postman-docs](https://github.com/postmanlabs/collection-format-mindmap) repo
    * Select `New pull request`
    * Select `Compare across forks`
    * Select `base repository: postmanlabs/collection-format-mindmap`
    * Select `base branch: develop`
    * Select `head repository: <YOUR FORKED REPOSITORY>`
    * Select `head branch: <YOUR BRANCH NAME>`
    * Select `Create pull request`

Your pull request will be reviewed and we'll get back to you!

## Pull Request Process

Upon approval your PR will be merged into develop for further verification and then merged into production upon final approval. Please delete your branch once it's been merged to develop to help keep a clean repository.

> __Repo Collaborators__: Please only push to `develop` when changes are ready to publish. The `develop` branch is intended only as a last check to see edits live on the web in a production type build environment before publishing—changes shouldn't sit on the `develop` branch for long before pushing to `master`.


## Running checks locally

Before creating a PR we STRONGLY recommend to running the following test locally to check that all changes will pass our linters:

* `npm run test`  -> runs the Unit testing
* `npm run test:lint` -> runs the ESlinter
* `npm run test:url` -> checks if acceptable image URL has been added
* `npm run test:update` -> updates the test snapshots
* `npm run dev` -> runs a server on http://localhost:8000/ so you can view changes locally
