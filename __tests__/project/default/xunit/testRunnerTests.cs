/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

namespace Cake.TestApp.Tests
{
    using System;
    using Cake.Core;
    using Cake.Testing;
    using Xunit;

    public class TestAppRunnerTests
    {
        [Fact]
        public void Should_Throw_If_Settings_Are_Null()
        {
            var fixture = new TestAppRunnerFixture { Settings = null };

            Action result = () => fixture.Run();

            Assert.Throws<ArgumentNullException>(result);
        }

        [Fact]
        public void Should_Throw_If_TestApp_Executable_Was_Not_Found()
        {
            var fixture = new TestAppRunnerFixture();
            fixture.GivenDefaultToolDoNotExist();
            const string expectedMessage = "TestApp: Could not locate executable";

            Action result = () => fixture.Run();

            var ex = Assert.Throws<CakeException>(result);
            Assert.Equal(expectedMessage, ex.Message);
        }

        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
            Assert.True(false, "More unit tests need to be implemented for the runner class");
        }
    }
}
