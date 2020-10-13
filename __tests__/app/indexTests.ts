import { sync } from "command-exists";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

jest.setTimeout(5 * 60 * 1000);

const generatorDir = path.join(__dirname, "../../src/app");
const expectedFiles = [
  ".all-contributorsrc",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  "build.ps1",
  "build.sh",
  "CODE_OF_CONDUCT.md",
  "GitReleaseManager.yaml",
  "LICENSE.txt",
  "README.md",
  "recipe.cake",
  "src/Cake.MyTestApp.sln",
  "src/Cake.MyTestApp/Cake.MyTestApp.csproj",
  "src/Cake.MyTestApp/MyTestAppAliases.cs",
  "src/Cake.MyTestApp/MyTestAppSettings.cs",
  "src/Cake.MyTestApp/MyTestAppRunner.cs",
  "src/Cake.MyTestApp.Tests/Cake.MyTestApp.Tests.csproj",
  "src/Cake.MyTestApp.Tests/MyTestAppAliasesFixture.cs",
  "src/Cake.MyTestApp.Tests/MyTestAppAliasesTests.cs",
  "src/Cake.MyTestApp.Tests/MyTestAppRunnerFixture.cs",
  "src/Cake.MyTestApp.Tests/MyTestAppRunnerTests.cs",
  ".config/dotnet-tools.json",
];

const skipDotnet = !sync("dotnet");

describe("generator:app", () => {
  describe("default", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            enableAllContributors: true,
            projectName: "MyTestApp",
          })
        )
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet })
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles.map((v) => path.join(workDir, v)));
    });

    it("does not create contributing file when not enabled", () => {
      assert.noFile(path.join(workDir, "CONTRIBUTING.md"));
    });

    it("does not create appveyor build file", () => {
      assert.noFile(path.join(workDir, ".appveyor.yml"));
    });

    it("does not create travis build file", () => {
      assert.noFile(path.join(workDir, ".travis.yml"));
    });
  });

  describe("enable-contributing", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            enableContributing: true,
          })
        )
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet })
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates contributing file when enabled", () => {
      assert.file(path.join(workDir, "CONTRIBUTING.md"));
    });
  });

  describe("disable-allcontributors", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            enableAllContributors: false,
          })
        )
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet })
        .inTmpDir((dir) => (workDir = dir));
    });

    it("should not create all contributors file when disabled", () => {
      assert.noFile(path.join(workDir, ".all-contributorsrc"));
    });
  });
});
