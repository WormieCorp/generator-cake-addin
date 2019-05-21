import BaseGenerator from "../utils/base-generator";

export = class TravisGenerator extends BaseGenerator {
  public prompting(): void | Promise<void> {
    return this.callPrompts();
  }
  public writing(): void | Promise<void> {
    this.fs.copy(
      this.templatePath("travis.yml"),
      this.destinationPath(".travis.yml")
    );
  }
  protected _setup(): void {
    this.description =
      "Simple generator for creating a travis.yml file to be used with Cake addins";
  }
};
