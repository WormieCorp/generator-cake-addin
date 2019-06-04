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
