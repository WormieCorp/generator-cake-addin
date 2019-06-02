/*!
 * generator-cake-addin - Get you bootstrapped for creating cake addins.
 * Copyright (C) 2019 Kim J. Nordmo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { trimFilter } from "../filters";
import IValidator from "./ivalidator";

export class LengthValidator implements IValidator {
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

    this.validate = this.validate.bind(this);
  }

  public validate(input: any) {
    if (typeof input !== "string") {
      return true;
    }

    const value = LengthValidator._filter(input);
    if (this._min && value.length < this._min) {
      return `${this._name} must be a minimum of ${this._min} characters.`;
    }

    if (this._max && value.length > this._max) {
      return `${this._name} can not be longer than ${this._max} characters.`;
    }

    return true;
  }
}
