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

import * as Generator from "yeoman-generator";
import {
  GeneratorPrompts,
  IGeneratorOption,
  PromptNames,
} from "./generator-prompts";

/** Declares a common base to be used by all of the implemented generators */
export default abstract class BaseGenerator extends Generator {
  private _prompts: Generator.Question[] = [];
  private _answers: Generator.Answers = {};
  private _optionConfigs: IGeneratorOption[] = [];

  constructor(args: string | string[], opts: {}) {
    super(args, opts);

    this._setup();

    this.validateOptions();
  }

  /** Gets all of the registered prompt values, together with the passed in options */
  public get allValues() {
    return { ...this._answers, ...this.options };
  }

  /**
   * Gets a single stored value, be it a prompt or an option.
   * If none is found, ti will fall back to the specified defaultValue
   */
  public getValue<TType>(key: string, defaultValue?: TType): TType | undefined {
    const existingValues = this.allValues;
    if (key in existingValues) {
      return existingValues[key];
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return undefined;
    }
  }

  /**
   * The function responsible for prompting the user for questions.
   * (Must be implemented in inherited generator to be discovered by yeoman)
   */
  public abstract prompting(): void | Promise<void>;

  /**
   * The function responsible for writing/copying files/templates to
   * the user specified directory.
   */
  public abstract writing(): void | Promise<void>;

  public setValue(key: string, value: any): void {
    this._answers[key] = value;
  }

  /** Helper method that can be called from the prompting function to prompt users with the registered prompts */
  protected async callPrompts() {
    this._answers = { ...(await this.prompt(this._prompts)), ...this._answers };
  }

  /** Everything that should be used by the generator will go here. */
  protected abstract _setup(): void;

  /** Registers a single prompt that should be asked of the user */
  protected addPrompt(
    question: Generator.Question | PromptNames,
    skipIfOption: boolean = false
  ) {
    if (typeof question === "string") {
      question = GeneratorPrompts.getPrompt(question);
    }

    if (!question.name) {
      return;
    }

    if (skipIfOption && question.name in this.options) {
      return;
    }

    this._prompts.push(question);
  }

  protected addOption(question: IGeneratorOption | PromptNames) {
    if (typeof question === "string") {
      question = GeneratorPrompts.getOption(question);
    }

    if (!question.name) {
      return;
    }

    this.option(question.name, question);
    this._optionConfigs.push(question);

    if (question.default && !(question.name in this.options)) {
      this.options[question.name] = question.default;
    }

    if (question.filter && question.name in this.options) {
      this.options[question.name] = question.filter(
        this.options[question.name]
      );
    }
  }

  private validateOptions() {
    for (const option of this._optionConfigs) {
      if (!option.validate || !(option.name in this.options)) {
        continue;
      }

      const result = option.validate(this.options[option.name]);

      if (typeof result === "string") {
        throw Error(result);
      } else if (!result) {
        throw Error(`Invalid input for ${option.name}`);
      }
    }
  }
}
