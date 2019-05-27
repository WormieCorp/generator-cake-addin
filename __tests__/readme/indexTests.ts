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

  describe("basic with long description", () => {
    beforeAll(() =>
      helpers.run(generatorDir).withPrompts({
        author: "Kim Nordmo",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, nisl tincidunt convallis iaculis, tellus ante mattis dui, ac tincidunt libero nibh non tortor. Ut condimentum erat in mi efficitur fringilla. Mauris pellentesque, nulla et viverra rutrum, justo tortor condimentum augue, vitae commodo mauris enim interdum nibh. Vestibulum non dictum velit, in porta nisi. Mauris eu pulvinar urna. Nulla congue turpis eu felis aliquam faucibus. Ut eget orci vehicula turpis euismod faucibus. Curabitur ut eros vel massa feugiat ultricies. Praesent elit velit, elementum et velit sed, faucibus interdum odio. Aliquam interdum mi urna, fermentum maximus elit facilisis eget. Morbi facilisis lectus non odio eleifend rhoncus ac egestas felis. Sed eget nisi mollis, ornare risus id, ultricies quam. Sed et nulla consequat, mollis risus eu, iaculis leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec placerat sem sit amet vestibulum cursus. Sed feugiat ultrices lectus, interdum vehicula enim luctus et.\n\nNam sodales nisl sit amet libero pharetra, eu vestibulum nibh auctor. Vestibulum vitae erat sapien. Proin bibendum sagittis lectus quis posuere. Proin aliquam eu ipsum sit amet sodales. Proin ultricies mollis sem, nec consectetur risus facilisis at. Donec nec tincidunt dui, non viverra elit. Praesent a magna nec dui elementum vestibulum vel quis nunc. Pellentesque sed enim sit amet tortor mollis tincidunt. Phasellus quis lacinia libero. Ut et vestibulum diam. Maecenas efficitur odio et lacus maximus porta non at ante. Aliquam nulla ex, blandit non interdum in, congue quis tortor. Morbi maximus urna sem, sit amet gravida augue tincidunt sit amet. Maecenas mollis sapien enim, sed pharetra augue porta vel.",
        licenseType: "MIT",
        projectName: "TestApp",
        repositoryOwner: "AdmiringWorm",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur cras amet.",
      })
    );

    it("should create readme file", () => {
      assert.file("README.md");
    });

    it("should have expected content", () => {
      assert.equalsFileContent(
        "README.md",
        readFileSync(path.join(__dirname, "basic_with_long_text.md"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("basic with travis enabled", () => {
    beforeAll(() =>
      helpers.run(generatorDir).withPrompts({
        author: "Kim Nordmo",
        description: "The most awesome test cake addin library.",
        enableTravis: true,
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
        readFileSync(path.join(__dirname, "basic_with_travis.md"), {
          encoding: "utf8",
        })
      );
    });
  });
});
