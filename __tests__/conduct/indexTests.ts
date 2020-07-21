import { join } from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

describe("generator:conduct", () => {
  let workDir = "";
  beforeAll(() =>
    helpers
      .run(join(__dirname, "../../src/conduct"))
      .withPrompts(getPromptConfig({ emailAddress: "kim.nordmo@gmail.com" }))
      .inTmpDir((dir) => (workDir = dir))
  );

  it("should create file", () => {
    assert.file(join(workDir, "CODE_OF_CONDUCT.md"));
  });

  it("should replace email address", () => {
    assert.fileContent(
      join(workDir, "CODE_OF_CONDUCT.md"),
      /kim\.nordmo@gmail.com/
    );
  });
});
