namespace Cake.TestApp
{
  using System;
  using System.Collections.Generic;
  using Cake.Core;
  using Cake.Core.IO;
  using Cake.Core.Tooling;

  public sealed class TestAppRunner : Tool<TestAppSettings>
  {
    public TestAppRunner(
      IFileSystem fileSystem,
      ICakeEnvironment environment,
      IProcessRunner processRunner,
      IToolLocator tools)
      : base(fileSystem, environment, processRunner, tools)
    {
    }

    public void Run(TestAppSettings settings)
    {
      if (settings == null)
      {
        throw new ArgumentNullException(nameof(settings));
      }

      this.Run(settings, GetArguments(settings));
    }

    protected override IEnumerable<string> GetToolExecutableNames()
    {
      yield return "TestApp.exe";
      yield return "TestApp";
    }

    protected override string GetToolName()
    {
      return "TestApp";
    }

    private static ProcessArgumentBuilder GetArguments(TestAppSettings settings)
    {
      var builder = new ProcessArgumentBuilder();

      // TODO: Add the necessary arguments based on the settings class

      return builder;
    }
  }
}
