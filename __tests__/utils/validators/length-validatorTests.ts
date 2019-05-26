import { LenghtValidator } from "../../../src/utils/validators/lenght-validator";

describe("validators:Length", () => {
  it("should return true if input is not a string", () => {
    const validator = new LenghtValidator("test", 1, 3).validate;

    expect(validator(42)).toBeTruthy();
  });

  it("should throw error if no min and max is specified", () => {
    expect(() => new LenghtValidator("test")).toThrowError(
      "Unable to create length validator without a minimum or maximum length"
    );
  });

  it("should throw error if no name is specified", () => {
    expect(() => new LenghtValidator("", 2, 6)).toThrowError(
      "No name have been specified"
    );
  });

  describe("minimum lenth", () => {
    const minValidator = new LenghtValidator("test", 3).validate;

    it("should not allow length shorter than specified", () => {
      expect(minValidator("NO")).toBe(
        "test must be a minimum of 3 characters."
      );
    });

    it("should allow lenght equal to 3 characters", () => {
      expect(minValidator("YES")).toBeTruthy();
    });

    it("should allow lenth longer than 3 characters", () => {
      expect(minValidator("I am longer")).toBeTruthy();
    });
  });

  describe("maximum length", () => {
    const maxValidator = new LenghtValidator("test", undefined, 30).validate;

    it("should not allow length longer than specified", () => {
      expect(maxValidator("Duis ut ullamcorper orci metus.")).toBe(
        "test can not be longer than 30 characters."
      );
    });

    it("should allow lenght equal to max characters", () => {
      expect(maxValidator("Aliquam vel leo vel metus sed.")).toBeTruthy();
    });

    it("should allow lenth shorter than max characters", () => {
      expect(maxValidator("Maecenas lobortis volutpat.")).toBeTruthy();
    });
  });
});
