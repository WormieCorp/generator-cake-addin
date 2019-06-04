namespace Cake.<%= projectName %>.Tests
{
    using System;
    using Cake.Core;
    using Cake.Testing;
        <%
switch (unitTestLibrary) {
    case "xunit": %>using Xunit;
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>

    public class <%= projectName %>RunnerTests
    {
        [Fact]
        public void Should_Throw_If_Settings_Are_Null()
        {
            var fixture = new <%= projectName %>RunnerFixture { Settings = null };

            <%
switch (unitTestLibrary) {
    case "xunit": %>Action result = () => fixture.Run();

            Assert.Throws<ArgumentNullException>(result);
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>
        }

        [Fact]
        public void Should_Throw_If_<%= projectName %>_Executable_Was_Not_Found()
        {
            var fixture = new <%= projectName %>RunnerFixture();
            fixture.GivenDefaultToolDoNotExist();

            <%
switch (unitTestLibrary) {
    case "xunit": %>Action result = () => fixture.Run();

            var ex = Assert.Throws<CakeException>(result);
            Assert.Equal("<%= projectName %>: Could not locate executable", ex.Message);
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>
        }

        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
            <%
switch (unitTestLibrary) {
    case "xunit": %>Assert.True(false, "More unit tests need to be implemented for the runner class");;
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>
        }
    }
}
