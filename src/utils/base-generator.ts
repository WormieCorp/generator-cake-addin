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

import inquirer = require("inquirer");
import * as Generator from "yeoman-generator";

export interface IQuestionOption extends Generator.Question {
  description: string;
  optionType: typeof Boolean | typeof String | typeof Number;
}

export default abstract class BaseGenerator extends Generator {
  private _prompts: Generator.Question[] = [];
  private _answers: Generator.Answers = {};

  constructor(args: string | string[], opts: {}) {
    super(args, opts);

    this._setup();
  }

  public get allValues() {
    return { ...this._answers, ...this.options };
  }

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

  public abstract prompting(): void | Promise<void>;
  public abstract writing(): void | Promise<void>;

  public setValue(key: string, value: any): void {
    this._answers[key] = value;
  }

  protected async callPrompts() {
    this._answers = { ...(await this.prompt(this._prompts)), ...this._answers };
  }

  protected abstract _setup(): void;

  protected addPromptAndOption(question: IQuestionOption) {
    if (!question.name) {
      return;
    }
    const name = question.name;

    this.option(name, {
      description: question.description,
      type: question.optionType,
    });

    if (question.when !== undefined) {
      const existingWhenStatement = question.when;
      question.when = this.createWhenStatement(existingWhenStatement, name);
    } else {
      question.when = () => !this.hasKey(name);
    }

    this.addPrompt(question);
  }

  protected addPrompt(question: Generator.Question) {
    this._prompts.push(question);
  }

  private createWhenStatement(
    prevWhenStatement:
      | boolean
      | ((answers: inquirer.Answers) => boolean)
      | ((answers: inquirer.Answers) => Promise<boolean>),
    optionKey: string
  ) {
    if (typeof prevWhenStatement === typeof "boolean") {
      return () => prevWhenStatement && !this.hasKey(optionKey);
    } else if (typeof prevWhenStatement === "function") {
      return (answers: inquirer.Answers) =>
        prevWhenStatement(answers) && !this.hasKey(optionKey);
    }

    return prevWhenStatement;
  }

  private hasKey(key: string, table?: {}): boolean {
    if (table) {
      return key in table;
    } else {
      return key in this.options;
    }
  }
}
