namespace Cake.<%= projectName %>.Tests
{
    using System;
    using Cake.Core;
    using Cake.Core.IO;
    using Cake.Testing;
    <%
switch (unitTestLibrary) {
    case "xunit": %>using Xunit;
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>

    public class <%= projectName %>AliasesTests
    {
        [Fact]
        public void Need_More_Unit_Test_Implementations()
        {
            <%
switch (unitTestLibrary) {
    case "xunit": %>Assert.True(false, "More unit tests need to be implemented for aliases class");;
<%      break
    default: throw Error("Unknown testing library: " + unitTestLibrary);
        break
} -%>
        }
    }
}
