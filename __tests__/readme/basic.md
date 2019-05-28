# Cake.TestApp

[![standard-readme compliant][]][standard-readme]
[![Appveyor build][appveyorimage]][appveyor]
[![Codecov Report][codecovimage]][codecov]
[![NuGet package][nugetimage]][nuget]

> The most awesome test cake addin library.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

```cs
#addin nuget:?package=Cake.TestApp
```

## Usage

```cs
#addin nuget:?package=Cake.TestApp

Task("MyTask").Does(() => {
  TestApp();
});
```

## Contributing

Cake.TestApp follows the [Contributor Covenant][contrib-covenant] Code of Conduct.

We accept Pull Requests.

Small note: If editing the Readme, please conform to the [standard-readme][] specification.

## License

[MIT License © Kim Nordmo][license]

[appveyor]: https://ci.appveyor.com/project/admiringworm/cake-testapp
[appveyorimage]: https://img.shields.io/appveyor/ci/admiringworm/cake-testapp.svg?logo=appveyor&style=flat-square
[codecov]: https://codecov.io/gh/AdmiringWorm/Cake.TestApp
[codecovimage]: https://img.shields.io/codecov/c/github/AdmiringWorm/Cake.TestApp.svg?logo=codecov&style=flat-square
[contrib-covenant]: https://www.contributor-covenant.org/version/1/4/code-of-conduct
[nuget]: https://nuget.org/packages/Cake.TestApp
[nugetimage]: https://img.shields.io/nuget/v/Cake.TestApp.svg?logo=nuget&style=flat-square
[license]: LICENSE.txt
[standard-readme]: https://github.com/RichardLitt/standard-readme
[standard-readme compliant]: https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square
