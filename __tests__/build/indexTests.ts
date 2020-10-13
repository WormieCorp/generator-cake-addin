import { readFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = path.join(__dirname, "../../src/build");

const expectedFiles = [
  "build.ps1",
  "build.sh",
  "recipe.cake",
  ".config/dotnet-tools.json",
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
    expectedFile: "dotnet-tools.json",
    name: ".NET Core Tool Manifest",
    testFile: ".config/dotnet-tools.json",
  },
];

function assertFileContent(filePath: string, expectedFile: string) {
  assert.equalsFileContent(
    filePath,
    readFileSync(path.join(__dirname, expectedFile), { encoding: "utf8" })
  );
}

describe("generator:build", () => {
  describe("default", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates default project structure files", () => {
      assert.file(expectedFiles.map((v) => path.join(workDir, v)));
    });

    for (const fileCheck of expectedContentFiles) {
      it(`creates ${fileCheck.name} file with expected content`, () => {
        assertFileContent(
          path.join(workDir, fileCheck.testFile),
          "default/" + fileCheck.expectedFile
        );
      });
    }

    it("windows bootstrapper sets cake build file to expected script name", () => {
      assert.fileContent(
        path.join(workDir, "build.ps1"),
        /\$Script\s*=\s*"recipe\.cake"/
      );
    });
  });

  describe("custom prompts", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            projectName: "MyAddin",
            repositoryOwner: "gep13",
            scriptName: "setup.cake",
            sourceDir: "./source",
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates build files", () => {
      assert.file(
        [
          "build.ps1",
          "build.sh",
          "setup.cake",
          ".config/dotnet-tools.json",
        ].map((v) => path.join(workDir, v))
      );
    });

    it("Unix bootstrapper should set cake script name", () => {
      assert.fileContent(
        path.join(workDir, "build.sh"),
        /SCRIPT="setup\.cake"/
      );
    });

    it("Windows bootstrapper should set cake script name", () => {
      assert.fileContent(
        path.join(workDir, "build.ps1"),
        /\$Script\s*=\s*"setup\.cake"/
      );
    });

    it("Cake script should set project name", () => {
      assert.fileContent(
        path.join(workDir, "setup.cake"),
        /title:\s*"Cake\.MyAddin"/
      );
      assert.fileContent(
        path.join(workDir, "setup.cake"),
        /repositoryName:\s*"Cake\.MyAddin"/
      );
    });

    it("Cake script should set repositoryOwner", () => {
      assert.fileContent(
        path.join(workDir, "setup.cake"),
        /repositoryOwner:\s*"gep13"/
      );
    });

    it("Cake script should set source directory", () => {
      assert.fileContent(
        path.join(workDir, "setup.cake"),
        /sourceDirectoryPath:\s*"\.\/source"/
      );
    });
  });

  describe("custom handling for cake-contrib", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            projectName: "MyContribAddin",
            repositoryOwner: "cake-contrib",
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates build files", () => {
      assert.file(expectedFiles.map((v) => path.join(workDir, v)));
    });

    it("Cake script should set source directory", () => {
      assert.fileContent(
        path.join(workDir, "recipe.cake"),
        /appVeyorAccountName:\s*"cakecontrib"/
      );
    });
  });

  describe("indentation", () => {
    let workDir = "";
    describe("space", () => {
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              indentSize: 2,
            })
          )
          .inTmpDir((dir) => (workDir = dir));
      });

      it("creates default project structure files", () => {
        assert.file(expectedFiles.map((v) => path.join(workDir, v)));
      });

      for (const fileCheck of expectedContentFiles) {
        it(`creates ${fileCheck.name} file with expected content`, () => {
          assertFileContent(
            path.join(workDir, fileCheck.testFile),
            "space/" + fileCheck.expectedFile
          );
        });
      }
    });

    describe("tabs", () => {
      let workDir2 = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              useTabs: true,
            })
          )
          .inTmpDir((dir) => (workDir2 = dir));
      });

      it("creates default project structure files", () => {
        assert.file(expectedFiles.map((v) => path.join(workDir2, v)));
      });

      for (const fileCheck of expectedContentFiles) {
        it(`creates ${fileCheck.name} file with tabs instead of spaces`, () => {
          assertFileContent(
            path.join(workDir2, fileCheck.testFile),
            "tabs/" + fileCheck.expectedFile
          );
        });
      }
    });
  });
});
