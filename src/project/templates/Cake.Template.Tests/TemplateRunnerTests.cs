namespace Cake.<%= projectName %>.Tests
{
    using System;
    using Cake.Core;
    using Cake.Testing;
    using Xunit;

    public class <%= projectName %>RunnerTests
    {
        [Fact]
        public void Should_Throw_If_Settings_Are_Null()
        {
            var fixture = new <%= projectName %>RunnerFixture { Settings = null };

            Action result = () => fixture.Run();

            Assert.Throws<ArgumentNullException>(result);
        }

        [Fact]
        public void Should_Throw_If_<%= projectName %>_Executable_Was_Not_Found()
        {
            var fixture = new <%= projectName %>RunnerFixture();
            fixture.GivenDefaultToolDoNotExist();

            Action result = () => fixture.Run();

            var ex = Assert.Throws<CakeException>(result);
            Assert.Equal("<%= projectName %>: Could not locate executable", ex.Message);
        }

        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
            Assert.True(false, "More unit tests need to be implemented for runner class");
        }
    }
}
