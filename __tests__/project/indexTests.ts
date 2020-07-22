import { sync } from "command-exists";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

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
    let workDir = "";
    return helpers
      .run(generatorDir)
      .withOptions(
        getPromptConfig({
          "skip-dotnet": true,
        })
      )
      .inTmpDir((tmpDir) => {
        mkdirSync(path.join(tmpDir, "src"));
        writeFileSync(path.join(tmpDir, "src/Cake.TestApp.sln"), "");
        workDir = tmpDir;
      })
      .then(() => {
        assert.equalsFileContent(
          path.join(workDir, "src", "Cake.TestApp.sln"),
          ""
        );
      });
  });

  it("should set up url to wyam documentation when enabled", () => {
    let workDir = "";
    return helpers
      .run(generatorDir)
      .withPrompts(getPromptConfig())
      .withOptions({ "skip-dotnet": true })
      .inTmpDir((dir) => (workDir = dir))
      .then(() =>
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp/Cake.TestApp.csproj"),
          "<PackageProjectUrl>https://admiringworm.github.io/Cake.TestApp</PackageProjectUrl>"
        )
      );
  });

  describe("default", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            description: "Cake addin generation test",
            enableWyam: false,
          })
        )
        .withOptions({
          "skip-dotnet": true,
          "start-year": 2018,
        })
        .inTmpDir((dir) => (workDir = dir));
    });

    it("should create expected files", () => {
      assert.file(
        [
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
        ].map((v) => path.join(workDir, v))
      );
    });

    it("should create main project file with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "Cake.TestApp.csproj"),
        "default/project/project.csproj"
      );
    });

    it("should create Aliases class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
        "default/aliases.cs"
      );
    });

    it("should create Runner class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
        "default/runner.cs"
      );
    });

    it("should create Settings class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
        "default/settings.cs"
      );
    });

    it("should create Aliases fixture class with expected content", () => {
      assertContent(
        path.join(
          workDir,
          "src",
          "Cake.TestApp.Tests",
          "TestAppAliasesFixture.cs"
        ),
        "default/testAliasesFixture.cs"
      );
    });

    it("should create Runner fixture class with expected content", () => {
      assertContent(
        path.join(
          workDir,
          "src",
          "Cake.TestApp.Tests",
          "TestAppRunnerFixture.cs"
        ),
        "default/testRunnerFixture.cs"
      );
    });

    describe("xunit", () => {
      let workDir2 = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(getPromptConfig())
          .withOptions({
            "skip-dotnet": true,
          })
          .inTmpDir((dir) => (workDir2 = dir));
      });

      it("should create expected files", () => {
        assert.file(
          [
            "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
            "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
            "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
          ].map((v) => path.join(workDir2, v))
        );
      });

      it("should create test project file with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          "default/xunit/testProject/testProject.csproj"
        );
      });

      it("should create aliases test class with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          "default/xunit/testAliasesTests.cs"
        );
      });

      it("should create runner test class with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          "default/xunit/testRunnerTests.cs"
        );
      });
    });
  });

  describe("custom-source-directory", () => {
    it("should allow changing source directory through prompts", () => {
      let workDir = "";
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig({ sourceDir: "./source" }))
        .withOptions({ "skip-dotnet": true })
        .inTmpDir((dir) => (workDir = dir))
        .then(() =>
          assert.file(path.join(workDir, "source", "Cake.TestApp.sln"))
        );
    });

    it("should allow changing source directory through options", () => {
      let workDir = "";
      return helpers
        .run(generatorDir)
        .withOptions(
          getPromptConfig({
            "skip-dotnet": true,
            sourceDir: "./source",
          })
        )
        .inTmpDir((dir) => (workDir = dir))
        .then(() =>
          assert.file(path.join(workDir, "source", "Cake.TestApp.sln"))
        );
    });
  });

  if (!skipDotnet) {
    describe("dotnet build", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withOptions(
            getPromptConfig({
              build: true,
            })
          )
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should run dotnet build when --build is specified", () => {
        assert.file(
          [
            "src/Cake.TestApp/bin/Debug/netstandard2.0/Cake.TestApp.dll",
            "src/Cake.TestApp/bin/Debug/net461/Cake.TestApp.dll",
            "src/Cake.TestApp.Tests/bin/Debug/netcoreapp2.1/Cake.TestApp.Tests.dll",
          ].map((v) => path.join(workDir, v))
        );
      });
    });
  }

  describe("indentation", () => {
    describe("tabs", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              useTabs: true,
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2019,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      const tabRegex = /^($|\t*[^\s])/;

      it("should create solution file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp.sln"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create project file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp/Cake.TestApp.csproj"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create aliases file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create Runner file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create settings file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test project file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test aliases fixture file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesFixture.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test aliases file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test Runner fixture file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerFixture.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test runner file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });
    });

    describe("space", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              indentSize: 2,
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should indent Aliases class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
          "space/aliases.cs"
        );
      });

      it("should indent Project file with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "Cake.TestApp.csproj"),
          "space/project.csproj"
        );
      });

      it("should indent Runner class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
          "space/runner.cs"
        );
      });

      it("should indent Settings class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          "space/settings.cs"
        );
      });

      it("should indent Aliases Fixture class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesFixture.cs"
          ),
          "space/testAliasesFixture.cs"
        );
      });

      it("should indent Aliases Tests class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          "space/testAliasesTests.cs"
        );
      });

      it("should indent Test Project file with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          "space/testProject.csproj"
        );
      });

      it("should indent Runner Fixture class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerFixture.cs"
          ),
          "space/testRunnerFixture.cs"
        );
      });

      it("should indent Runner Tests class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          "space/testRunnerTests.cs"
        );
      });
    });
  });
});
