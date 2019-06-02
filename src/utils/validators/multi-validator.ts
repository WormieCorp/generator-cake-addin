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
