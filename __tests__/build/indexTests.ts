import { readFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

const generatorDir = path.join(__dirname, "../../src/build");

const expectedFiles = [
  "build.ps1",
  "build.sh",
  "recipe.cake",
  "tools/packages.config",
];

const expectedContentFiles = [
  {
    expectedFile: "build.sh",
    name: "unix build script",
    testFile: "build.sh",
  },
  {
    expectedFile: "recipe.cake",
    name: "cake build script",
    testFile: "recipe.cake",
  },
  {
    expectedFile: "packages.config",
    name: "Package config",
    testFile: "tools/packages.config",
  },
];

function assertFileContent(filePath: string, expectedFile: string) {
  assert.equalsFileContent(
    filePath,
    readFileSync(path.join(__dirname, expectedFile), { encoding: "utf8" })
  );
}

describe("generator:travis", () => {
  describe("default", () => {
    beforeAll(() => {
      return helpers.run(generatorDir).withPrompts({
        projectName: "TestApp",
        repositoryOwner: "AdmiringWorm",
        scriptName: "recipe.cake",
        sourceDir: "./src",
        useTabs: false,
      });
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles);
    });

    for (const fileCheck of expectedContentFiles) {
      it(`creates ${fileCheck.name} file with expected content`, () => {
        assertFileContent(
          fileCheck.testFile,
          "default/" + fileCheck.expectedFile
        );
      });
    }

    it("windows bootstrapper sets cake build file to expected script name", () => {
      assert.fileContent("build.ps1", /\$Script\s*=\s*"recipe\.cake"/);
    });
  });

  describe("custom prompts", () => {
    beforeAll(() => {
      return helpers.run(generatorDir).withPrompts({
        projectName: "MyAddin",
        repositoryOwner: "gep13",
        scriptName: "setup.cake",
        sourceDir: "./source",
        useTabs: false,
      });
    });

    it("creates build files", () => {
      assert.file([
        "build.ps1",
        "build.sh",
        "setup.cake",
        "tools/packages.config",
      ]);
    });

    it("Unix bootstrapper should set cake script name", () => {
      assert.fileContent("build.sh", /SCRIPT="setup\.cake"/);
    });

    it("Windows bootstrapper should set cake script name", () => {
      assert.fileContent("build.ps1", /\$Script\s*=\s*"setup\.cake"/);
    });

    it("Cake script should set project name", () => {
      assert.fileContent("setup.cake", /title:\s*"Cake\.MyAddin"/);
      assert.fileContent("setup.cake", /repositoryName:\s*"Cake\.MyAddin"/);
    });

    it("Cake script should set repositoryOwner", () => {
      assert.fileContent("setup.cake", /repositoryOwner:\s*"gep13"/);
    });

    it("Cake script should set source directory", () => {
      assert.fileContent("setup.cake", /sourceDirectoryPath:\s*"\.\/source"/);
    });
  });

  describe("custom handling for cake-contrib", () => {
    beforeAll(() => {
      return helpers.run(generatorDir).withPrompts({
        projectName: "MyContribAddin",
        repositoryOwner: "cake-contrib",
        scriptName: "recipe.cake",
        sourceDir: "./src",
        useTabs: false,
      });
    });

    it("creates build files", () => {
      assert.file([
        "build.ps1",
        "build.sh",
        "recipe.cake",
        "tools/packages.config",
      ]);
    });

    it("Cake script should set source directory", () => {
      assert.fileContent("recipe.cake", /appVeyorAccountName:\s*"cakecontrib"/);
    });
  });

  describe("indentation", () => {
    describe("tabs", () => {
      beforeAll(() => {
        return helpers.run(generatorDir).withPrompts({
          projectName: "TestApp",
          repositoryOwner: "AdmiringWorm",
          scriptName: "recipe.cake",
          sourceDir: "./src",
          useTabs: true,
        });
      });

      it("creates default project structure files", () => {
        assert.file(expectedFiles);
      });

      for (const fileCheck of expectedContentFiles) {
        it(`creates ${fileCheck.name} file with tabs instead of spaces`, () => {
          assertFileContent(
            fileCheck.testFile,
            "tabs/" + fileCheck.expectedFile
          );
        });
      }
    });
  });
});
