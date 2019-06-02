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

import { Answers } from "yeoman-generator";
import {
  BaseGenerator,
  GeneratorPrompts,
  licenses,
  PromptNames,
} from "../utils";
import { NotEmptyValidator } from "../utils/validators";

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
    this.addPrompt(PromptNames.LicenseType, true);
    const authorPrompt = GeneratorPrompts.getPrompt(PromptNames.Author);

    authorPrompt.when = (answers) =>
      LicenseGenerator._needsAuthor(this.options, answers);
    this.addPrompt(authorPrompt, true);

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
    const options = [PromptNames.LicenseType, PromptNames.Author];

    this.addOption({
      default: new Date().getFullYear(),
      description: "The year of the copyright text",
      name: "year",
      type: Number,
    });

    this.addOption({
      alias: "o",
      default: "LICENSE.txt",
      description: "The file to write the license to",
      name: "out",
      type: String,
      validate: new NotEmptyValidator("out").validate,
    });

    for (const option of options) {
      this.addOption(option);
    }
  }
};
