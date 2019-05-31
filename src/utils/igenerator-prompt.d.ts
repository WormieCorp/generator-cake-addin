import { ChoiceType } from "inquirer";
import { Answers } from "yeoman-generator";
import { InputType } from "./constants/input-type";

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
