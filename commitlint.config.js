module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "improvement",
        "perf",
        "revert",
        "docs",
        "chore",
        "style",
        "refactor",
        "test",
        "build",
        "ci",
      ],
    ],
  },
};
