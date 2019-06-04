# Contributing to generator-cake-addin

First and foremost, thank you! We appreciate that you want to contribute to generator-cake-addin,
your time is valuable, and your contributions mean a lot to us.

## Table of Contents

- [Important](#important)
- [Getting started](#getting-started)
- [Issues](#issues)
  - [Before creating an issue](#before-creating-an-issue)
  - [Creating an issue](#creating-an-issue)
  - [Closing issues](#closing-issues)
- [Pull Requests](#pull-requests)
  - [Commit Message Format](#commit-message-format)
  - [Revert](#revert)
  - [Type](#type)
  - [Scope](#scope)
  - [Subject](#subject)
  - [Body](#body)
  - [Footer](#footer)
- [Next steps](#next-steps)

## Important

By contributing to this project, you:

- Agree that you have authored 100% of the content
- Agree that you have the necessary rights to the content
- Agree that you have received the necessary permissions from your employer to make the contributions (if applicable)
- Agree that the content you contribute may be provided under the Project license(s)
- Agree that, if you did not author 100% of the content,
  the appropriate licenses and copyrights have been added along with any other necessary attribution.

## Getting started

**What does "contributing" mean?**  
Creating an issue is the simplest form of contributing to a project.
But there are many ways to contribute, including the following:

- Updating or correcting documentation
- Feature requests
- Bug reports

If you'd like to learn more about contributing in general, the [Guide to Idiomatic Contributing][idiomatic-contributing] has a lot of useful information.

**Showing support for generator-cake-addin**  
Please keep in mind that open source software is built by people like you,
who spend their free time creating things the rest of the community can use.

Don't have time to contribute? No worries, here are some other ways to show your support for generator-cake-addin:

- star the [project][]
- tweet your support for generator-cake-addin
- answer questions on [StackOverflow][]

## Issues

Please only create issues for bug reports or feature requests.
Issues discussing any other topics may be closed by the project's maintainers without further explanation.

Do not create issues about bumping dependencies unless a bug has been identified
and you can demonstrate that it effects this library.

**Help us to help you**  
Remember that we’re here to help, but not to make guesses about what you need help with:

- Whatever bug or issue you're experiencing, assume that it will not be as obvious to the maintainers as it is to you.
- Spell it out completely. Keep in mind that maintainers need to think about _all potential use cases_ of a library.
  It's important that you explain how you're using a library so that maintainers can make that connection
  and solve the issue.

_It can't be understated how frustrating and draining it can be to maintainers to have to ask
clarifying questions on the most basic things,
before it's even possible to start debugging.
Please try to make the best use of everyone's time involved, including yourself,
by providing this information up front._

### Before creating an issue

Please try to determine if the issue is caused by an underlying library, and if so, create the issue there.
Sometimes this is difficult to know. We only ask that you attempt to give a reasonable attempt to find out.
Oftentimes the readme will have advice about where to go to create issues.

Try to follow these guidelines:

- **Avoid creating issues for implementation help** - It's much better for discoverability, SEO, and semantics -
  to keep the issue tracker focused on bugs and feature requests -
  to ask implementation-related questions on [stackoverflow.com][stackoverflow]
- **Investigate the issue** - Search for existing issues (open or closed) that address the issue, and might have even resolved it already.
- **Check the readme** - oftentimes you will find notes about creating issues,
  and where to go depending on the type of issue.
- Create the issue in the appropriate repository.

### Creating an issue

Please be as descriptive as possible when creating an issue.
Give us the information we need to successfully answer your question or address your issue
by answering the following in your issue:

- **description**: (required) What is the bug you're experiencing? How are you using this library?
- **OS**: (required) What operating system are you on?
- **version**: (required) please note the version of generator-cake-addin you are using
- **nodejs version**: (required) please note the version of nodejs you are running your build script with
- **error messages**: (required) please paste any error messages into the issue,
  or a [gist][] (you may also link to a failing build)
- **extensions, etc**: (if applicable) please list any other extensions you're using that may affect the generator-cake-addin addin

### Closing issues

The original poster or the maintainers of generator-cake-addin may close an issue at any time.
Typically, but not exclusively, issues are closed when:

- The issue is resolved, and will be released in the next version of generator-cake-addin
- The project's maintainers have determined the issue is out of scope
- An issue is clearly a duplicate of another issue, in which case the duplicate issue will be linked.
- A discussion has clearly run its course

## Pull Requests

Please submit an [issue](#issue) and get a buyoff from one of the maintainers before starting to work
on a Pull Request. You may also look at any of the issues already submitted, and comment on the one you
would like to create a pull request for.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.
The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK_LINE>
<body>
<BLANK_LINE>
<footer>
```

The **header** is mandatary and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters!
This allows the message to be easier to read on GitHub as well
as in various git tools.

The footer should contain a [closing reference to an issue][closing-ref] if any.

Samples:

```text
docs(changelog): update changelog to beta.5
```

```text
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish,
and users need the latest of these.
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, AppVeyor)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the name of the generator affected (as perceived by the person reading the changelog generated from commit messages).

The following is a list of supported scopes that do not match a generator name:

- **licensing**: Any change that is related to licensing or copyright requires this scope.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

A detailed explanation can be found in the [AngularJS Git Commit Message Convention document][angular-message-convention] _(NOTE: There may be some differences in their convention and what have been detailed here)_

## Next steps

**Tips for creating idiomatic issues**  
Spending just a little extra time to review best practices and brush up on your contributing skills will, at minimum,
make your issue easier to read, easier to resolve,
and more likely to be found by others who have the same or similar issue in the future.
At best, it will open up doors and potential career opportunities by helping you be at your best.

The following resources were hand-picked to help you be the most effective contributor you can be:

- The [Guide to Idiomatic Contributing][idiomatic-contributing] is a great place for newcomers to start,
  but there is also information for experienced contributors there.
- Take some time to learn basic markdown. We can't stress this enough.
  Don't start pasting code into GitHub issues before you've taken a moment to review this [markdown cheatsheet][md-cheatsheet]
- The GitHub guide to [basic markdown][basic-md] is another great markdown resource.
- Learn about [GitHub Flavored Markdown][gh-flavored-md].
  And if you want to really go above and beyond,
  read [mastering markdown][mastering-md].

At the very least, please try to:

- Use backticks to wrap code.
  This ensures that it retains its formatting and isn't modified when it's rendered by GitHub,
  and makes the code more readable to others
- When applicable, use syntax highlighting by adding the correct language name after the "code fence"

[angular-message-convention]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w
[basic-md]: https://help.github.com/articles/markdown-basics/
[closing-ref]: https://help.github.com/articles/closing-issues-via-commit-messages/
[gh-flavored-md]: https://help.github.com/articles/github-flavored-markdown/
[gist]: https://gist.github.com/
[idiomatic-contributing]: https://github.com/jonschlinkert/idiomatic-contributing
[mastering-md]: https://guides.github.com/features/mastering-markdown/
[md-cheatsheet]: https://gist.github.com/jonschlinkert/5854601
[project]: https://github.com/WormieCorp/generator-cake-addin
[stackoverflow]: https://stackoverflow.com/questions
