import { NotEmptyValidator } from "../../../src/utils/validators";

describe("Validator:NotEmpty", () => {
  const validator = new NotEmptyValidator("test");
  it("should not allow empty input", () => {
    expect(validator.validate("")).toBe("The test can not be empty.");
  });

  it("should not allow whitespace only input", () => {
    expect(validator.validate("             ")).toBe(
      "The test can not be empty."
    );
  });

  it("should allow non-empty text", () => {
    expect(validator.validate("Not Empty")).toBeTruthy();
  });

  it("should allow non-empty text with whitespace", () => {
    expect(validator.validate("   Not Empty with whitespace   ")).toBeTruthy();
  });

  it("should allow input not of string type", () => {
    expect(validator.validate(42)).toBeTruthy();
    expect(validator.validate(false)).toBeTruthy();
  });
});
