import { sync } from "command-exists";
import { readFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

jest.setTimeout(5 * 60 * 1000);

const generatorDir = path.join(__dirname, "../../src/project");
const expectedFiles = [
  "src/Cake.TestApp.sln",
  "src/Cake.TestApp/Cake.TestApp.csproj",
  "src/Cake.TestApp/TestAppAliases.cs",
  "src/Cake.TestApp/TestAppSettings.cs",
  "src/Cake.TestApp/TestAppRunner.cs",
  "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
  "src/Cake.TestApp.Tests/TestAppAliasesFixture.cs",
  "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
  "src/Cake.TestApp.Tests/TestAppRunnerFixture.cs",
  "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
];

const skipDotnet = !sync("dotnet");

const expectedContentFiles = [
  {
    expectedFile: "project.csproj",
    name: "project",
    testFile: "Cake.TestApp/Cake.TestApp.csproj",
  },
  {
    expectedFile: "aliases.cs",
    name: "alias class",
    testFile: "Cake.TestApp/TestAppAliases.cs",
  },
  {
    expectedFile: "runner.cs",
    name: "runner class",
    testFile: "Cake.TestApp/TestAppRunner.cs",
  },
  {
    expectedFile: "settings.cs",
    name: "settings class",
    testFile: "Cake.TestApp/TestAppSettings.cs",
  },
  {
    expectedFile: "testProject.csproj",
    name: "test project",
    testFile: "Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
  },
  {
    expectedFile: "testAliasesFixture.cs",
    name: "test alias fixture class",
    testFile: "Cake.TestApp.Tests/TestAppAliasesFixture.cs",
  },
];

function assertFileContent(filePath: string, expectedFile: string) {
  assert.equalsFileContent(
    filePath,
    readFileSync(path.join(__dirname, expectedFile), { encoding: "utf8" })
  );
}

describe("generator:project", () => {
  describe("default", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "Cake addin generation test",
          enableWyam: false,
          licenseType: "MIT",
          projectName: "TestApp",
          repositoryOwner: "AdmiringWorm",
          sourceDir: "./src",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles);
    });

    for (const fileCheck of expectedContentFiles) {
      it(`creates ${fileCheck.name} file with expected content`, () => {
        assertFileContent(
          "src/" + fileCheck.testFile,
          "default/" + fileCheck.expectedFile
        );
      });
    }
  });

  describe("wyam enabled", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "Cake addin generation test",
          enableWyam: true,
          licenseType: "MIT",
          projectName: "TestApp",
          repositoryOwner: "AdmiringWorm",
          sourceDir: "./source",
        })
        .withOptions({ "start-year": "2018", "skip-dotnet": skipDotnet });
    });

    it("creates default project structure files", () => {
      assert.file(
        expectedFiles.map((value) => value.replace("src/", "source/"))
      );
    });

    it(`creates main project file with expected wyam repository url`, () => {
      assertFileContent(
        "source/Cake.TestApp/Cake.TestApp.csproj",
        "wyamEnabled/project.csproj"
      );
    });
  });

  describe("without year", () => {
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts({
          author: "Kim Nordmo",
          description: "Cake addin generation test",
          enableWyam: true,
          licenseType: "MIT",
          projectName: "TestApp",
          repositoryOwner: "AdmiringWorm",
          sourceDir: "./src",
        })
        .withOptions({ "skip-dotnet": skipDotnet });
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles);
    });

    it(`creates main project file with year to current year`, () => {
      const expected =
        "<StartYear>" + new Date().getFullYear() + "</StartYear>";
      assert.fileContent("src/Cake.TestApp/Cake.TestApp.csproj", expected);
    });
  });
});
