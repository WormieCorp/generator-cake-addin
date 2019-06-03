import { sync } from "command-exists";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

const generatorDir = path.join(__dirname, "../../src/app");
const expectedFiles = [
  ".all-contributorsrc",
  ".appveyor.yml",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  ".travis.yml",
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
  "tools/packages.config",
];

const skipDotnet = !sync("dotnet");

describe("generator:app", () => {
  describe("default", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "My Awesome Test Description",
          enableAllContributors: true,
          enableLinux: true,
          enableTravis: true,
          enableWyam: true,
          licenseType: "MIT",
          projectName: "MyTestApp",
          repositoryOwner: "AdmiringWorm",
          scriptName: "recipe.cake",
          sourceDir: "./src",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles);
    });

    it("does not create contributing file when not enabled", () => {
      assert.noFile("CONTRIBUTING.md");
    });
  });

  describe("disable-travis", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "My Awesome Test Description",
          enableLinux: true,
          enableTravis: false,
          enableWyam: true,
          licenseType: "MIT",
          projectName: "MyTestApp",
          repositoryOwner: "AdmiringWorm",
          scriptName: "recipe.cake",
          sourceDir: "./src",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("does not create travis file when disabled", () => {
      assert.noFile(".travis.yml");
    });
  });

  describe("enable-contributing", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "My Awesome Test Description",
          enableContributing: true,
          enableLinux: true,
          enableTravis: false,
          enableWyam: true,
          licenseType: "MIT",
          projectName: "MyTestApp",
          repositoryOwner: "AdmiringWorm",
          scriptName: "recipe.cake",
          sourceDir: "./src",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("creates contributing file when enabled", () => {
      assert.file("CONTRIBUTING.md");
    });
  });

  describe("disable-allcontributors", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "My Awesome Test Description",
          enableAllContributors: false,
          enableContributing: false,
          enableLinux: true,
          enableTravis: false,
          enableWyam: true,
          licenseType: "MIT",
          projectName: "MyTestApp",
          repositoryOwner: "AdmiringWorm",
          scriptName: "recipe.cake",
          sourceDir: "./src",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("should not create all contributors file when disabled", () => {
      assert.noFile(".all-contributorsrc");
    });
  });
});
