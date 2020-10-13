# This bootstrapper is simple on purpose,
# it is only being provided as a convenience.

$ErrorActionPreference = 'Stop'

$SCRIPT_NAME = "recipe.cake"

Write-Host "Restoring .NET Core Tools"
dotnet tool restore
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Bootstrapping Cake"
dotnet cake $SCRIPT_NAME --bootstrap
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Running Cake Build script"
dotnet cake $SCRIPT_NAME @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
