#load nuget:?package=Cake.Recipe&version=2.0.1

Environment.SetVariableNames();

BuildParameters.SetParameters(
    context: Context,
    buildSystem: BuildSystem,
    sourceDirectoryPath: "./src",
    title: "Cake.TestApp",
    repositoryOwner: "AdmiringWorm",
    repositoryName: "Cake.TestApp",
    shouldRunDotNetCorePack: true);

BuildParameters.PrintParameters(Context);

ToolSettings.SetToolSettings(context: Context);

Build.RunDotNetCore();
