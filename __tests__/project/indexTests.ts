import { sync } from "command-exists";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

jest.setTimeout(5 * 60 * 1000);

const generatorDir = path.join(__dirname, "../../src/project");

const skipDotnet = !sync("dotnet");

function getTestFile(testPath: string) {
  return path.join(__dirname, testPath);
}

function assertContent(testPath: string, contentPath: string) {
  assert.equalsFileContent(
    testPath,
    readFileSync(getTestFile(contentPath), { encoding: "utf8" })
  );
}

describe("generator:project", () => {
  it("should not overwrite solution file if one exist", () => {
    return helpers
      .run(generatorDir)
      .withOptions({
        projectName: "TestApp",
        "skip-dotnet": true,
        sourceDir: "./src",
      })
      .inTmpDir((tmpDir) => {
        mkdirSync(path.join(tmpDir, "src"));
        writeFileSync(path.join(tmpDir, "src/Cake.TestApp.sln"), "");
      })
      .then(() => {
        assert.equalsFileContent("src/Cake.TestApp.sln", "");
      });
  });

  it("should set up url to wyam documentation when enabled", () => {
    return helpers
      .run(generatorDir)
      .withPrompts({
        enableWyam: true,
        projectName: "TestApp",
        repositoryOwner: "AdmiringWorm",
        sourceDir: "./src",
      })
      .withOptions({ "skip-dotnet": true })
      .then(() =>
        assert.fileContent(
          "src/Cake.TestApp/Cake.TestApp.csproj",
          "<PackageProjectUrl>https://admiringworm.github.io/Cake.TestApp</PackageProjectUrl>"
        )
      );
  });

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
        .withOptions({
          "skip-dotnet": true,
          "start-year": 2018,
        });
    });

    it("should create expected files", () => {
      assert.file([
        "src/Cake.TestApp.sln",
        "src/Cake.TestApp/Cake.TestApp.csproj",
        "src/Cake.TestApp/TestAppAliases.cs",
        "src/Cake.TestApp/TestAppRunner.cs",
        "src/Cake.TestApp/TestAppSettings.cs",
        "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
        "src/Cake.TestApp.Tests/TestAppAliasesFixture.cs",
        "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
        "src/Cake.TestApp.Tests/TestAppRunnerFixture.cs",
        "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
      ]);
    });

    it("should create main project file with expected content", () => {
      assertContent(
        "src/Cake.TestApp/Cake.TestApp.csproj",
        "default/project/project.csproj"
      );
    });

    it("should create Aliases class with expected content", () => {
      assertContent("src/Cake.TestApp/TestAppAliases.cs", "default/aliases.cs");
    });

    it("should create Runner class with expected content", () => {
      assertContent("src/Cake.TestApp/TestAppRunner.cs", "default/runner.cs");
    });

    it("should create Settings class with expected content", () => {
      assertContent(
        "src/Cake.TestApp/TestAppSettings.cs",
        "default/settings.cs"
      );
    });

    it("should create Aliases fixture class with expected content", () => {
      assertContent(
        "src/Cake.TestApp.Tests/TestAppAliasesFixture.cs",
        "default/testAliasesFixture.cs"
      );
    });

    it("should create Runner fixture class with expected content", () => {
      assertContent(
        "src/Cake.TestApp.Tests/TestAppRunnerFixture.cs",
        "default/testRunnerFixture.cs"
      );
    });

    describe("xunit", () => {
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts({
            projectName: "TestApp",
            sourceDir: "./src",
            unitTestLibrary: "xunit",
          })
          .withOptions({
            "skip-dotnet": true,
          });
      });

      it("should create expected files", () => {
        assert.file([
          "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
          "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
          "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
        ]);
      });

      it("should create test project file with expected content", () => {
        assertContent(
          "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
          "default/xunit/testProject/testProject.csproj"
        );
      });

      it("should create aliases test class with expected content", () => {
        assertContent(
          "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
          "default/xunit/testAliasesTests.cs"
        );
      });

      it("should create runner test class with expected content", () => {
        assertContent(
          "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
          "default/xunit/testRunnerTests.cs"
        );
      });
    });
  });

  describe("custom-source-directory", () => {
    it("should allow changing source directory through prompts", () => {
      return helpers
        .run(generatorDir)
        .withPrompts({ projectName: "TestApp", sourceDir: "./source" })
        .withOptions({ "skip-dotnet": true })
        .then(() => assert.file("source/Cake.TestApp.sln"));
    });

    it("should allow changing source directory through options", () => {
      return helpers
        .run(generatorDir)
        .withOptions({
          projectName: "TestApp",
          "skip-dotnet": true,
          sourceDir: "./source",
        })
        .then(() => assert.file("source/Cake.TestApp.sln"));
    });
  });

  if (!skipDotnet) {
    describe("dotnet restore", () => {
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts({ projectName: "TestApp", sourceDir: "./src" });
      });
      it("should run dotnet restore by default", () => {
        assert.file([
          "src/Cake.TestApp/obj/Cake.TestApp.csproj.nuget.cache",
          "src/Cake.TestApp.Tests/obj/Cake.TestApp.Tests.csproj.nuget.cache",
        ]);
      });
    });

    describe("dotnet build", () => {
      beforeAll(() => {
        return helpers.run(generatorDir).withOptions({
          build: true,
          projectName: "TestApp",
          sourceDir: "./src",
          unitTestLibrary: "xunit",
        });
      });

      it("should run dotnet build when --build is specified", () => {
        assert.file([
          "src/Cake.TestApp/bin/Debug/netstandard2.0/Cake.TestApp.dll",
          "src/Cake.TestApp/bin/Debug/net461/Cake.TestApp.dll",
          "src/Cake.TestApp.Tests/bin/Debug/netcoreapp2.0/Cake.TestApp.Tests.dll",
        ]);
      });
    });
  }
});
