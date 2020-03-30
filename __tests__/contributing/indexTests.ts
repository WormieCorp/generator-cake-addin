import { readFileSync } from "fs";
import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = join(__dirname, "../../src/contributing");

describe("generator:contributing", () => {
  describe("default", () => {
    beforeAll(() => run(generatorDir).withPrompts(getPromptConfig()));

    it("creates contributing file", () => {
      assert.file("CONTRIBUTING.md");
    });

    it("creates file with expected content", () => {
      assert.equalsFileContent(
        "CONTRIBUTING.md",
        readFileSync(join(__dirname, "expected.md"), { encoding: "utf8" })
      );
    });
  });
});
