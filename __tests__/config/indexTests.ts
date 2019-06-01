import { readFileSync } from "fs";
import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";

const generatorDir = join(__dirname, "../../src/config");

describe("generator:contributing", () => {
  describe("default", () => {
    beforeAll(() => run(generatorDir));

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
  });
});
