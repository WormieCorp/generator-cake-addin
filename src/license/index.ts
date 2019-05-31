import { Answers } from "yeoman-generator";
import BaseGenerator from "../utils/base-generator";
import {
  GeneratorPrompts,
  licenses,
  PromptNames,
} from "../utils/generator-prompts";

export = class LicenseGenerator extends BaseGenerator {
  private static _needsAuthor(
    options: { [name: string]: any },
    answers: Answers
  ) {
    if (options.licenseType) {
      const optionValue = licenses.find((obj) => {
        return obj.Spdx === options.licenseType;
      });
      if (optionValue) {
        return optionValue.NeedsAuthor;
      }
    }

    const answerValue = licenses.find((obj) => {
      return obj.Spdx === answers.licenseType;
    });

    if (answerValue) {
      return answerValue.NeedsAuthor;
    }

    return false;
  }

  public prompting(): void | Promise<void> {
    this.addPrompt(GeneratorPrompts.getPrompt(PromptNames.LicenseType));
    const authorPrompt = GeneratorPrompts.getPrompt(PromptNames.Author);

    authorPrompt.when = (answers) =>
      !this.options.author &&
      LicenseGenerator._needsAuthor(this.options, answers);
    this.addPrompt(authorPrompt);

    return this.callPrompts();
  }

  public writing(): void | Promise<void> {
    this.fs.copyTpl(
      this.templatePath(this.getValue<string>("licenseType") + ".txt"),
      this.destinationPath(this.options.out),
      this.allValues
    );
  }

  protected _setup(): void {
    const options = [
      GeneratorPrompts.getOption(PromptNames.LicenseType),
      GeneratorPrompts.getOption(PromptNames.Author),
    ];

    for (const option of options) {
      this.option(option.name, option);
    }

    this.option("year", {
      default: new Date().getFullYear(),
      description: "The year of the copyright text",
      type: Number,
    });

    this.option("out", {
      default: "LICENSE.txt",
      description: "The file to write the license to",
      type: String,
    });
  }
};
