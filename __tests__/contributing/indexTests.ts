import { readFileSync } from "fs";
import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

const generatorDir = join(__dirname, "../../src/contributing");

describe("generator:contributing", () => {
  describe("default", () => {
    let workDir = "";
    beforeAll(() =>
      run(generatorDir)
        .withPrompts(getPromptConfig())
        .inTmpDir((dir) => (workDir = dir))
    );

    it("creates contributing file", () => {
      return assert.file(join(workDir, "CONTRIBUTING.md"));
    });

    it("creates file with expected content", () => {
      assert.equalsFileContent(
        join(workDir, "CONTRIBUTING.md"),
        readFileSync(join(__dirname, "expected.md"), { encoding: "utf8" })
      );
    });
  });
});
