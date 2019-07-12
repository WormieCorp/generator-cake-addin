let hooks = {
  "pre-commit": "lint-staged",
};

if (process.env.TRAVIS !== "true") {
  //hooks["commit-msg"] = "commitlint -E HUSKY_GIT_PARAMS";
}

module.exports = {
  hooks: hooks,
};
