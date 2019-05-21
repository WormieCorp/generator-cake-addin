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

import { join } from "path";
import * as uuid from "uuid/v4";
import BaseGenerator from "../utils/base-generator";
import { GeneratorPrompts } from "../utils/generator-prompts";

/**
 * Generator for creating the basic Cake addin project structure.
 */
export = class ProjectGenerator extends BaseGenerator {
  constructor(args: string | string[], opts: {}) {
    super(args, opts);
  }

  /**
   * The function responsible for prompting the user for questions.
   */
  public prompting() {
    const promptNames = [
      "sourceDir",
      "projectName",
      "author",
      `repositoryOwner::${this.user.git.name()}`,
      "description",
      "licenseType",
      "enableWyam",
    ];

    for (const name of promptNames) {
      const index = name.indexOf("::");
      if (index > 0) {
        const nameValue = name.substr(0, index);
        const defaultValue = name.substr(index + 2);
        this.addPrompt(
          GeneratorPrompts.getPrompt(nameValue, defaultValue),
          true
        );
      } else {
        this.addPrompt(GeneratorPrompts.getPrompt(name), true);
      }
    }

    return this.callPrompts();
  }

  /**
   * The function responsible for writing/copying files/templates to
   * the user specified directory.
   */
  public writing() {
    const sourceDir = this.getValue<string>("sourceDir", "./src");
    if (!sourceDir) {
      throw Error("Unable to get the current source directory to use");
    }
    const destinationDir = this.destinationPath(sourceDir);
    const projectName = this.getValue<string>("projectName");
    if (!projectName) {
      throw Error("Unable to get the name of the project");
    }
    const solutionPath = join(destinationDir, `Cake.${projectName}.sln`);
    const mainProjectDirectory = `${destinationDir}/Cake.${projectName}`;
    const testProjectDirectory = `${destinationDir}/Cake.${projectName}.Tests`;
    if (this.fs.exists(solutionPath)) {
      this.log("Solution file already exist, skipping creation of sln file");
    } else {
      this.fs.copyTpl(
        this.templatePath("Template.sln"),
        solutionPath,
        this.allValues
      );
    }

    this.fs.copyTpl(
      this.templatePath("Cake.Template/Cake.Template.csproj.tmpl"),
      this.destinationPath(
        `${mainProjectDirectory}/Cake.${projectName}.csproj`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template/TemplateAliases.cs"),
      this.destinationPath(`${mainProjectDirectory}/${projectName}Aliases.cs`),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template/TemplateRunner.cs"),
      this.destinationPath(`${mainProjectDirectory}/${projectName}Runner.cs`),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template/TemplateSettings.cs"),
      this.destinationPath(`${mainProjectDirectory}/${projectName}Settings.cs`),
      this.allValues
    );

    this.fs.copyTpl(
      this.templatePath("Cake.Template.Tests/Cake.Template.Tests.csproj.tmpl"),
      this.destinationPath(
        `${testProjectDirectory}/Cake.${projectName}.Tests.csproj`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template.Tests/TemplateAliasesFixture.cs"),
      this.destinationPath(
        `${testProjectDirectory}/${projectName}AliasesFixture.cs`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template.Tests/TemplateAliasesTests.cs"),
      this.destinationPath(
        `${testProjectDirectory}/${projectName}AliasesTests.cs`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template.Tests/TemplateRunnerFixture.cs"),
      this.destinationPath(
        `${testProjectDirectory}/${projectName}RunnerFixture.cs`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template.Tests/TemplateRunnerTests.cs"),
      this.destinationPath(
        `${testProjectDirectory}/${projectName}RunnerTests.cs`
      ),
      this.allValues
    );
  }

  /**
   * Function responsible for running the dotnet tool for either
   * restoring or building the project.
   */
  public install() {
    const solutionPath = this.destinationPath(
      `${this.getValue("sourceDir")}/Cake.${this.getValue("projectName")}.sln`
    );
    const done = this.async();
    if (this.getValue<boolean>("build")) {
      this.spawnCommand("dotnet", ["build", solutionPath]).on("close", done);
    } else {
      this.spawnCommand("dotnet", ["restore", solutionPath]).on("close", done);
    }
  }

  /**
   * Function that will register the necessary questions to ask the user.
   * As well as setting the current description of the generator.
   */
  protected _setup() {
    this.description =
      "Generator for creating a basic cake addin project structure.";

    const optionNames = [
      "sourceDir",
      "projectName",
      "repositoryOwner",
      "author",
      "description",
      "licenseType",
      "enableWyam",
    ];

    this.option("build", {
      alias: "b",
      default: false,
      description: "Build the addin project after creation",
      type: Boolean,
    });

    for (const name of optionNames) {
      this.option(name, GeneratorPrompts.getOption(name));
    }

    this.setValue("mainProjectGuid", uuid().toUpperCase());
    this.setValue("testProjectGuid", uuid().toUpperCase());
  }
};
