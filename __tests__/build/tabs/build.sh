#!/usr/bin/env bash

# This bootstrapper is simple on purpose,
# it is only being provided as a convenience.

SCRIPT_NAME="recipe.cake"

echo "Restoring .NET Core Tools"
dotnet tool restore

echo "Bootstrapping Cake"
dotnet cake $SCRIPT_NAME --bootstrap

echo "Running Cake Build script"
dotnet cake $SCRIPT_NAME "$@"
