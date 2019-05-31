import IValidator from "./ivalidator";

export class MultiValidator implements IValidator {
  private _validators: IValidator[];
  constructor(...validators: IValidator[]) {
    this._validators = validators || [];
    this.validate = this.validate.bind(this);
  }

  public validate(
    input: any,
    answers?: import("inquirer").Answers | undefined
  ) {
    for (const validator of this._validators) {
      const result = validator.validate(input, answers);

      if (typeof result === "string" || result === false) {
        return result;
      }
    }

    return true;
  }
}
