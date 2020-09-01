# Cake Addin generator changelog

# [1.5.0](https://github.com/WormieCorp/generator-cake-addin/compare/v1.4.0...v1.5.0) (2020-09-01)


### Dependencies

* bump yeoman-generator from 4.11.0 to 4.12.0 ([#454](https://github.com/WormieCorp/generator-cake-addin/issues//454)) ([62e0873](https://github.com/WormieCorp/generator-cake-addin/commit/62e0873))


### Documentation

* add codeql badge to readme ([5f08fdb](https://github.com/WormieCorp/generator-cake-addin/commit/5f08fdb))


### Features

* **code of conduct generator:** update code of contributing to latest version (2.0) ([9ebd384](https://github.com/WormieCorp/generator-cake-addin/commit/9ebd384))
* **readme generator:** update generator to be compliant with latest standard-readme specs ([ed39dd9](https://github.com/WormieCorp/generator-cake-addin/commit/ed39dd9))

# [1.4.0](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.7...v1.4.0) (2020-07-26)


### Bug fixes

* fix indent size being prompted when user selects to use tabs ([9b88bf8](https://github.com/WormieCorp/generator-cake-addin/commit/9b88bf8))
* **project generator:** fix generator exiting early when running dotnet build/restore ([4d11805](https://github.com/WormieCorp/generator-cake-addin/commit/4d11805))
* **project generator:** fix generator outputting template with parameters on same line ([a04a1fd](https://github.com/WormieCorp/generator-cake-addin/commit/a04a1fd))
* **project generator:** fix test project not generated with documentation comments disabled ([be4119f](https://github.com/WormieCorp/generator-cake-addin/commit/be4119f))


### Features

* **build scripts generator:** update cake.recipe version in generated build script ([0cd6811](https://github.com/WormieCorp/generator-cake-addin/commit/0cd6811))
* **build scripts generator:** update generated powershell bootstrapper to latest edition ([e171db8](https://github.com/WormieCorp/generator-cake-addin/commit/e171db8))
* **project generator:** add ability to include license header for source files ([e5d199f](https://github.com/WormieCorp/generator-cake-addin/commit/e5d199f)), closes [#26](https://github.com/WormieCorp/generator-cake-addin/issues/26)
* **project generator:** add ability to specifically decide whether to use license headers or not ([7b0e80f](https://github.com/WormieCorp/generator-cake-addin/commit/7b0e80f)), closes [#26](https://github.com/WormieCorp/generator-cake-addin/issues/26)
* **project generator:** add basic stylecop configuration json file ([b6208f6](https://github.com/WormieCorp/generator-cake-addin/commit/b6208f6))
* **project generator:** update package dependencies on all generated project files ([6280538](https://github.com/WormieCorp/generator-cake-addin/commit/6280538))


### Reverts

* "feat(project): add ability to specifically decide whether to use license headers or not" ([12aef7f](https://github.com/WormieCorp/generator-cake-addin/commit/12aef7f))

## [1.3.7](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.6...v1.3.7) (2020-07-22)


### Bug fixes

* **app:** correct duplicate prompting when running app generator ([1973392](https://github.com/WormieCorp/generator-cake-addin/commit/1973392)), closes [#410](https://github.com/WormieCorp/generator-cake-addin/issues/410)


### Dependencies

* [security] bump npm from 6.13.4 to 6.14.7 ([#412](https://github.com/WormieCorp/generator-cake-addin/issues//412)) ([ed25431](https://github.com/WormieCorp/generator-cake-addin/commit/ed25431))
* bump npm-registry-fetch from 4.0.2 to 4.0.5 ([#402](https://github.com/WormieCorp/generator-cake-addin/issues//402)) ([7d6e30a](https://github.com/WormieCorp/generator-cake-addin/commit/7d6e30a))
* bump through2 from 3.0.2 to 4.0.2 ([a148c1f](https://github.com/WormieCorp/generator-cake-addin/commit/a148c1f))


### Documentation

* remove build badge for appveyor ([7bd5a2a](https://github.com/WormieCorp/generator-cake-addin/commit/7bd5a2a))
* remove known issue section ([459eaa1](https://github.com/WormieCorp/generator-cake-addin/commit/459eaa1))

## [1.3.6](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.5...v1.3.6) (2020-06-27)


### Dependencies

* bump yeoman-generator from 4.10.1 to 4.11.0 ([248ae3b](https://github.com/WormieCorp/generator-cake-addin/commit/248ae3b))

## [1.3.5](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.4...v1.3.5) (2020-06-24)


### Dependencies

* bump through2 from 3.0.1 to 3.0.2 ([84d9b30](https://github.com/WormieCorp/generator-cake-addin/commit/84d9b30))
* bump uuid from 8.1.0 to 8.2.0 ([9ccf166](https://github.com/WormieCorp/generator-cake-addin/commit/9ccf166))

## [1.3.4](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.3...v1.3.4) (2020-06-23)


### Dependencies

* bump chalk from 4.0.0 to 4.1.0 ([da82b6d](https://github.com/WormieCorp/generator-cake-addin/commit/da82b6d))

## [1.3.3](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.2...v1.3.3) (2020-05-29)


### Bug fixes

* correct call to new uuid library ([26d256c](https://github.com/WormieCorp/generator-cake-addin/commit/26d256c))


### Dependencies

* [security] bump handlebars from 4.5.3 to 4.7.6 ([b918301](https://github.com/WormieCorp/generator-cake-addin/commit/b918301))
* bump chalk from 3.0.0 to 4.0.0 ([12f4aa6](https://github.com/WormieCorp/generator-cake-addin/commit/12f4aa6))
* bump uuid from 7.0.2 to 7.0.3 ([196caa3](https://github.com/WormieCorp/generator-cake-addin/commit/196caa3))
* bump uuid from 7.0.3 to 8.1.0 ([5b25621](https://github.com/WormieCorp/generator-cake-addin/commit/5b25621))
* bump yeoman-generator from 4.7.2 to 4.8.0 ([c521e81](https://github.com/WormieCorp/generator-cake-addin/commit/c521e81))
* bump yeoman-generator from 4.8.0 to 4.10.1 ([ed33518](https://github.com/WormieCorp/generator-cake-addin/commit/ed33518))

## [1.3.2](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.1...v1.3.2) (2020-03-30)


### Bug fixes

* **project generator:** correct generation of mixed indentation of test project ([b9b9e9a](https://github.com/WormieCorp/generator-cake-addin/commit/b9b9e9a))


### Dependencies

* [security] bump acorn from 5.7.3 to 5.7.4 ([063ef59](https://github.com/WormieCorp/generator-cake-addin/commit/063ef59))
* bump fullname from 4.0.0 to 4.0.1 ([bb68a98](https://github.com/WormieCorp/generator-cake-addin/commit/bb68a98))
* bump uuid from 3.4.0 to 7.0.2 ([2a850c1](https://github.com/WormieCorp/generator-cake-addin/commit/2a850c1))
* bump yeoman-generator from 4.5.0 to 4.7.2 ([#282](https://github.com/WormieCorp/generator-cake-addin/issues//282)) ([6db10fc](https://github.com/WormieCorp/generator-cake-addin/commit/6db10fc))

## [1.3.1](https://github.com/WormieCorp/generator-cake-addin/compare/v1.3.0...v1.3.1) (2020-01-28)


### Dependencies

* bump uuid from 3.3.3 to 3.4.0 ([4583dc8](https://github.com/WormieCorp/generator-cake-addin/commit/4583dc8))
* bump yeoman-generator from 4.4.0 to 4.5.0 ([a6d288b](https://github.com/WormieCorp/generator-cake-addin/commit/a6d288b))

# [1.3.0](https://github.com/WormieCorp/generator-cake-addin/compare/v1.2.0...v1.3.0) (2019-12-25)


### Dependencies

* bump yeoman-generator from 4.3.0 to 4.4.0 ([0b592a3](https://github.com/WormieCorp/generator-cake-addin/commit/0b592a3))


### Features

* **configuration generator:** use user specified indent size in editorconfig ([ed51c8e](https://github.com/WormieCorp/generator-cake-addin/commit/ed51c8e)), closes [#105](https://github.com/WormieCorp/generator-cake-addin/issues/105)


### Improvements

* add project icons ([e0e8745](https://github.com/WormieCorp/generator-cake-addin/commit/e0e8745))

# [1.2.0](https://github.com/WormieCorp/generator-cake-addin/compare/v1.1.3...v1.2.0) (2019-12-18)


### Bug fixes

* change export = to export default ([87dc363](https://github.com/WormieCorp/generator-cake-addin/commit/87dc363))
* **app:** update import for the chalk module ([2a2a4e4](https://github.com/WormieCorp/generator-cake-addin/commit/2a2a4e4))


### Dependencies

* [security] bump https-proxy-agent from 2.2.2 to 2.2.4 ([3321f16](https://github.com/WormieCorp/generator-cake-addin/commit/3321f16))
* [security] bump npm from 6.11.2 to 6.13.4 ([e0156c2](https://github.com/WormieCorp/generator-cake-addin/commit/e0156c2))
* add gulp-if as a dependency for conditionally running streams ([9257497](https://github.com/WormieCorp/generator-cake-addin/commit/9257497))
* add through2 as new dependency ([e445151](https://github.com/WormieCorp/generator-cake-addin/commit/e445151))
* bump chalk from 2.4.2 to 3.0.0 ([256012b](https://github.com/WormieCorp/generator-cake-addin/commit/256012b))
* bump uuid from 3.3.2 to 3.3.3 ([10c8bad](https://github.com/WormieCorp/generator-cake-addin/commit/10c8bad))
* bump yeoman-generator from 4.0.1 to 4.1.0 ([#137](https://github.com/WormieCorp/generator-cake-addin/issues//137)) ([7c9b44d](https://github.com/WormieCorp/generator-cake-addin/commit/7c9b44d))
* bump yeoman-generator from 4.1.0 to 4.2.0 ([#164](https://github.com/WormieCorp/generator-cake-addin/issues//164)) ([b990b3b](https://github.com/WormieCorp/generator-cake-addin/commit/b990b3b))
* bump yeoman-generator from 4.2.0 to 4.3.0 ([963a877](https://github.com/WormieCorp/generator-cake-addin/commit/963a877))


### Documentation

* correct link to generator folder ([b2d6550](https://github.com/WormieCorp/generator-cake-addin/commit/b2d6550))
* create support file documentation ([e0d96cf](https://github.com/WormieCorp/generator-cake-addin/commit/e0d96cf))
* **release-notes:** remove invalid entries in changelog ([0d9cf8e](https://github.com/WormieCorp/generator-cake-addin/commit/0d9cf8e))


### Features

* add ability for users to select wether to use tabs or spaces as default ([9388e26](https://github.com/WormieCorp/generator-cake-addin/commit/9388e26)), closes [#51](https://github.com/WormieCorp/generator-cake-addin/issues/51)
* add indent style stream to allow changing between tabs and spaces ([904116a](https://github.com/WormieCorp/generator-cake-addin/commit/904116a)), closes [#51](https://github.com/WormieCorp/generator-cake-addin/issues/51) [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **appveyor generator:** add ability for user to select space indent size ([7e80a70](https://github.com/WormieCorp/generator-cake-addin/commit/7e80a70)), closes [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **appveyor generator:** add prompt for supporting selection between using tabs or spaces in .appveyor.yml ([3ea2f0c](https://github.com/WormieCorp/generator-cake-addin/commit/3ea2f0c)), closes [#51](https://github.com/WormieCorp/generator-cake-addin/issues/51)
* **build scripts generator:** add ability to select indent size during generation ([c2b6a8e](https://github.com/WormieCorp/generator-cake-addin/commit/c2b6a8e)), closes [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **configuration generator:** add ability to select indent size during generation ([57b6827](https://github.com/WormieCorp/generator-cake-addin/commit/57b6827)), closes [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **configuration generator:** add support for selecting between tabs or spaces in GitReleaseManager.yaml ([e1d01e5](https://github.com/WormieCorp/generator-cake-addin/commit/e1d01e5)), closes [#51](https://github.com/WormieCorp/generator-cake-addin/issues/51)
* **configuration generator:** update editorconfig to set user specified indent style ([48b83a4](https://github.com/WormieCorp/generator-cake-addin/commit/48b83a4)), closes [#104](https://github.com/WormieCorp/generator-cake-addin/issues/104)
* **configuration generator:** update editorconfig to set user specified indent style  fix [#104](https://github.com/WormieCorp/generator-cake-addin/issues//104) ([d56356b](https://github.com/WormieCorp/generator-cake-addin/commit/d56356b))
* **project generator:** add ability for user to select space indent size ([d3ce7aa](https://github.com/WormieCorp/generator-cake-addin/commit/d3ce7aa)), closes [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **travis generator:** add ability for user to select space indent size ([460baa5](https://github.com/WormieCorp/generator-cake-addin/commit/460baa5)), closes [#50](https://github.com/WormieCorp/generator-cake-addin/issues/50)
* **travis generator:** add prompt for supporting selection between using tabs or spaces in travis.yml ([b925533](https://github.com/WormieCorp/generator-cake-addin/commit/b925533)), closes [#51](https://github.com/WormieCorp/generator-cake-addin/issues/51)
* **travis generator:** add prompt for supporting selection between using tabs or spaces in travis.yml  re [#51](https://github.com/WormieCorp/generator-cake-addin/issues//51) ([c8dad1b](https://github.com/WormieCorp/generator-cake-addin/commit/c8dad1b))


### Reverts

* "feat(appveyor): add prompt for supporting selection between using tabs or spaces in .appveyor.yml" ([484cfe2](https://github.com/WormieCorp/generator-cake-addin/commit/484cfe2))
* "feat(config): add support for selecting between tabs or spaces in GitReleaseManager.yaml" ([a0480d9](https://github.com/WormieCorp/generator-cake-addin/commit/a0480d9))
* "feat(travis): add prompt for supporting selection between using tabs or spaces in travis.yml  re [#51](https://github.com/WormieCorp/generator-cake-addin/issues//51)" ([ea7ccaf](https://github.com/WormieCorp/generator-cake-addin/commit/ea7ccaf))
* "feat(travis): add prompt for supporting selection between using tabs or spaces in travis.yml" ([9f6c8d4](https://github.com/WormieCorp/generator-cake-addin/commit/9f6c8d4))
* "refactor: add new available prompt for asking wether to use tabs or spaces for yaml files" ([96b72e0](https://github.com/WormieCorp/generator-cake-addin/commit/96b72e0))
* "refactor(appveyor): correct duplicate calls for prompt asking wether to use tabs or not in yaml file" ([a014b15](https://github.com/WormieCorp/generator-cake-addin/commit/a014b15))
* "test(travis): add unit tests for using tabs instead of spaces in travis.yml" ([9b9e250](https://github.com/WormieCorp/generator-cake-addin/commit/9b9e250))
* **configuration generator:** revert ability to set tabs in indentation for yaml files in editorconfig ([7d6be4d](https://github.com/WormieCorp/generator-cake-addin/commit/7d6be4d))

## [1.1.3](https://github.com/WormieCorp/generator-cake-addin/compare/v1.1.2...v1.1.3) (2019-07-12)

### Bug fixes

- **configuration generator:** update GitReleaseManager template to use the correct 'footer-includes-milestone' key ([151f2d9](https://github.com/WormieCorp/generator-cake-addin/commit/151f2d9)), closes [#86](https://github.com/WormieCorp/generator-cake-addin/issues/86)

### Dependencies

- bump lodash.template from 4.4.0 to 4.5.0 ([#84](https://github.com/WormieCorp/generator-cake-addin/issues//84)) ([d6baf50](https://github.com/WormieCorp/generator-cake-addin/commit/d6baf50))
- bump username from 5.0.0 to 5.1.0 ([#58](https://github.com/WormieCorp/generator-cake-addin/issues//58)) ([ee48a0c](https://github.com/WormieCorp/generator-cake-addin/commit/ee48a0c))

### Documentation

- add liberapay donation badge ([e4834dc](https://github.com/WormieCorp/generator-cake-addin/commit/e4834dc))
- **release-notes:** change configuration to not output scope when 'deps' is the scope ([afc8474](https://github.com/WormieCorp/generator-cake-addin/commit/afc8474))

### Bug fixes

- change short description prompt to not allow empty values ([7535908](https://github.com/WormieCorp/generator-cake-addin/commit/7535908)), closes [#48](https://github.com/WormieCorp/generator-cake-addin/issues/48)
- **build scripts generator:** fix denotion for loading nuget package in recipe.cake template ([02fe69a](https://github.com/WormieCorp/generator-cake-addin/commit/02fe69a)), closes [#42](https://github.com/WormieCorp/generator-cake-addin/issues/42)
- **build scripts generator:** fix method name used to set variable names in recipe.cake tepmlate ([25788f4](https://github.com/WormieCorp/generator-cake-addin/commit/25788f4)), closes [#43](https://github.com/WormieCorp/generator-cake-addin/issues/43)
- **project generator:** change attribute used on unit tests generation ([85dede4](https://github.com/WormieCorp/generator-cake-addin/commit/85dede4)), closes [#52](https://github.com/WormieCorp/generator-cake-addin/issues/52)
- **project generator:** fix selection of unit test library not working before enter is pressed ([1431103](https://github.com/WormieCorp/generator-cake-addin/commit/1431103)), closes [#41](https://github.com/WormieCorp/generator-cake-addin/issues/41)

### Documentation

- add a known issue section in readme with information of hang issue ([f93fcb7](https://github.com/WormieCorp/generator-cake-addin/commit/f93fcb7))
- add gep13 as a contributor ([#40](https://github.com/WormieCorp/generator-cake-addin/issues//40)) ([aba8a20](https://github.com/WormieCorp/generator-cake-addin/commit/aba8a20))
- add project name as title for CHANGELOG.md ([43ae9a9](https://github.com/WormieCorp/generator-cake-addin/commit/43ae9a9))
- change the prompt message asking for the name of the author ([2e834e0](https://github.com/WormieCorp/generator-cake-addin/commit/2e834e0)), closes [#47](https://github.com/WormieCorp/generator-cake-addin/issues/47)
- update gep13 contribution types ([#45](https://github.com/WormieCorp/generator-cake-addin/issues//45)) ([27d9df2](https://github.com/WormieCorp/generator-cake-addin/commit/27d9df2))

## [1.1.1](https://github.com/WormieCorp/generator-cake-addin/compare/v1.1.0...v1.1.1) (2019-06-07)

### Bug Fixes

- **config:** renamed templates to not use . prefix ([f1e0074](https://github.com/WormieCorp/generator-cake-addin/commit/f1e0074))

# [1.1.0](https://github.com/WormieCorp/generator-cake-addin/compare/v1.0.3...v1.1.0) (2019-06-04)

### Bug Fixes

- changed short description to be a common prompt ([4dcd6ff](https://github.com/WormieCorp/generator-cake-addin/commit/4dcd6ff)), closes [#29](https://github.com/WormieCorp/generator-cake-addin/issues/29)
- **conduct:** implemented prompt for email address ([210f935](https://github.com/WormieCorp/generator-cake-addin/commit/210f935)), closes [#34](https://github.com/WormieCorp/generator-cake-addin/issues/34)
- **config:** fixed inconsistent indentation configured in editorconfig template ([3a5f80e](https://github.com/WormieCorp/generator-cake-addin/commit/3a5f80e)), closes [#35](https://github.com/WormieCorp/generator-cake-addin/issues/35)
- **project:** fixed the generated class name for runner tests ([e7fab17](https://github.com/WormieCorp/generator-cake-addin/commit/e7fab17)), closes [#36](https://github.com/WormieCorp/generator-cake-addin/issues/36)

### Features

- **license:** implemented abitily to select existing license name when creating new license ([7d11bb7](https://github.com/WormieCorp/generator-cake-addin/commit/7d11bb7)), closes [#31](https://github.com/WormieCorp/generator-cake-addin/issues/31)
- **project:** implemented ability to change unit testing library ([e77de86](https://github.com/WormieCorp/generator-cake-addin/commit/e77de86)), closes [#30](https://github.com/WormieCorp/generator-cake-addin/issues/30)
- **readme:** implemented ability to select license name from existing license file names ([48360e1](https://github.com/WormieCorp/generator-cake-addin/commit/48360e1)), closes [#32](https://github.com/WormieCorp/generator-cake-addin/issues/32)

## [1.0.3](https://github.com/WormieCorp/generator-cake-addin/compare/v1.0.2...v1.0.3) (2019-06-03)

### Bug Fixes

- **release:** addded building of project during deployment ([16109f1](https://github.com/WormieCorp/generator-cake-addin/commit/16109f1)), closes [#33](https://github.com/WormieCorp/generator-cake-addin/issues/33)

## [1.0.2](https://github.com/WormieCorp/generator-cake-addin/compare/v1.0.1...v1.0.2) (2019-06-03)

### Bug Fixes

- changed short description to be a common prompt ([074b48c](https://github.com/WormieCorp/generator-cake-addin/commit/074b48c)), closes [#29](https://github.com/WormieCorp/generator-cake-addin/issues/29)

## [1.0.1](https://github.com/WormieCorp/generator-cake-addin/compare/v1.0.0...v1.0.1) (2019-06-03)

### Bug Fixes

- testing a fix on a new branch ([8d9a107](https://github.com/WormieCorp/generator-cake-addin/commit/8d9a107))
- **config:** fixed naming of created gitreleasemanager config file ([3ab583b](https://github.com/WormieCorp/generator-cake-addin/commit/3ab583b)), closes [#28](https://github.com/WormieCorp/generator-cake-addin/issues/28)
- **readme:** removed unneccesary logging of prompt ([2c3a808](https://github.com/WormieCorp/generator-cake-addin/commit/2c3a808)), closes [#27](https://github.com/WormieCorp/generator-cake-addin/issues/27)

# 1.0.0 (2019-06-02)

### Features

- initial public release ([37c8a38](https://github.com/WormieCorp/generator-cake-addin/commit/37c8a38))
