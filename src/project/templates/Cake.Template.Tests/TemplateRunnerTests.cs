<% let unitTestAttribute = "";
   let usingStatements = "";
switch (unitTestLibrary) {
    case "xunit":
        unitTestAttribute = "[Fact]";
        usingStatements = "using Xunit;";
        break;
    case "nunit":
        unitTestAttribute = "[Test]";
        usingStatements = "using NUnit.Framework;";
        break
} -%>
namespace Cake.<%= projectName %>.Tests
{
    using System;
    using Cake.Core;
    using Cake.Testing;
    <%= usingStatements %>
<% if (unitTestLibrary === "nunit") { %>
    [TestFixture]
    [TestOf(typeof(<%= projectName %>Runner))]<% } %>
    public class <%= projectName %>RunnerTests
    {
        <%= unitTestAttribute %>
        public void Should_Throw_If_Settings_Are_Null()
        {
            var fixture = new <%= projectName %>RunnerFixture { Settings = null };

<% switch (unitTestLibrary) {
    case "xunit": -%>
            Action result = () => fixture.Run();

            Assert.Throws<ArgumentNullException>(result);
<%      break
    case "nunit": -%>
            Action result = () => fixture.Run();

            Assert.That(result, Throws.ArgumentNullException.With.Message.Contains("message"));
<%      break } -%>
        }

        <%= unitTestAttribute %>
        public void Should_Throw_If_<%= projectName %>_Executable_Was_Not_Found()
        {
            var fixture = new <%= projectName %>RunnerFixture();
            fixture.GivenDefaultToolDoNotExist();
            const string expectedMessage = "<%= projectName %>: Could not locate executable";

<% switch (unitTestLibrary) {
    case "xunit": -%>
            Action result = () => fixture.Run();

            var ex = Assert.Throws<CakeException>(result);
            Assert.Equal(expectedMessage, ex.Message);
<%      break
    case "nunit": -%>
            Action result = () => fixture.Run();

            Assert.That(result, Throws.TypeOf<CakeException>().With.Message.EqualTo(expectedMessage));
<%      break } -%>
        }

        <%= unitTestAttribute %>
        public void Need_More_Unit_Test_Implementations()
        {
<% switch (unitTestLibrary) {
    case "xunit": -%>
            Assert.True(false, "More unit tests need to be implemented for the runner class");
<%      break
    case "nunit": -%>
            Assert.That(false, Is.True, "More unit tests need to be implemented for the runner class");
<%      break } -%>
        }
    }
}
