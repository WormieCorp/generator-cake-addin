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
