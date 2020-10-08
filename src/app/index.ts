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

import chalk = require("chalk");
import yosay = require("yosay");
import {
  BaseGenerator,
  GeneratorPrompts,
  InputType,
  PromptNames,
} from "../utils";

export default class MainGenerator extends BaseGenerator {
  public async prompting() {
    const message =
      `Welcome to the ${chalk.red("cake-addin generator")}. ` +
      "We will now ask you some questions so we can set up your new Cake addin project!";
    this.log(yosay(message));

    await this.callPrompts();

    this.composeWith(require.resolve("../conduct"), {});
    if (this.getBoolValue(PromptNames.EnableContributing)) {
      this.composeWith(require.resolve("../contributing"), this.allValues);
    }
    this.composeWith(require.resolve("../license"), this.allValues);
    this.composeWith(require.resolve("../config"), this.allValues);
    this.composeWith(require.resolve("../readme"), this.allValues);
    this.composeWith(require.resolve("../build"), this.allValues);
    this.composeWith(require.resolve("../project"), this.allValues);
  }

  // tslint:disable-next-line: no-empty
  public writing() {}

  public end() {
    const message =
      `Thank you for using our ${chalk.red("cake-addin generator")}. ` +
      "Feel free to report any bugs on our repository! " +
      `You may now remove the ${chalk.cyan(".yo-rc.json")} file, ` +
      "if you do not plan to use any of the sub generators!";
    this.log(yosay(message));
  }

  protected _setup() {
    this.description =
      "Generate a recommended structure and recommended files for creating a Cake addin";

    this.addOption({
      alias: "b",
      default: false,
      description: "Build the addin project after creation",
      name: "build",
      type: Boolean,
    });

    for (const prompt of GeneratorPrompts.commonPrompts) {
      if (!prompt.name) {
        continue;
      }

      if (prompt.type !== InputType.Confirm) {
        this.addOption(prompt.name as PromptNames);
      }
      this.addPrompt(prompt, true);
    }
    this.addPrompt(PromptNames.EnableContributing);
  }
}
