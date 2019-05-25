import IValidator from "./ivalidator";

export class NotEmptyValidator implements IValidator {
  constructor(private _name: string) {}

  public validate(input: any) {
    if (typeof input !== "string") {
      return true;
    }

    if (input.trim().length > 0) {
      return true;
    }

    return `The ${this._name} can not be empty.`;
  }
}
