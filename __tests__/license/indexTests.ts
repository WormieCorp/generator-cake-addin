import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

function runHelper(
  licenseType: string,
  author: string = "Kim Nordmo"
): helpers.RunContext {
  return helpers
    .run(path.join(__dirname, "../../src/license"))
    .withPrompts(
      getPromptConfig({
        author,
        licenseType,
      })
    )
    .withOptions({
      year: 2019,
    });
}

const licenses = [
  { Name: "Apache-2.0", Author: true },
  { Name: "GPL-3.0-or-later", Author: false },
  { Name: "MIT", Author: true },
  { Name: "MPL-2.0", Author: false },
  { Name: "Unlicense", Author: false },
  { Name: "WTFPL", Author: false },
];

describe("generator:license", () => {
  for (const license of licenses) {
    describe(`${license.Name} License`, () => {
      let workDir = "";
      beforeAll(() =>
        runHelper(license.Name).inTmpDir((dir) => (workDir = dir))
      );

      it("should create license.txt", () => {
        assert.file(path.join(workDir, "LICENSE.txt"));
      });

      it("should create license with expected content", () => {
        assert.equalsFileContent(
          path.join(workDir, "LICENSE.txt"),
          readFileSync(path.join(__dirname, `${license.Name}.txt`), {
            encoding: "utf8",
          })
        );
      });

      if (!license.Author) {
        it("should not require author to be set", () => {
          let workDir2 = "";
          return helpers
            .run(path.join(__dirname, "../../src/license"))
            .withPrompts(getPromptConfig({ licenseType: license.Name }))
            .withOptions({ year: 2019 })
            .inTmpDir((dir) => (workDir2 = dir))
            .then(() => {
              assert.equalsFileContent(
                path.join(workDir2, "LICENSE.txt"),
                readFileSync(path.join(__dirname, `${license.Name}.txt`), {
                  encoding: "utf8",
                })
              );
            });
        });
      }
    });
  }

  describe("custom location", () => {
    let workDir = "";
    beforeAll(() =>
      runHelper("Unlicense")
        .withOptions({ out: "UNLICENSE.txt" })
        .inTmpDir((dir) => (workDir = dir))
    );

    it("should allow user to specify file with options", () => {
      assert.file(path.join(workDir, "UNLICENSE.txt"));
    });
  });

  const licenseNames = [
    "COPYING",
    "COPYING.md",
    "COPYING.txt",
    "LICENSE",
    "LICENSE.md",
    "LICENSE.txt",
  ];

  for (const license of licenseNames) {
    let workDir = "";
    it(`should reuse existing ${license} file`, () => {
      return runHelper("MIT")
        .inTmpDir((tmpDir) => {
          writeFileSync(path.join(tmpDir, license), "");
          workDir = tmpDir;
        })
        .then(() => {
          assert.file(path.join(workDir, license));
          if (license !== "LICENSE.txt") {
            assert.noFile(path.join(workDir, "LICENSE.txt"));
          }
        });
    });
  }
});
