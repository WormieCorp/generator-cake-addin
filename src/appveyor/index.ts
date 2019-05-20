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
import { PathUtils } from "../utils/file-utils";

/**
 * Generator for creating a simple appveyor.yml file.
 */
export default class AppveyorGenerator extends BaseGenerator {
  /**
   * The function responsible for prompting the user for questions.
   */
  public async prompting() {
    await this.callPrompts();
  }

  /**
   * The function responsible for writing/copying files/templates to
   * the user specified directory.
   */
  public writing() {
    this.log("Enable appveyor Linux Build: " + this.getValue("enableLinux"));
    this.fs.copyTpl(
      this.templatePath("appveyor.yml.tmpl"),
      this.destinationPath(".appveyor.yml"),
      this.allValues
    );
  }

  /**
   * Function that will register the necessary questions to ask the user.
   * As well as setting the current description of the generator.
   */
  protected _setup(): void {
    this.description =
      "Simple generator for creating a appveyor.yml file to be used with Cake addins";

    this.addPromptAndOption({
      default: "recipe.cake",
      description: "The cake build script to use as a cache dependency",
      filter: (answer: string) =>
        PathUtils.normalizePath(answer, null, ".cake"),
      message:
        "What is the name of the cake build script to use as a build dependency? ",
      name: "scriptName",
      optionType: String,
      store: true,
    });
    this.addPrompt({
      default: false,
      message: "Do you want linux builds enabled on appveyor? ",
      name: "enableLinux",
      type: "confirm",
    });
  }
}
