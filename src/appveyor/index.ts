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
import { GeneratorPrompts, PromptNames } from "../utils/generator-prompts";

/**
 * Generator for creating a simple appveyor.yml file.
 */
export = class AppveyorGenerator extends BaseGenerator {
  /**
   * The function responsible for prompting the user for questions.
   */
  public prompting() {
    this.addPrompt(GeneratorPrompts.getPrompt(PromptNames.ScriptName), true);
    this.addPrompt(GeneratorPrompts.getPrompt(PromptNames.EnableLinux));
    return this.callPrompts();
  }

  /**
   * The function responsible for writing/copying files/templates to
   * the user specified directory.
   */
  public writing() {
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

    this.option(
      "scriptName",
      GeneratorPrompts.getOption(PromptNames.ScriptName)
    );
  }
};
