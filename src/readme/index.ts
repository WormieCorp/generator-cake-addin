import { BaseGenerator, licenses, PromptNames } from "../utils";

const promptOptions = [
  PromptNames.ProjectName,
  PromptNames.RepositoryOwner,
  PromptNames.ProjectMaintainer,
  PromptNames.Description,
  PromptNames.ShortDescription,
  PromptNames.LicenseType,
  PromptNames.Author,
  PromptNames.EnableAllContributors,
  PromptNames.EnableTravis,
  PromptNames.EnableContributing,
];

export = class ReadmeGenerator extends BaseGenerator {
  public async prompting() {
    for (const prompt of promptOptions) {
      if (
        prompt === PromptNames.EnableTravis &&
        this.fs.exists(this.destinationPath(".travis.yml"))
      ) {
        this.setValue(prompt, true);
      } else if (
        prompt === PromptNames.EnableContributing &&
        this.fs.exists(this.destinationPath("CONTRIBUTING.md"))
      ) {
        this.setValue(prompt, true);
      } else {
        this.addPrompt(prompt, true);
      }
    }

    await this.callPrompts();

    const repoOwner = this.getValue<string>(
      PromptNames.RepositoryOwner
    ) as string;
    if (repoOwner === "cake-contrib") {
      this.setValue(PromptNames.AppVeyorAccount, "cakecontrib");
    } else {
      this.setValue(
        PromptNames.AppVeyorAccount,
        repoOwner.replace("-", "").toLowerCase()
      );
    }
    const fullProjectName = `Cake.${this.getValue(PromptNames.ProjectName)}`;
    this.setValue("fullProjectName", fullProjectName);
    this.setValue(
      "appveyorProjectName",
      fullProjectName.replace(".", "-").toLowerCase()
    );

    const licenseTypeSpdx = this.getValue<string>(
      PromptNames.LicenseType,
      "MIT"
    );
    const licenseType = licenses.find((value) => {
      return value.Spdx === licenseTypeSpdx;
    });

    this.setValue(PromptNames.LicenseType, licenseType);
  }

  public writing() {
    this.fs.copyTpl(
      this.templatePath("README.md.tmpl"),
      this.destinationPath("README.md"),
      this.allValues
    );
  }

  protected _setup(): void {
    for (const option of promptOptions) {
      this.addOption(option);
    }
  }
};
