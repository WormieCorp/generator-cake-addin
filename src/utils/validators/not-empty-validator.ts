import { trimFilter } from "../filters";
import IValidator from "./ivalidator";

export class NotEmptyValidator implements IValidator {
  constructor(private _name: string) {
    this.validate = this.validate.bind(this);
  }

  public validate(input: any) {
    if (typeof input !== "string") {
      return true;
    }

    if (trimFilter(input).length > 0) {
      return true;
    }

    return `The ${this._name} can not be empty.`;
  }
}
