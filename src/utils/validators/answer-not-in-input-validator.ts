import { Answers } from "yeoman-generator";
import IValidator from "./ivalidator";

export class AnswerNotInInputValidator implements IValidator {
  constructor(
    private _name: string,
    private _answerName: string,
    private _prefix: string = ""
  ) {
    this.validate = this.validate.bind(this);
  }

  public validate(input: any, answers?: Answers) {
    if (!answers || typeof input !== "string") {
      return true;
    }
    const answerValue = answers[this._answerName];
    if (!answerValue || input.indexOf(this._prefix + answerValue) === -1) {
      return true;
    }

    return `The ${this._name} can not contain ${this._prefix + answerValue}.`;
  }
}
