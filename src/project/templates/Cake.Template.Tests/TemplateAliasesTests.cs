namespace Cake.<%= projectName %>.Tests
{
    using System;
    using Cake.Core;
    using Cake.Core.IO;
    using Cake.Testing;
<%
switch (unitTestLibrary) {
    case "xunit": -%>
    using Xunit;
<%      break
    case "nunit": -%>
    using NUnit.Framework;
<%      break } -%>
<% if (unitTestLibrary === "nunit") { %>
    [TestFixture]
    [TestOf(typeof(<%= projectName %>Aliases))]<% } %>
    public class <%= projectName %>AliasesTests
    {
        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
<% switch (unitTestLibrary) {
    case "xunit": -%>
            Assert.True(false, "More unit tests need to be implemented for aliases class");
<%      break
    case "nunit": -%>
            Assert.That(false, Is.True, "More unit tests need to be implemented for aliases class");
<%      break
} -%>
        }
    }
}
