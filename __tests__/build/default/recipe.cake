#load nuget#?package=Cake.Recipe&version=1.0.0

Environment.SetVariableName();

BuildParameters.SetParameters(
    context: Context,
    buildSystem: BuildSystem,
    sourceDirectoryPath: "./src",
    title: "Cake.TestApp",
    repositoryOwner: "AdmiringWorm",
    repositoryName: "Cake.TestApp",
    shouldRunGitVersion: true,
    shouldExecuteGitLink: false,
    shouldRunCodecov: true,
    shouldDeployGraphDocumentation: false,
    shouldRunDotNetCorePack: true);

BuildParameters.PrintParameters(Context);

ToolSettings.SetToolSettings(context: Context);

Build.RunDotNetCore();
