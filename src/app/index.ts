import BaseGenerator from "../utils/base-generator";
import { GeneratorPrompts } from "../utils/generator-prompts";

export = class MainGenerator extends BaseGenerator {
  public async prompting() {
    await this.callPrompts();

    this.composeWith(require.resolve("../project"), this.allValues);
    this.composeWith(require.resolve("../appveyor"), this.allValues);
  }

  // tslint:disable-next-line: no-empty
  public writing() {}
  protected _setup() {
    this.description =
      "Generate a recommended structure and recommended files for creating a Cake addin";

    this.option("build", {
      alias: "b",
      default: false,
      description: "Build the addin project after creation",
      type: Boolean,
    });

    for (const prompt of GeneratorPrompts.commonPrompts) {
      if (!prompt.name) {
        continue;
      }
      if (prompt.name === "repositoryOwner") {
        prompt.default = this.user.git.name();
      }

      this.option(prompt.name, GeneratorPrompts.getOption(prompt.name));
      this.addPrompt(prompt, true);
    }
  }
};
