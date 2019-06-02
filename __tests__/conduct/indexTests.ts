import { join } from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

describe("generator:conduct", () => {
  beforeAll(() => helpers.run(join(__dirname, "../../src/conduct")));

  it("should create file", () => {
    assert.file("CODE_OF_CONDUCT.md");
  });
});
