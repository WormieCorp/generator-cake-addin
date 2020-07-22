import * as fs from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const baseDir = path.join(__dirname, "../../src/appveyor");

describe("generator:appveyor", () => {
  describe("defaults", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates appveyor build file", () => {
      assert.file([path.join(workDir, ".appveyor.yml")]);
    });

    it("creates file with default content", () => {
      assert.equalsFileContent(
        path.join(workDir, ".appveyor.yml"),
        fs.readFileSync(path.join(__dirname, "default.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("custom space", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts(
          getPromptConfig({
            indentYamlSize: 4,
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates appveyor build file", () => {
      assert.file([path.join(workDir, ".appveyor.yml")]);
    });

    it("creates file with space indent set to 4", () => {
      assert.equalsFileContent(
        path.join(workDir, ".appveyor.yml"),
        fs.readFileSync(path.join(__dirname, "custom_space.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("custom-cake", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts(
          getPromptConfig({
            scriptName: "build.cake",
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates appveyor build file", () => {
      assert.file([path.join(workDir, ".appveyor.yml")]);
    });

    it("creates file with with custom cache", () => {
      assert.equalsFileContent(
        path.join(workDir, ".appveyor.yml"),
        fs.readFileSync(path.join(__dirname, "custom_cake.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux", () => {
    let workDir = "";
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts(
          getPromptConfig({
            enableLinux: true,
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates appveyor build file", () => {
      assert.file([path.join(workDir, ".appveyor.yml")]);
    });

    it("creates file with linux enabled", () => {
      assert.equalsFileContent(
        path.join(workDir, ".appveyor.yml"),
        fs.readFileSync(path.join(__dirname, "linux_enabled.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux-and-custom-cake", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(baseDir)
        .withPrompts(
          getPromptConfig({
            enableLinux: true,
            scriptName: "build.cake",
          })
        )
        .inTmpDir((dir) => (workDir = dir));
    });

    it("creates appveyor build file", () => {
      assert.file([path.join(workDir, ".appveyor.yml")]);
    });

    it("creates file with linux enabled and custom cake cache", () => {
      assert.equalsFileContent(
        path.join(workDir, ".appveyor.yml"),
        fs.readFileSync(path.join(__dirname, "linux_enabled_cake_custom.yml"), {
          encoding: "utf8",
        })
      );
    });
  });
});
