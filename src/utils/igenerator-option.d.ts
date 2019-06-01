import { OptionConfig } from "yeoman-generator";
export interface IGeneratorOption extends OptionConfig {
  isBoolean?: boolean;
  name: string;
  filter?: (input: string) => string;
  validate?: (answer: string) => string | boolean;
}
