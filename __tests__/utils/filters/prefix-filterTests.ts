import { PrefixFilter } from "../../../src/utils/filters/prefix-filter";

describe("filters:Prefix", () => {
  const filter = new PrefixFilter("test").filter;

  it("should remove prefix from input", () => {
    expect(filter("testSTring")).toBe("STring");
  });

  it("should not remove anything if prefix is not in input", () => {
    expect(filter("String")).toBe("String");
  });
  it("should remove all prefixes when multiple is in input", () => {
    expect(filter("testtestString")).toBe("String");
  });
});
