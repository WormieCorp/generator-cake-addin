import fullname = require("fullname");
import { basename } from "path";
import { cwd } from "process";
import username = require("username");
import { Answers, OptionConfig, Question } from "yeoman-generator";
import { PathNormalizeFilter, PrefixFilter, trimFilter } from "./filters";
import { IGeneratorPrompt, InputType } from "./igenerator-prompt";
import { NotEmptyValidator } from "./validators";
import { LenghtValidator } from "./validators/lenght-validator";

export const licenses = [
  {
    FileHeader: true,
    Name: "Apache License 2.0",
    NeedsAuthor: true,
    Spdx: "Apache-2.0",
  },
  {
    FileHeader: true,
    Name: "GNU General Public License v3.0 or later",
    NeedsAuthor: false,
    Spdx: "GPL-3.0-or-later",
  },
  {
    FileHeader: false,
    Name: "MIT License",
    NeedsAuthor: true,
    Spdx: "MIT",
  },
  {
    FileHeader: false,
    Name: "Mozilla Public License 2.0",
    NeedsAuthor: false,
    Spdx: "MPL-2.0",
  },
  {
    FileHeader: false,
    Name: "The Unlicense",
    NeedsAuthor: false,
    Spdx: "Unlicense",
  },
  {
    FileHeader: false,
    Name: "Do What The F*ck You Want To Public License",
    NeedsAuthor: false,
    Spdx: "WTFPL",
  },
];

export interface IOptionConfigEx extends OptionConfig {
  name: string;
}

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

  public static getPrompt(name: string, defaultValue?: any): Question {
    for (const prompt of GeneratorPrompts._allPrompts) {
      if (prompt.name === name) {
        return GeneratorPrompts._convertToPrompt(prompt, defaultValue);
      }
    }

    throw Error(`A prompt with the name: ${name} was not found.`);
  }

  public static getOption(name: string): IOptionConfigEx {
    for (const option of GeneratorPrompts._allPrompts) {
      if (option.name === name) {
        return this._convertToOption(option);
      }
    }

    throw Error(`A prompt with the name: ${name} was not found`);
  }

  public static getFilter(name: string) {
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
      name: "projectName",
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
      name: "repositoryOwner",
      validate: new NotEmptyValidator("owner/organization").validate,
    },
    {
      default: (answers: Answers) => answers.repositoryOwner,
      description: "The github username of the main author of the cake addin",
      filter: trimFilter,
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the github username of the main addin author? ",
      name: "projectMaintainer",
      validate: new NotEmptyValidator("project maintainer").validate,
    },
    {
      default: fullname,
      description: "The name of the Cake addin author",
      filter: trimFilter,
      inputType: InputType.Text,
      isCommon: true,
      message: "Who is the main author of the Cake addin? ",
      name: "author",
      validate: new NotEmptyValidator("author").validate,
    },
    {
      description: "The cake addin description",
      filter: trimFilter,
      inputType: InputType.Editor,
      isCommon: true,
      message: "What is the description for the Cake addin? ",
      name: "description",
    },
    {
      description:
        "The short description of the cake addin (120 characters or less): ",
      inputType: InputType.Text,
      isCommon: false,
      message:
        "What is the short description for the cake addin (120 characters or less)? ",
      name: "shortDescription",
      validate: new LenghtValidator("short description", undefined, 120)
        .validate,
      when: (answers) =>
        answers.description !== undefined && answers.description.length > 120,
    },
    {
      /*choices: Object.entries(spdxToLicenseName).map((value) => {
        return { name: value[1], value: value[0] };
      })*/
      choices: licenses.map((value) => {
        return { name: value.Name, value: value.Spdx, short: value.Spdx };
      }),
      default: "MIT",
      description: "The cake addin license.",
      inputType: InputType.Selection,
      isCommon: true,
      message: "What license will the Cake addin use? ",
      name: "licenseType",
    },
    {
      default: "./src",
      description: "The path where the project source files will be located.",
      filter: new PathNormalizeFilter("./").filter,
      inputType: InputType.Text,
      isCommon: true,
      message: "Where will the project source files be located? ",
      name: "sourceDir",
    },
    {
      default: "recipe.cake",
      filter: new PathNormalizeFilter(undefined, ".cake").filter,
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the name of the cake build script to use? ",
      name: "scriptName",
    },
    {
      default: true,
      inputType: InputType.Confirm,
      isCommon: true,
      message: "Do you want to use Wyam to generate documentation? ",
      name: "enableWyam",
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: false,
      message: "Do you want to enable linux builds on appveyor? ",
      name: "enableLinux",
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: true,
      message: "Do you wish to enable travis builds? ",
      name: "enableTravis",
    },
    {
      default: false,
      inputType: InputType.Confirm,
      isCommon: false,
      message: "Do you wish to use a CONTRIBUTING.md file? ",
      name: "enableContributing",
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
  ): IOptionConfigEx {
    return {
      description: generatorPrompt.description || generatorPrompt.message,
      name: generatorPrompt.name,
      type: this._getOptionType(generatorPrompt.inputType),
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
