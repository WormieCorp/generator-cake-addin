import { readFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

function runHelper(licenseType: string, author: string = "Kim Nordmo") {
  return helpers
    .run(path.join(__dirname, "../../src/license"))
    .withPrompts({
      author,
      licenseType,
    })
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
      beforeAll(() => runHelper(license.Name));

      it("should create license.txt", () => {
        assert.file("LICENSE.txt");
      });

      it("should create license with expected content", () => {
        assert.equalsFileContent(
          "LICENSE.txt",
          readFileSync(path.join(__dirname, `${license.Name}.txt`), {
            encoding: "utf8",
          })
        );
      });

      if (!license.Author) {
        it("should not require author to be set", () => {
          return helpers
            .run(path.join(__dirname, "../../src/license"))
            .withPrompts({ licenseType: license.Name })
            .withOptions({ year: 2019 })
            .then(() => {
              assert.equalsFileContent(
                "LICENSE.txt",
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
    beforeAll(() =>
      runHelper("Unlicense").withOptions({ out: "UNLICENSE.txt" })
    );

    it("should allow user to specify file with options", () => {
      assert.file("UNLICENSE.txt");
    });
  });
});
