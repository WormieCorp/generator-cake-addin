import * as fs from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = path.join(__dirname, "../../src/travis");

describe("generator:travis", () => {
  describe("default", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((tmpDir) => {
          workDir = tmpDir;
          fs.writeFileSync(
            path.join(tmpDir, "package.json"),
            '{"name": "Cake.Foo", "files":[]}'
          );
        });
    });

    it("creates travis build file", () => {
      assert.file(path.join(workDir, ".travis.yml"));
    });

    it("fills travis.yml file with expected content", () => {
      assert.equalsFileContent(
        path.join(workDir, ".travis.yml"),
        `language: csharp
dist: xenial
os:
  - linux
  - osx
mono: latest
dotnet: 3.1.402

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
  - ./build.sh --target=CI
`
      );
    });
  });

  describe("custom indent", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig({ indentYamlSize: 4 }))
        .inTmpDir((tmpDir) => {
          workDir = tmpDir;
          fs.writeFileSync(
            path.join(tmpDir, "package.json"),
            '{"name": "Cake.Foo", "files":[]}'
          );
        });
    });

    it("creates travis build file", () => {
      assert.file(path.join(workDir, ".travis.yml"));
    });

    it("fills travis.yml file with expected content", () => {
      assert.equalsFileContent(
        path.join(workDir, ".travis.yml"),
        `language: csharp
dist: xenial
os:
    - linux
    - osx
mono: latest
dotnet: 3.1.402

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
    - ./build.sh --target=CI
`
      );
    });
  });
});
