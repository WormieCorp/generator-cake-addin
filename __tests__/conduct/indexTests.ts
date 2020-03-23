import { join } from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

describe("generator:conduct", () => {
  beforeAll(() =>
    helpers
      .run(join(__dirname, "../../src/conduct"))
      .withPrompts(getPromptConfig({ emailAddress: "kim.nordmo@gmail.com" }))
  );

  it("should create file", () => {
    assert.file("CODE_OF_CONDUCT.md");
  });

  it("should replace email address", () => {
    assert.fileContent("CODE_OF_CONDUCT.md", /kim\.nordmo@gmail.com/);
  });
});
