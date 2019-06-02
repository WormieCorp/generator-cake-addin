import { NotEmptyValidator } from "../../../src/utils/validators";

describe("Validator:NotEmpty", () => {
  const validator = new NotEmptyValidator("test").validate;
  it("should not allow empty input", () => {
    expect(validator("")).toBe("The test can not be empty.");
  });

  it("should not allow whitespace only input", () => {
    expect(validator("             ")).toBe("The test can not be empty.");
  });

  it("should allow non-empty text", () => {
    expect(validator("Not Empty")).toBeTruthy();
  });

  it("should allow non-empty text with whitespace", () => {
    expect(validator("   Not Empty with whitespace   ")).toBeTruthy();
  });

  it("should allow input not of string type", () => {
    expect(validator(42)).toBeTruthy();
    expect(validator(false)).toBeTruthy();
  });
});
