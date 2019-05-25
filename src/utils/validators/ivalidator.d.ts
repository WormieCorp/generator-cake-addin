import { Answers } from "yeoman-generator";

export default interface IValidator {
  validate(input: any, answers?: Answers): boolean | string;
}
