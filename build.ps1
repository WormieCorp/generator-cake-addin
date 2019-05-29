param(
    [Parameter(Position = 0, Mandatory = $false, ValueFromRemainingArguments = $true)]
    [string[]]$ScriptArgs = @("--build", "--tests")
)

function runInstall() {
    "Installing generator dependencies..."
    Start-Process -FilePath "yarn" -ArgumentList "install", "--frozen-lockfile" -Wait
}

function runBuild() {
    "Building generator..."
    Start-Process -FilePath "yarn" -ArgumentList "build" -Wait
}

function runTest() {
    "Running unit tests..."
    $arguments = @(
        "test"
        if ($env:CI -ieq "true") { "--coverage"; "--ci" }
    )
    Start-Process -FilePath "yarn" -ArgumentList $arguments -Wait
}

function runPack() {
    "Creating npm package..."
    Remove-Item "*.tgz"
    Start-Process -FilePath "yarn" -ArgumentList "pack", "--force" -Wait
}

function installGenerator() {
    "Installing cake addin generator..."
    Start-Process -FilePath "yarn" -ArgumentList "global", "add", (Get-Item "*.tgz" | Select-Object -ExpandProperty FullName) -Wait
}

function uninstallGenerator() {
    "Uninstalling cake addin generator..."
    Start-Process -FilePath "yarn" -ArgumentList "global", "remove", "generator-cake-addin" -Wait
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
    runInstall
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
