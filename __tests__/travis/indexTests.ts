import * as fs from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = path.join(__dirname, "../../src/travis");

describe("generator:travis", () => {
  describe("default", () => {
    beforeEach(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((tmpDir) => {
          fs.writeFileSync(
            path.join(tmpDir, "package.json"),
            '{"name": "Cake.Foo", "files":[]}'
          );
        });
    });

    it("creates travis build file", () => {
      assert.file([".travis.yml"]);
    });

    it("fills travis.yml file with expected content", () => {
      assert.equalsFileContent(
        ".travis.yml",
        `language: csharp
dist: xenial
os:
  - linux
  - osx
mono: latest
dotnet: 2.1.603

cache:
  directories:
    - tools

env:
  global:
    - DOTNET_CLI_TELEMETRY_OPTOUT: 1
    - DOTNET_SKIP_FIRST_TIME_EXPERIENCE: true

git:
  depth: false

branches:
  only:
    - master
    - develop
    - /release\\/.*/
    - /hotfix\\/.*/

script:
  - ./build.sh
`
      );
    });
  });

  describe("custom indent", () => {
    beforeEach(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig({ indentYamlSize: 4 }))
        .inTmpDir((tmpDir) => {
          fs.writeFileSync(
            path.join(tmpDir, "package.json"),
            '{"name": "Cake.Foo", "files":[]}'
          );
        });
    });

    it("creates travis build file", () => {
      assert.file([".travis.yml"]);
    });

    it("fills travis.yml file with expected content", () => {
      assert.equalsFileContent(
        ".travis.yml",
        `language: csharp
dist: xenial
os:
    - linux
    - osx
mono: latest
dotnet: 2.1.603

cache:
    directories:
        - tools

env:
    global:
        - DOTNET_CLI_TELEMETRY_OPTOUT: 1
        - DOTNET_SKIP_FIRST_TIME_EXPERIENCE: true

git:
    depth: false

branches:
    only:
        - master
        - develop
        - /release\\/.*/
        - /hotfix\\/.*/

script:
    - ./build.sh
`
      );
    });
  });
});
