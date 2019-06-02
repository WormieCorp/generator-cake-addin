import { PathUtils } from "../../src/utils/file-utils";

describe("normalizing paths", () => {
  it("should return same path", () => {
    const path = "str/test/path.js";
    expect(PathUtils.normalizePath(path)).toBe(path);
  });

  it("should remove unwanted forward slash", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath("src\\test\\path.js");

    expect(actual).toBe(expected);
  });

  it("should replace prefixed backslash", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath("/" + expected);

    expect(actual).toBe(expected);
  });

  it("should remove multiple prefixed backslashes", () => {
    const expected = "src/test/patch.js";
    const actual = PathUtils.normalizePath("//" + expected);

    expect(actual).toBe(expected);
  });

  it("should remove dot relative path", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath("./" + expected);

    expect(actual).toBe(expected);
  });

  it("should remove suffixed backslash", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath(expected + "/");

    expect(actual).toBe(expected);
  });

  it("should remove multiple suffixed backslashes", () => {
    const expected = "src/test/patch.js";
    const actual = PathUtils.normalizePath(expected + "//");

    expect(actual).toBe(expected);
  });

  it("should remove both suffixed and prefixed backslash", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath("/" + expected + "/");

    expect(actual).toBe(expected);
  });

  it("should add prefix if there is none", () => {
    const expected = "./src/test/path.js";
    const actual = PathUtils.normalizePath("src/test/path.js", "./");

    expect(actual).toBe(expected);
  });

  it("should return same path if prefix already applied", () => {
    const expected = "src/test/path.js";
    const actual = PathUtils.normalizePath("test/path.js", "src/");

    expect(actual).toBe(expected);
  });

  it("should add suffix if there is none", () => {
    const expected = "build.cake";
    const actual = PathUtils.normalizePath("build", null, ".cake");

    expect(actual).toBe(expected);
  });

  it("should return same path if suffix already applied", () => {
    const expected = "build.cake";
    const actual = PathUtils.normalizePath(expected, null, ".cake");

    expect(actual).toBe(expected);
  });

  it("should add prefix and suffix if there is none", () => {
    const expected = "src/build.cake";
    const actual = PathUtils.normalizePath("build", "src/", ".cake");

    expect(actual).toBe(expected);
  });
});
