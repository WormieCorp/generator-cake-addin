import { readFileSync } from "fs";
import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = join(__dirname, "../../src/config");

describe("generator:config", () => {
  describe("default", () => {
    let workDir = "";
    beforeAll(() =>
      run(generatorDir)
        .withOptions(
          getPromptConfig({
            enableAllContributors: true,
          })
        )
        .inTmpDir((dir) => (workDir = dir))
    );

    it("creates editorconfig file", () => {
      assert.file(join(workDir, ".editorconfig"));
    });

    it("creates editorconfig with expected content", () => {
      assert.equalsFileContent(
        join(workDir, ".editorconfig"),
        readFileSync(join(__dirname, "expected/.editorconfig"), {
          encoding: "utf8",
        })
      );
    });

    it("creates gitattributes file", () => {
      assert.file(join(workDir, ".gitattributes"));
    });

    it("creates gitattributes with expected content", () => {
      assert.equalsFileContent(
        join(workDir, ".gitattributes"),
        readFileSync(join(__dirname, "expected/.gitattributes"), {
          encoding: "utf8",
        })
      );
    });

    it("creates gitignore file", () => {
      assert.file(join(workDir, ".gitignore"));
    });

    it("creates gitignore with expected content", () => {
      assert.equalsFileContent(
        join(workDir, ".gitignore"),
        readFileSync(join(__dirname, "expected/.gitignore"), {
          encoding: "utf8",
        })
      );
    });

    it("creates GitReleaseManager file", () => {
      assert.file(join(workDir, "GitReleaseManager.yaml"));
    });

    it("creates GitReleaseManager with expected content", () => {
      assert.equalsFileContent(
        join(workDir, "GitReleaseManager.yaml"),
        readFileSync(join(__dirname, "expected/GitReleaseManager.yaml"), {
          encoding: "utf8",
        })
      );
    });

    it("creates all-contributorsrc file", () => {
      assert.file(join(workDir, ".all-contributorsrc"));
    });

    it("creates all-contributorsrc with expected content", () => {
      assert.equalsFileContent(
        join(workDir, ".all-contributorsrc"),
        readFileSync(join(__dirname, "expected/.all-contributorsrc"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("disable all-contributors", () => {
    let workDir = "";
    beforeAll(() =>
      run(generatorDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((dir) => (workDir = dir))
    );

    it("should not create all contributors configuratior file", () => {
      assert.noFile(join(workDir, ".all-contributorsrc"));
    });
  });

  describe("indentation", () => {
    describe("tabs", () => {
      let workDir = "";
      beforeAll(() =>
        run(generatorDir)
          .withPrompts(
            getPromptConfig({
              enableAllContributors: true,
              useTabs: true,
            })
          )
          .inTmpDir((dir) => (workDir = dir))
      );

      it("should create editorconfig with default to tabs", () => {
        const re = /\[\*\][^\[]*indent_style\s=\stab\s/g;
        const buffer = readFileSync(join(workDir, ".editorconfig"), {
          encoding: "utf-8",
        });

        const content = buffer.toString();

        expect(content).toMatch(re);
      });

      it("should create editorconfig with yaml to space", () => {
        const re = /\[\*\.{yml,yaml}\][^\[]*indent_style\s=\sspace\s/g;
        const buffer = readFileSync(join(workDir, ".editorconfig"), {
          encoding: "utf-8",
        });

        const content = buffer.toString();

        expect(content).toMatch(re);
      });
    });

    describe("default-space-set-to-2", () => {
      let workDir = "";
      beforeAll(() =>
        run(generatorDir)
          .withPrompts(
            getPromptConfig({
              enableAllContributors: true,
              indentSize: 2,
            })
          )
          .inTmpDir((dir) => (workDir = dir))
      );

      it("creates all-contributorsrc with expected content", () => {
        assert.equalsFileContent(
          join(workDir, ".all-contributorsrc"),
          readFileSync(join(__dirname, "expected/space/.all-contributorsrc"), {
            encoding: "utf8",
          })
        );
      });

      it("creates .editorconfig with expected content", () => {
        assert.equalsFileContent(
          join(workDir, ".editorconfig"),
          readFileSync(join(__dirname, "expected/space/.editorconfig"), {
            encoding: "utf8",
          })
        );
      });
    });

    describe("yaml-space-set-to-4", () => {
      let workDir = "";
      beforeAll(() =>
        run(generatorDir)
          .withPrompts(
            getPromptConfig({
              enableAllContributors: true,
              indentYamlSize: 4,
            })
          )
          .inTmpDir((dir) => (workDir = dir))
      );

      it("creates all-contributorsrc with expected content", () => {
        assert.equalsFileContent(
          join(workDir, "GitReleaseManager.yaml"),
          readFileSync(
            join(__dirname, "expected/space/GitReleaseManager.yaml"),
            {
              encoding: "utf8",
            }
          )
        );
      });
    });
  });
});
