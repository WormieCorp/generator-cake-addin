import { ChoiceType } from "inquirer";
import { Answers } from "yeoman-generator";

/** Represents 1 single generator prompt with options */
export const enum InputType {
  Checkbox = "checkbox",
  Confirm = "confirm",
  Editor = "editor",
  Expand = "expand",
  Number = "number",
  Password = "password",
  Selection = "list",
  Text = "input",
}

export interface IGeneratorPrompt {
  choices?: string[] | ChoiceType[];
  default?: any | ((answers: Answers) => any);
  description?: string;
  filter?: (input: string) => string;
  inputType: InputType | string;
  isCommon: boolean;
  message: string;
  name: string;
  transformer?: (input: string) => string;
  validate?: (answer: string) => string | boolean;
  when?: (answers: Answers) => boolean;
}
