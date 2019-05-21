import { basename } from "path";
import { cwd } from "process";
import { Answers, OptionConfig, Question } from "yeoman-generator";
import { PathUtils } from "./file-utils";
import { IGeneratorPrompt, InputType } from "./igenerator-prompt";

const validators = {
  notEmpty: (name: string) => (answer: string) =>
    answer.length > 0 ? true : `A ${name} is required`,
};

// tslint:disable: object-literal-sort-keys
const spdxToLicenseName: { [key: string]: string } = {
  // "Apache-2.0": "Apache License 2.0",
  MIT: "MIT License",
  /*"AGPL-3.0-or-later": "GNU Affero General Public License v3.0 or later",
  "GPL-3.0-or-later": "GNU General Public License v3.0 or later",
  "LGPL-3.0-or-later": "GNU Lesser General Public License v3.0 or later",
  "MPL-2.0": "Mozilla Public License 2.0",
  Unlicense: "The Unlicense",*/
};
// tslint:enable: object-literal-sort-keys

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

  public static getOption(name: string): OptionConfig {
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
      default: basename(cwd()),
      description:
        "The name of the Cake addin project (without the Cake. prefix)",
      filter: (answer) => {
        if (answer.startsWith("Cake.") || answer.startsWith("Cake ")) {
          return answer.substr("Cake.".length);
        } else {
          return answer;
        }
      },
      inputType: InputType.Text,
      isCommon: true,
      message: "What is the name of the Cake addin project? ",
      name: "projectName",
    },
    {
      description:
        "The repository owner/organization that the addin will be located under.",
      inputType: InputType.Text,
      isCommon: true,
      message:
        "Who is the repository owner/organization where the addin will located? ",
      name: "repositoryOwner",
      validate: validators.notEmpty("owner/organization"),
    },
    {
      default: (answers: Answers) => answers.repositoryOwner,
      description: "The name of the Cake addin author",
      inputType: InputType.Text,
      isCommon: true,
      message: "Who is the main author of the Cake addin? ",
      name: "author",
      validate: validators.notEmpty("author"),
    },
    {
      description: "The cake addin description",
      filter: (answer) => answer.trim(),
      inputType: InputType.Editor,
      isCommon: true,
      message: "What is the description for the Cake addin? ",
      name: "description",
    },
    {
      choices: Object.entries(spdxToLicenseName).map((value) => {
        return { name: value[1], value: value[0] };
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
      filter: (answer) => PathUtils.normalizePath(answer, "./") || "./",
      inputType: InputType.Text,
      isCommon: true,
      message: "Where will the project source files be located? ",
      name: "sourceDir",
    },
    {
      default: "recipe.cake",
      filter: (answer: string) =>
        PathUtils.normalizePath(answer, null, ".cake"),
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
    };
  }

  private static _convertToOption(
    generatorPrompt: IGeneratorPrompt
  ): OptionConfig {
    return {
      description: generatorPrompt.description || generatorPrompt.message,
      type: this._getOptionType(generatorPrompt.inputType),
    };
  }

  private static _getOptionType(inputType: InputType | string) {
    switch (inputType) {
      case InputType.Confirm:
        return Boolean;

      case InputType.Number:
        return Number;

      default:
        return String;
    }
  }
}
