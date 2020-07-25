import { PromptNames } from "./src/utils/constants/prompt-names";

const defaultConfig: { [key: string]: string | boolean | number } = {};

defaultConfig[PromptNames.ProjectName] = "TestApp";
defaultConfig[PromptNames.RepositoryOwner] = "AdmiringWorm";
defaultConfig[PromptNames.ProjectMaintainer] =
  defaultConfig[PromptNames.RepositoryOwner];
defaultConfig[PromptNames.Author] = "Kim Nordmo";
defaultConfig[PromptNames.Description] = "My Awesome Test Description";
defaultConfig[PromptNames.ShortDescription] =
  defaultConfig[PromptNames.Description];
defaultConfig[PromptNames.LicenseType] = "MIT";
defaultConfig[PromptNames.UseLicenseHeaders] = true;
defaultConfig[PromptNames.EmailAddress] = "test@app.com";
defaultConfig[PromptNames.SourceDir] = "./src";
defaultConfig[PromptNames.ScriptName] = "recipe.cake";
defaultConfig[PromptNames.UnitTestLibrary] = "xunit";
defaultConfig[PromptNames.EnableAllContributors] = false;
defaultConfig[PromptNames.EnableWyam] = true;
defaultConfig[PromptNames.EnableLinux] = false;
defaultConfig[PromptNames.EnableTravis] = false;
defaultConfig[PromptNames.EnableContributing] = false;
defaultConfig[PromptNames.UseTabs] = false;
defaultConfig[PromptNames.IndentSize] = 4;
defaultConfig[PromptNames.IndentYamlSize] = 2;

export function getPromptConfig(values?: {
  [key: string]: string | boolean | number;
}) {
  if (!values) {
    return defaultConfig;
  }
  return { ...defaultConfig, ...values };
}
