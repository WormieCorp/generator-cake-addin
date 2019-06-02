/*!
 * generator-cake-addin - Get you bootstrapped for creating cake addins.
 * Copyright (C) 2019 Kim J. Nordmo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
    let enableValue = this.allValues[PromptNames.EnableAllContributors];
    this.log(
      `${
        PromptNames.EnableAllContributors
      } is of type ${typeof enableValue} before adding prompts with value ${enableValue}`
    );

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

    enableValue = this.allValues[PromptNames.EnableAllContributors];
    this.log(
      `${
        PromptNames.EnableAllContributors
      } is of type ${typeof enableValue} before calling prompts with value ${enableValue}`
    );

    await this.callPrompts();

    enableValue = this.allValues[PromptNames.EnableAllContributors];
    this.log(
      `${
        PromptNames.EnableAllContributors
      } is of type ${typeof enableValue} after calling prompts with value ${enableValue}`
    );

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
    this.log("Logging values in allValues");

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
