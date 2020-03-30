param(
    [Parameter(Position = 0, Mandatory = $false, ValueFromRemainingArguments = $true)]
    [string[]]$ScriptArgs = @("--build", "--tests")
)

$ErrorActionPreference = 'Stop'

function UpdateAppveyorBuildVersion {
    $pkgJson = Get-Content -Raw -Encoding utf8 -LiteralPath "package.json" | ConvertFrom-Json
    $buildVersion = $env:APPVEYOR_BUILD_NUMBER
    $commitSha = $env:APPVEYOR_REPO_COMMIT

    $newVersion = "$($pkgJson.version)+build.$buildVersion.sha.$commitSha"

    try {
        Update-AppveyorBuild -Version $newVersion
    }
    catch {
        Write-Warning "Unable to update build version, ignoring..."
    }
}

function runSetup() {
    "Compiling gulp build file..."
    yarn setup
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function runInstall() {
    "Installing generator dependencies..."
    yarn install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function runBuild() {
    "Building generator..."
    yarn build
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function runTest() {
    "Running unit tests..."
    $arguments = @(
        "test"
        "--reporters=default"
        if ($env:CI -ieq "true") { "--reporters=jest-junit"; "--coverage"; "--ci" }
    )
    yarn @arguments
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function runPack() {
    "Creating npm package..."
    Remove-Item "*.tgz"
    yarn pack
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function installGenerator() {
    "Installing cake addin generator..."
    npm install --global "$(Get-Item "*.tgz" | Select-Object -ExpandProperty FullName)"
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
}

function uninstallGenerator() {
    "Uninstalling cake addin generator..."
    npm uninstall --global generator-cake-addin
    if ($LASTEXITCODE -ne 0) {
        exit($LASTEXITCODE)
    }
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
