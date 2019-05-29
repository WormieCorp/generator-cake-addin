# <%= fullProjectName %>

[![standard-readme compliant][]][standard-readme]
[![Appveyor build][appveyorimage]][appveyor]
<% if (enableTravis) { %>[![Travis build][travisimage]][travis]
<% } -%>
[![Codecov Report][codecovimage]][codecov]
[![NuGet package][nugetimage]][nuget]
<% if(description.length > 120) { -%>

> <%= shortDescription %>

<%= description -%>

<% } else { -%>

> <%= description -%>

<% } -%>

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainer](#maintainer)
- [Contributing](#contributing)
- [License](#license)

## Install

```cs
#addin nuget:?package=<%= fullProjectName %>
```

## Usage

```cs
#addin nuget:?package=<%= fullProjectName %>

Task("MyTask").Does(() => {
  <%= projectName %>();
});
```

## Maintainer

[<%= author %> @<%= projectMaintainer %>][maintainer]

## Contributing

<%= fullProjectName %> follows the [Contributor Covenant][contrib-covenant] Code of Conduct.

We accept Pull Requests.
<% if(enableContributing) { -%>
Please see [the contributing file][contributing] for how to contribute to <%= fullProjectName %>.
<% } -%>

Small note: If editing the Readme, please conform to the [standard-readme][] specification.

## License

[<%= licenseType.Name %> © <%= author %>][license]

[appveyor]: https://ci.appveyor.com/project/<%= appveyorAccount %>/<%= appveyorProjectName %>
[appveyorimage]: https://img.shields.io/appveyor/ci/<%= appveyorAccount %>/<%= appveyorProjectName %>.svg?logo=appveyor&style=flat-square
[codecov]: https://codecov.io/gh/<%= repositoryOwner %>/<%= fullProjectName %>
[codecovimage]: https://img.shields.io/codecov/c/github/<%= repositoryOwner %>/<%= fullProjectName %>.svg?logo=codecov&style=flat-square
[contrib-covenant]: https://www.contributor-covenant.org/version/1/4/code-of-conduct
<% if(enableContributing) { -%>
[contributing]: CONTRIBUTING.md
<% } -%>
[maintainer]: https://github.com/<%= projectMaintainer %>
[nuget]: https://nuget.org/packages/<%= fullProjectName %>
[nugetimage]: https://img.shields.io/nuget/v/<%= fullProjectName %>.svg?logo=nuget&style=flat-square
[license]: LICENSE.txt
[standard-readme]: https://github.com/RichardLitt/standard-readme
[standard-readme compliant]: https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square
<% if(enableTravis) { -%>
[travis]: https://travis-ci.org/<%= repositoryOwner %>/<%= fullProjectName %>
[travisimage]: https://img.shields.io/travis/<%= repositoryOwner %>/<%= fullProjectName %>.svg?logo=travis&style=flat-square
<% } -%>