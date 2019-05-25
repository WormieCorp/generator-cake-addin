import { trimFilter } from "../filters";
import IValidator from "./ivalidator";

export class LenghtValidator implements IValidator {
  private static _filter = trimFilter;
  constructor(
    private _name: string,
    private _min?: number,
    private _max?: number
  ) {
    if (!_min && !_max) {
      throw Error(
        "Unable to create length validator without a minimum or maximum length"
      );
    }
    if (!_name) {
      throw Error("No name have been specified");
    }
  }

  public validate(input: any) {
    if (typeof input !== "string") {
      return true;
    }

    const value = LenghtValidator._filter(input);
    if (this._min && value.length < this._min) {
      return `${this._name} must be a minimum of ${this._min} characters.`;
    }

    if (this._max && value.length > this._max) {
      return `${this._name} can not be longer than ${this._max} characters.`;
    }

    return true;
  }
}
