/*!
 * generator-cake-addin - Gets you bootstrapped for creating cake addins.
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
import { GeneratorPrompts } from "../utils/generator-prompts";

/**
 * Generator for creating build scripts for a cake addin using Cake.Recipe.
 */
export = class BuildGenerator extends BaseGenerator {
  /**
   * The function responsible for prompting the user for questions.
   */
  public async prompting() {
    this.addPrompt(GeneratorPrompts.getPrompt("projectName"), true);
    this.addPrompt(GeneratorPrompts.getPrompt("repositoryOwner"), true);
    this.addPrompt(GeneratorPrompts.getPrompt("scriptName"), true);
    this.addPrompt(GeneratorPrompts.getPrompt("sourceDir"), true);

    await this.callPrompts();

    const repoOwner = this.getValue("repositoryOwner");
    if (repoOwner === "cake-contrib") {
      this.setValue("appveyorAccount", "cakecontrib");
    } else {
      this.setValue("appveyorAccount", false);
    }
  }

  /**
   * The function responsible for writing/copying files/templates to
   * the user specified directory.
   */
  public writing() {
    this.fs.copyTpl(
      this.templatePath("build.ps1"),
      this.destinationPath("build.ps1"),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("build.sh"),
      this.destinationPath("build.sh"),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("recipe.cake"),
      this.destinationPath(this.getValue("scriptName") || "recipe.cake"),
      this.allValues
    );
    this.fs.copy(
      this.templatePath("packages.config"),
      this.destinationPath("tools/packages.config")
    );
  }

  /**
   * Function responsible for setting up the generator,
   * as well as configuring acceptable options.
   */
  protected _setup() {
    this.description =
      "Generator for setting up a basic cake addin build using Cake.Recipe";

    this.option("scriptName", GeneratorPrompts.getOption("scriptName"));
    this.option("projectName", GeneratorPrompts.getOption("projectName"));
    this.option(
      "repositoryOwner",
      GeneratorPrompts.getOption("repositoryOwner")
    );
    this.option("sourceDir", GeneratorPrompts.getOption("sourceDir"));
  }
};
