import { sync } from "command-exists";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";
import { getPromptConfig } from "../../defaultConfigs";

jest.setTimeout(5 * 60 * 1000);

const generatorDir = path.join(__dirname, "../../src/project");

const skipDotnet = !sync("dotnet");

function getTestFile(testPath: string) {
  return path.join(__dirname, testPath);
}

function assertContent(testPath: string, contentPath: string) {
  assert.equalsFileContent(
    testPath,
    readFileSync(getTestFile(contentPath), { encoding: "utf8" })
  );
}

describe("generator:project", () => {
  it("should not overwrite solution file if one exist", () => {
    let workDir = "";
    return helpers
      .run(generatorDir)
      .withOptions(
        getPromptConfig({
          licenseType: "MPL-2.0",
          "skip-dotnet": true,
        })
      )
      .inTmpDir((tmpDir) => {
        mkdirSync(path.join(tmpDir, "src"));
        writeFileSync(path.join(tmpDir, "src/Cake.TestApp.sln"), "");
        workDir = tmpDir;
      })
      .then(() => {
        assert.equalsFileContent(
          path.join(workDir, "src", "Cake.TestApp.sln"),
          ""
        );
      });
  });

  it("should set up url to wyam documentation when enabled", () => {
    let workDir = "";
    return helpers
      .run(generatorDir)
      .withPrompts(getPromptConfig())
      .withOptions({ licenseType: "MPL-2.0", "skip-dotnet": true })
      .inTmpDir((dir) => (workDir = dir))
      .then(() =>
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp/Cake.TestApp.csproj"),
          "<PackageProjectUrl>https://admiringworm.github.io/Cake.TestApp</PackageProjectUrl>"
        )
      );
  });

  describe("default", () => {
    let workDir = "";
    beforeAll(() => {
      return helpers
        .run(generatorDir)
        .withPrompts(
          getPromptConfig({
            description: "Cake addin generation test",
            licenseType: "MPL-2.0",
            enableWyam: false,
          })
        )
        .withOptions({
          "skip-dotnet": true,
          "start-year": 2018,
        })
        .inTmpDir((dir) => (workDir = dir));
    });

    it("should create expected files", () => {
      assert.file(
        [
          "src/Cake.TestApp.sln",
          "src/stylecop.json",
          "src/Cake.TestApp/Cake.TestApp.csproj",
          "src/Cake.TestApp/TestAppAliases.cs",
          "src/Cake.TestApp/TestAppRunner.cs",
          "src/Cake.TestApp/TestAppSettings.cs",
          "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
          "src/Cake.TestApp.Tests/TestAppAliasesFixture.cs",
          "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
          "src/Cake.TestApp.Tests/TestAppRunnerFixture.cs",
          "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
        ].map((v) => path.join(workDir, v))
      );
    });

    it("should create main project file with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "Cake.TestApp.csproj"),
        "default/project/project.csproj"
      );
    });

    it("should create Aliases class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
        "default/aliases.cs"
      );
    });

    it("should create Runner class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
        "default/runner.cs"
      );
    });

    it("should create Settings class with expected content", () => {
      assertContent(
        path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
        "default/settings.cs"
      );
    });

    it("should create Aliases fixture class with expected content", () => {
      assertContent(
        path.join(
          workDir,
          "src",
          "Cake.TestApp.Tests",
          "TestAppAliasesFixture.cs"
        ),
        "default/testAliasesFixture.cs"
      );
    });

    it("should create Runner fixture class with expected content", () => {
      assertContent(
        path.join(
          workDir,
          "src",
          "Cake.TestApp.Tests",
          "TestAppRunnerFixture.cs"
        ),
        "default/testRunnerFixture.cs"
      );
    });

    it("should create stylecop configuration with expected content", () => {
      assertContent(
        path.join(workDir, "src", "stylecop.json"),
        "default/stylecop.json"
      );
    });

    describe("xunit", () => {
      let workDir2 = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(getPromptConfig())
          .withOptions({
            licenseType: "MPL-2.0",
            "skip-dotnet": true,
          })
          .inTmpDir((dir) => (workDir2 = dir));
      });

      it("should create expected files", () => {
        assert.file(
          [
            "src/Cake.TestApp.Tests/Cake.TestApp.Tests.csproj",
            "src/Cake.TestApp.Tests/TestAppAliasesTests.cs",
            "src/Cake.TestApp.Tests/TestAppRunnerTests.cs",
          ].map((v) => path.join(workDir2, v))
        );
      });

      it("should create test project file with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          "default/xunit/testProject/testProject.csproj"
        );
      });

      it("should create aliases test class with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          "default/xunit/testAliasesTests.cs"
        );
      });

      it("should create runner test class with expected content", () => {
        assertContent(
          path.join(
            workDir2,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          "default/xunit/testRunnerTests.cs"
        );
      });
    });
  });

  describe("custom-source-directory", () => {
    it("should allow changing source directory through prompts", () => {
      let workDir = "";
      return helpers
        .run(generatorDir)
        .withPrompts(getPromptConfig({ sourceDir: "./source" }))
        .withOptions({ licenseType: "MPL-2.0", "skip-dotnet": true })
        .inTmpDir((dir) => (workDir = dir))
        .then(() =>
          assert.file(path.join(workDir, "source", "Cake.TestApp.sln"))
        );
    });

    it("should allow changing source directory through options", () => {
      let workDir = "";
      return helpers
        .run(generatorDir)
        .withOptions(
          getPromptConfig({
            licenseType: "MPL-2.0",
            "skip-dotnet": true,
            sourceDir: "./source",
          })
        )
        .inTmpDir((dir) => (workDir = dir))
        .then(() =>
          assert.file(path.join(workDir, "source", "Cake.TestApp.sln"))
        );
    });
  });

  if (!skipDotnet) {
    describe("dotnet build", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withOptions(
            getPromptConfig({
              build: true,
              licenseType: "MPL-2.0",
            })
          )
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should run dotnet build when --build is specified", () => {
        assert.file(
          [
            "src/Cake.TestApp/bin/Debug/netstandard2.0/Cake.TestApp.dll",
            "src/Cake.TestApp/bin/Debug/net461/Cake.TestApp.dll",
            "src/Cake.TestApp.Tests/bin/Debug/netcoreapp2.1/Cake.TestApp.Tests.dll",
          ].map((v) => path.join(workDir, v))
        );
      });
    });
  }

  describe("indentation", () => {
    describe("tabs", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              useTabs: true,
            })
          )
          .withOptions({
            licenseType: "MPL-2.0",
            "skip-dotnet": true,
            "start-year": 2019,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      const tabRegex = /^($| \*|\t*[^\s])/;

      it("should create solution file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp.sln"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create project file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp/Cake.TestApp.csproj"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create aliases file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create Runner file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create settings file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test project file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test aliases fixture file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesFixture.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test aliases file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test Runner fixture file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerFixture.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create test runner file with tabs instead of spaces", () => {
        const buffer = readFileSync(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          {
            encoding: "utf-8",
          }
        );
        const lines = buffer.toString().split(/\r?\n/g);

        lines.forEach((line) => {
          expect(line).toMatch(tabRegex);
        });
      });

      it("should create stylecop configuration with tabs", () => {
        assertContent(
          path.join(workDir, "src", "stylecop.json"),
          "tabs/stylecop.json"
        );
      });
    });

    describe("space", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              indentSize: 2,
              licenseType: "MPL-2.0",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should indent Aliases class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppAliases.cs"),
          "space/aliases.cs"
        );
      });

      it("should indent Project file with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "Cake.TestApp.csproj"),
          "space/project.csproj"
        );
      });

      it("should indent Runner class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppRunner.cs"),
          "space/runner.cs"
        );
      });

      it("should indent Settings class with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          "space/settings.cs"
        );
      });

      it("should indent Aliases Fixture class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesFixture.cs"
          ),
          "space/testAliasesFixture.cs"
        );
      });

      it("should indent Aliases Tests class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppAliasesTests.cs"
          ),
          "space/testAliasesTests.cs"
        );
      });

      it("should indent Test Project file with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "Cake.TestApp.Tests.csproj"
          ),
          "space/testProject.csproj"
        );
      });

      it("should indent Runner Fixture class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerFixture.cs"
          ),
          "space/testRunnerFixture.cs"
        );
      });

      it("should indent Runner Tests class with 2 spaces", () => {
        assertContent(
          path.join(
            workDir,
            "src",
            "Cake.TestApp.Tests",
            "TestAppRunnerTests.cs"
          ),
          "space/testRunnerTests.cs"
        );
      });

      it("should create stylecop configuration with 2 spaces", () => {
        assertContent(
          path.join(workDir, "src", "stylecop.json"),
          "space/stylecop.json"
        );
      });
    });
  });

  describe("licenses", () => {
    describe("Apache-2.0", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "Apache-2.0",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct apache license header", () => {
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */`
        );
      });
    });

    describe("GPL-3.0-or-later", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "GPL-3.0-or-later",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct gpl 3.0 license header", () => {
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `/*
 * Copyright (C) 2018-${new Date().getFullYear()} Kim Nordmo
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */`
        );
      });
    });

    describe("MIT", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "MIT",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct mit license header", () => {
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `/*
 * MIT License
 *
 * Copyright (c) 2018-${new Date().getFullYear()} Kim Nordmo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */`
        );
      });
    });

    describe("MPL-2.0", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "MPL-2.0",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct mozilla 2.0 license header", () => {
        assert.fileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */`
        );
      });
    });

    describe("Unlicense", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "Unlicense",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct The Unlicense header", () => {
        assert.equalsFileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `namespace Cake.TestApp
{
    using System;
    using Cake.Core.Tooling;

    public sealed class TestAppSettings : ToolSettings
    {
    }
}
`
        );
      });
    });

    describe("WTFPL", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              licenseType: "WTFPL",
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should generate correct WTFPL license header", () => {
        assert.equalsFileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `namespace Cake.TestApp
{
    using System;
    using Cake.Core.Tooling;

    public sealed class TestAppSettings : ToolSettings
    {
    }
}
`
        );
      });
    });

    describe("License Disabled", () => {
      let workDir = "";
      beforeAll(() => {
        return helpers
          .run(generatorDir)
          .withPrompts(
            getPromptConfig({
              description: "Cake addin generation test",
              enableWyam: false,
              useLicenseHeaders: false,
            })
          )
          .withOptions({
            "skip-dotnet": true,
            "start-year": 2018,
          })
          .inTmpDir((dir) => (workDir = dir));
      });

      it("should not generate license headers when disabled", () => {
        assert.equalsFileContent(
          path.join(workDir, "src", "Cake.TestApp", "TestAppSettings.cs"),
          `namespace Cake.TestApp
{
    using System;
    using Cake.Core.Tooling;

    public sealed class TestAppSettings : ToolSettings
    {
    }
}
`
        );
      });
    });
  });
});
