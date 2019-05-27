import { readFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

const generatorDir = path.join(__dirname, "../../src/readme");

describe("generator:Readme", () => {
  describe("basic", () => {
    beforeAll(() =>
      helpers.run(generatorDir).withPrompts({
        author: "Kim Nordmo",
        description: "The most awesome test cake addin library.",
        licenseType: "MIT",
        projectName: "TestApp",
        repositoryOwner: "AdmiringWorm",
      })
    );

    it("should create readme file", () => {
      assert.file("README.md");
    });

    it("should have expected content", () => {
      assert.equalsFileContent(
        "README.md",
        readFileSync(path.join(__dirname, "basic.md"), { encoding: "utf8" })
      );
    });
  });
});
