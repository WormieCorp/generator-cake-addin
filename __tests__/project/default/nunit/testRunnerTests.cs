namespace Cake.TestApp.Tests
{
    using System;
    using Cake.Core;
    using Cake.Testing;
    using NUnit.Framework;

    [TestFixture]
    [TestOf(typeof(TestAppRunner))]
    public class TestAppRunnerTests
    {
        [Fact]
        public void Should_Throw_If_Settings_Are_Null()
        {
            var fixture = new TestAppRunnerFixture { Settings = null };

            Action result = () => fixture.Run();

            Assert.That(result, Throws.ArgumentNullException.With.Message.Contains("message"));
        }

        [Fact]
        public void Should_Throw_If_TestApp_Executable_Was_Not_Found()
        {
            var fixture = new TestAppRunnerFixture();
            fixture.GivenDefaultToolDoNotExist();
            const string expectedMessage = "TestApp: Could not locate executable";

            Action result = () => fixture.Run();

            Assert.That(result, Throws.TypeOf<CakeException>().With.Message.EqualTo(expectedMessage));
        }

        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
            Assert.That(false, Is.True, "More unit tests need to be implemented for the runner class");
        }
    }
}
