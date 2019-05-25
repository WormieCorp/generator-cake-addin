import { trimFilter } from "../../../src/utils/filters";

describe("filters:trim", () => {
  const filter = trimFilter;

  it("should trim whitespace prefix", () => {
    const expected = "My Test";

    expect(filter(`    ${expected}`)).toBe(expected);
  });

  it("should trim whitespace suffix", () => {
    const expected = "My Test 2";

    expect(filter(`${expected}       `)).toBe(expected);
  });

  it("should trim whitespace prefix and suffix", () => {
    const expected = "My Test 547";

    expect(filter(`    ${expected}      `)).toBe(expected);
  });

  it("should return same text when trim is not needed", () => {
    const expected = "My Test 42";

    expect(filter(expected)).toBe(expected);
  });
});
