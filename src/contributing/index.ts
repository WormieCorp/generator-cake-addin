import { BaseGenerator, PromptNames } from "../utils/index";

export = class Contributing extends BaseGenerator {
  get promptNames() {
    return [PromptNames.ProjectName, PromptNames.RepositoryOwner];
  }

  public prompting() {
    return this.callPrompts();
  }

  public writing() {
    this.fs.copyTpl(
      this.templatePath("CONTRIBUTING.md.tmpl"),
      this.destinationPath("CONTRIBUTING.md"),
      this.allValues
    );
  }

  protected _setup() {
    for (const name of this.promptNames) {
      this.addOption(name);
      this.addPrompt(name, true);
    }
  }
};
