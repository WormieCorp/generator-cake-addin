/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

namespace Cake.TestApp.Tests
{
    using Cake.Testing.Fixtures;

    public class TestAppRunnerFixture : ToolFixture<TestAppSettings>
    {
        public TestAppRunnerFixture()
            : base("TestApp.exe")
        {
        }

        protected override void RunTool()
        {
            var tool = new TestAppRunner(FileSystem, Environment, ProcessRunner, Tools);
            tool.Run(Settings);
        }
    }
}
