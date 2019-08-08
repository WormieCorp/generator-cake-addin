import { readFileSync } from "fs";
import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";

const generatorDir = join(__dirname, "../../src/config");

describe("generator:config", () => {
  describe("default", () => {
    beforeAll(() =>
      run(generatorDir).withOptions({
        enableAllContributors: true,
        projectName: "TestApp",
        repositoryOwner: "AdmiringWorm",
        useTabs: false,
        useYamlTabs: false,
      })
    );

    it("creates editorconfig file", () => {
      assert.file(".editorconfig");
    });

    it("creates editorconfig with expected content", () => {
      assert.equalsFileContent(
        ".editorconfig",
        readFileSync(join(__dirname, "expected/.editorconfig"), {
          encoding: "utf8",
        })
      );
    });

    it("creates gitattributes file", () => {
      assert.file(".gitattributes");
    });

    it("creates gitattributes with expected content", () => {
      assert.equalsFileContent(
        ".gitattributes",
        readFileSync(join(__dirname, "expected/.gitattributes"), {
          encoding: "utf8",
        })
      );
    });

    it("creates gitignore file", () => {
      assert.file(".gitignore");
    });

    it("creates gitignore with expected content", () => {
      assert.equalsFileContent(
        ".gitignore",
        readFileSync(join(__dirname, "expected/.gitignore"), {
          encoding: "utf8",
        })
      );
    });

    it("creates GitReleaseManager file", () => {
      assert.file("GitReleaseManager.yaml");
    });

    it("creates GitReleaseManager with expected content", () => {
      assert.equalsFileContent(
        "GitReleaseManager.yaml",
        readFileSync(join(__dirname, "expected/GitReleaseManager.yaml"), {
          encoding: "utf8",
        })
      );
    });

    it("creates all-contributorsrc file", () => {
      assert.file(".all-contributorsrc");
    });

    it("creates all-contributorsrc with expected content", () => {
      assert.equalsFileContent(
        ".all-contributorsrc",
        readFileSync(join(__dirname, "expected/.all-contributorsrc"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("disable all-contributors", () => {
    beforeAll(() =>
      run(generatorDir).withPrompts({
        enableAllContributors: false,
        projectName: "TestApp",
        useTabs: false,
        useYamlTabs: false,
      })
    );

    it("should not create all contributors configuratior file", () => {
      assert.noFile(".all-contributorsrc");
    });
  });

  describe("indentation", () => {
    describe("tabs", () => {
      beforeAll(() =>
        run(generatorDir).withPrompts({
          enableAllContributors: true,
          projectName: "TestApp",
          repositoryOwner: "AdmiringWorm",
          useTabs: true,
          useYamlTabs: true,
        })
      );

      it("creates all-contributorsrc file", () => {
        assert.file(".all-contributorsrc");
      });

      it("creates all-contributorsrc with expected content", () => {
        assert.equalsFileContent(
          ".all-contributorsrc",
          readFileSync(join(__dirname, "expected/tabs/.all-contributorsrc"), {
            encoding: "utf8",
          })
        );
      });

      it("creates GitReleaseManager.yaml using tabs instead of spaces", () => {
        const buffer = readFileSync("GitReleaseManager.yaml", {
          encoding: "utf-8",
        });
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(/^($|\t*[^\s])/);
        });
      });
    });
  });
});
