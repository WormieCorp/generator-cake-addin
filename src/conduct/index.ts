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

import BaseGenerator from "../utils/base-generator";

export = class ConductGenerator extends BaseGenerator {
  public prompting() {
    // There is nothing to ask the user.
  }

  public writing() {
    this.fs.copy(
      this.templatePath("CODE_OF_CONDUCT.md"),
      this.destinationPath("CODE_OF_CONDUCT.md")
    );
  }

  protected _setup() {
    // There is nothing to set up
  }
};
