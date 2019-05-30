param(
    [Parameter(Position = 0, Mandatory = $false, ValueFromRemainingArguments = $true)]
    [string[]]$ScriptArgs = @("--build", "--tests")
)

$ErrorActionPreference = 'Stop'

function UpdateAppveyorBuildVersion {
    $pkgJson = Get-Content -Raw -Encoding utf8 -LiteralPath "package.json" | ConvertFrom-Json
    $buildVersion = $env:APPVEYOR_BUILD_NUMBER

    $newVersion = "$($pkgJson.version)+build.$buildVersion"

    Update-AppveyorBuild -Version $newVersion
}

function runSetup() {
    "Compiling gulp build file..."
    yarn setup
}

function runInstall() {
    "Installing generator dependencies..."
    yarn install --frozen-lockfile
}

function runBuild() {
    "Building generator..."
    yarn build
}

function runTest() {
    "Running unit tests..."
    $arguments = @(
        "test"
        if ($env:CI -ieq "true") { "--coverage"; "--ci" }
    )
    yarn @arguments
}

function runPack() {
    "Creating npm package..."
    Remove-Item "*.tgz"
    yarn pack
}

function installGenerator() {
    "Installing cake addin generator..."
    yarn global add "$(Get-Item "*.tgz" | Select-Object -ExpandProperty FullName)"
}

function uninstallGenerator() {
    "Uninstalling cake addin generator..."
    yarn global remove generator-cake-addin
}

$BUILD = $false
$TEST = $false
$INSTALL = $false
$UNINSTALL = $false

foreach ($arg in $ScriptArgs) {
    switch ($arg) {
        "--build" { $BUILD = $true }
        { $_ -in "--test", "--tests" } { $TEST = $true }
        "--install" {
            if (!(Test-Path "*.tgz")) { $BUILD = $true }
            $INSTALL = $true
        }
        "--uninstall" { $UNINSTALL = $true }
    }
}

if ($BUILD) {
    if (Test-Path Env:\APPVEYOR) { UpdateAppveyorBuildVersion }
    runInstall
    runSetup
    runBuild
    runPack
}

if ($TEST) {
    runTest
}

if ($INSTALL) {
    installGenerator
}

if ($UNINSTALL) { uninstallGenerator }
