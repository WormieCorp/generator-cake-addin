import BaseGenerator from "../utils/base-generator";
import { PathUtils } from "../utils/file-utils";

// THis is a test comment
export = class AppveyorGenerator extends BaseGenerator {
  public async prompting() {
    await this.callPrompts();
  }

  public writing() {
    this.log("Enable appveyor Linux Build: " + this.getValue("enableLinux"));
    this.fs.copyTpl(
      this.templatePath("appveyor.yml.tmpl"),
      this.destinationPath(".appveyor.yml"),
      this.allValues
    );
  }

  protected _setup(): void {
    this.addPromptAndOption({
      default: "recipe.cake",
      description: "The cake build script to use as a cache dependency",
      filter: (answer: string) =>
        PathUtils.normalizePath(answer, null, ".cake"),
      message:
        "What is the name of the cake build script to use as a build dependency? ",
      name: "scriptName",
      optionType: String,
      store: true,
    });
    this.addPrompt({
      default: false,
      message: "Do you want linux builds enabled on appveyor? ",
      name: "enableLinux",
      type: "confirm",
    });
  }
};
