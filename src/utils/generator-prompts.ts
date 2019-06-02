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

import fullname = require("fullname");
import { basename } from "path";
import { cwd } from "process";
import username = require("username");
import { Answers, Question } from "yeoman-generator";
import { IGeneratorPrompt, InputType } from "./";
import { PromptNames } from "./constants/prompt-names";
import { PathNormalizeFilter, PrefixFilter, trimFilter } from "./filters";
import { IGeneratorOption } from "./igenerator-option";
import { licenses } from "./licenses";
import {
  AnswerNotInInputValidator,
  LengthValidator,
  MultiValidator,
  NotEmptyValidator,
} from "./validators";

export abstract class GeneratorPrompts {
  public static get commonPrompts(): Question[] {
    const result = [];
    for (const prompt of GeneratorPrompts._allPrompts) {
      if (prompt.isCommon) {
        result.push(this._convertToPrompt(prompt));
      }
    }

    return result;
  }

  public static getPrompt(name: PromptNames, defaultValue?: any): Question {
    for (const prompt of GeneratorPrompts._allPrompts) {
      if (prompt.name === name) {
        return GeneratorPrompts._convertToPrompt(prompt, defaultValue);
      }
    }

    throw Error(`A prompt with the name: ${name} was not found.`);
  }

  public static getOption(name: PromptNames): IGeneratorOption {
    for (const option of GeneratorPrompts._allPrompts) {
      if (option.name === name) {
        return this._convertToOption(option);
      }
    }

    throw Error(`A prompt with the name: ${name} was not found`);
  }

  public static getFilter(name: PromptNames) {
    const prompt = this.getPrompt(name);
    if (prompt) {
      return prompt.filter;
    }

    return undefined;
  }

  private static _allPrompts: IGeneratorPrompt[] = [
    {
      default: basename(cwd()).replace(/^Cake\./i, ""),
      description:
        "The name of the Cake addin project (without the Cake. prefix)",
      filter: new PrefixFilter("Cake.").filter,
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the name of the Cake addin project? ",
      name: PromptNames.ProjectName,
      validate: new NotEmptyValidator("project name").validate,
    },
    {
      default: username,
      description:
        "The repository owner/organization that the addin will be located under.",
      filter: trimFilter,
      inputType: InputType.Text,
      isCommon: true,
      message:
        "Who is the repository owner/organization where the addin will located? ",
      name: PromptNames.RepositoryOwner,
      validate: new NotEmptyValidator("owner/organization").validate,
    },
    {
      default: (answers: Answers) => answers.repositoryOwner,
      description: "The github username of the main author of the cake addin",
      filter: trimFilter,
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the github username of the main addin author? ",
      name: PromptNames.ProjectMaintainer,
      validate: new NotEmptyValidator("project maintainer").validate,
    },
    {
      default: fullname,
      description: "The name of the Cake addin author",
      filter: trimFilter,
      inputType: InputType.Text,
      isCommon: true,
      message: "Who is the main author of the Cake addin? ",
      name: PromptNames.Author,
      validate: new NotEmptyValidator(PromptNames.Author).validate,
    },
    {
      description: "The cake addin description",
      filter: trimFilter,
      inputType: InputType.Editor,
      isCommon: true,
      message: "What is the description for the Cake addin? ",
      name: PromptNames.Description,
      validate: new NotEmptyValidator(PromptNames.Description).validate,
    },
    {
      description:
        "The short description of the cake addin (120 characters or less): ",
      inputType: InputType.Text,
      isCommon: false,
      message:
        "What is the short description for the cake addin (120 characters or less)? ",
      name: PromptNames.ShortDescription,
      validate: new MultiValidator(
        new LengthValidator("short description", undefined, 120),
        new AnswerNotInInputValidator(
          "short description",
          PromptNames.ProjectName,
          "Cake."
        )
      ).validate,
      when: (answers) =>
        answers.description !== undefined &&
        (answers.description.length > 120 ||
          answers.description.indexOf("Cake." + answers.projectName) >= 0),
    },
    {
      choices: licenses.map((value) => {
        return { name: value.Name, value: value.Spdx, short: value.Spdx };
      }),
      default: "MIT",
      description: "The cake addin license.",
      inputType: InputType.Selection,
      isCommon: true,
      message: "What license will the Cake addin use? ",
      name: PromptNames.LicenseType,
      validate: new NotEmptyValidator("license").validate,
    },
    {
      default: "./src",
      description: "The path where the project source files will be located.",
      filter: new PathNormalizeFilter("./").filter,
      inputType: InputType.Text,
      isCommon: true,
      message: "Where will the project source files be located? ",
      name: PromptNames.SourceDir,
    },
    {
      default: "recipe.cake",
      filter: new PathNormalizeFilter(undefined, ".cake").filter,
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the name of the cake build script to use? ",
      name: PromptNames.ScriptName,
      validate: new NotEmptyValidator("cake build script").validate,
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: true,
      message:
        "Do you want to add configurations for the All Contributors Bot? ",
      name: PromptNames.EnableAllContributors,
    },
    {
      default: true,
      inputType: InputType.Confirm,
      isCommon: true,
      message: "Do you want to use Wyam to generate documentation? ",
      name: PromptNames.EnableWyam,
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: false,
      message: "Do you want to enable linux builds on appveyor? ",
      name: PromptNames.EnableLinux,
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: true,
      message: "Do you wish to enable travis builds? ",
      name: PromptNames.EnableTravis,
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: false,
      message: "Do you wish to use a CONTRIBUTING.md file? ",
      name: PromptNames.EnableContributing,
    },
  ];

  private static _convertToPrompt(
    generatorPrompt: IGeneratorPrompt,
    defaultValue?: any
  ): Question {
    return {
      choices: generatorPrompt.choices,
      default: defaultValue || generatorPrompt.default,
      filter: generatorPrompt.filter,
      message: generatorPrompt.message,
      name: generatorPrompt.name,
      store: generatorPrompt.isCommon,
      transformer: generatorPrompt.transformer,
      type: generatorPrompt.inputType,
      validate: generatorPrompt.validate,
      when: generatorPrompt.when,
    };
  }

  private static _convertToOption(
    generatorPrompt: IGeneratorPrompt
  ): IGeneratorOption {
    return {
      description: generatorPrompt.description || generatorPrompt.message,
      filter: generatorPrompt.filter,
      hide: generatorPrompt.inputType === InputType.Confirm,
      isBoolean: generatorPrompt.inputType === InputType.Confirm,
      name: generatorPrompt.name,
      type: this._getOptionType(generatorPrompt.inputType),
      validate: generatorPrompt.validate,
    };
  }

  private static _getOptionType(inputType: InputType | string) {
    switch (inputType) {
      case InputType.Number:
        return Number;

      default:
        return String;
    }
  }
}
