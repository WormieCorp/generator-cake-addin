import { AnswerNotInInputValidator } from "../../../src/utils/validators";

describe("validator:AnswerNotInInput", () => {
  const noPrefixValidator = new AnswerNotInInputValidator("test", "testAnswer")
    .validate;
  /*const prefixValidator = new AnswerNotInInputValidator(
    "test",
    "testAnswer",
    "Prefix"
  );*/

  it("should not allow answer value in input", () => {
    const answers = {
      testAnswer: "YES",
    };

    expect(noPrefixValidator("YES, this input should fail", answers)).toBe(
      "The test can not contain YES."
    );
  });

  it("should return true if answer value is not available", () => {
    const answers = {};

    expect(noPrefixValidator("YES, Does not matter", answers)).toBeTruthy();
  });

  it("should return true if no answers is available", () => {
    expect(noPrefixValidator("YES, Does not matter")).toBeTruthy();
  });

  it("should return true if input is not a string", () => {
    const answers = {
      testAnswer: "YES",
    };

    expect(noPrefixValidator(42, answers)).toBeTruthy();
    expect(noPrefixValidator(false, answers)).toBeTruthy();
  });

  it("should return true if input does not contain answer value", () => {
    const answers = {
      testAnswer: "NO",
    };

    expect(
      noPrefixValidator("YES, I do not contain the answer value", answers)
    ).toBeTruthy();
  });
});
