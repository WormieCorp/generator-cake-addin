import { join } from "path";
import * as uuid from "uuid/v4";
import { Answers } from "yeoman-generator";
import BaseGenerator from "../utils/base-generator";
import { PathUtils } from "../utils/file-utils";

export default class ProjectGenerator extends BaseGenerator {
  public prompting() {
    return this.callPrompts();
  }
  public writing() {
    const sourceDir = this.getValue<string>("sourceDir", "./src");
    if (!sourceDir) {
      throw Error("Unable to get the current source directory to use");
    }
    const destinationDir = this.destinationPath(sourceDir);
    const projectName = this.getValue<string>("projectName");
    if (!projectName) {
      throw Error("Unable to get the name of the project");
    }
    const solutionPath = join(destinationDir, `Cake.${projectName}.sln`);
    if (this.fs.exists(solutionPath)) {
      this.log("Solution file already exist, skipping creation of sln file");
    } else {
      this.fs.copyTpl(
        this.templatePath("Template.sln"),
        solutionPath,
        this.allValues
      );
    }

    const mainProjectDirectory = `${destinationDir}/Cake.${projectName}`;

    this.fs.copyTpl(
      this.templatePath("Cake.Template/Cake.Template.csproj.tmpl"),
      this.destinationPath(
        `${mainProjectDirectory}/Cake.${projectName}.csproj`
      ),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template/TemplateRunner.cs"),
      this.destinationPath(`${mainProjectDirectory}/${projectName}Runner.cs`),
      this.allValues
    );
    this.fs.copyTpl(
      this.templatePath("Cake.Template/TemplateSettings.cs"),
      this.destinationPath(`${mainProjectDirectory}/${projectName}Settings.cs`),
      this.allValues
    );
  }

  protected _setup() {
    this.addPromptAndOption({
      default: "./src",
      description: "The path where the project source files will be located",
      filter: (answer) => PathUtils.normalizePath(answer, "./") || "./",
      message: "Where will the project source files be located? ",
      name: "sourceDir",
      optionType: String,
      store: true,
    });
    this.addPromptAndOption({
      default: this.appname,
      description:
        "The name of the C# project that will be created (without the Cake. prefix)",
      filter: (answer) => {
        if (answer.startsWith("Cake.") || answer.startsWith("Cake ")) {
          return answer.substr("Cake.".length);
        } else {
          return answer;
        }
      },
      message: "What is the name of the Cake addin (without a Cake. prefix)? ",
      name: "projectName",
      optionType: String,
      store: true,
    });
    this.addPromptAndOption({
      default: this.user.git.name(),
      description: "The repository owner/organization that will host the addin",
      message: "What is the repository owner/organization for this addin? ",
      name: "repositoryOwner",
      optionType: String,
      store: true,
      validate: (answer) =>
        answer.length > 0 ? true : "A repository owner/author is required",
    });
    this.addPromptAndOption({
      default: (answers: Answers) => answers.repositoryOwner,
      description: "The name of the Cake addin author",
      message: "What is the name of the main author of this Cake addin? ",
      name: "author",
      optionType: String,
      store: true,
      validate: (answer) => (answer.length > 0 ? true : "A author is required"),
    });
    this.addPromptAndOption({
      default: "A cake addin for...",
      description: "The description of this Cake Addin",
      message: "What is the description of this Cake addin? ",
      name: "description",
      optionType: String,
      store: true,
    });

    this.addPrompt({
      choices: ["MIT"],
      default: "MIT",
      message: "What license will this cake addin be using? ",
      name: "licenseType",
      store: true,
      type: "list",
    });

    this.addPrompt({
      default: true,
      message: "Do you want to enable wyam for generating documentation? ",
      name: "enableWyam",
      type: "confirm",
    });

    this.setValue("mainProjectGuid", uuid().toUpperCase());
    this.setValue("testProjectGuid", uuid().toUpperCase());
  }
}
