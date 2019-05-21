import del from "del";
import { dest, parallel, series, src, watch as gulpWatch } from "gulp";
import { check } from "gulp-prettier";
import { init, write } from "gulp-sourcemaps";
import gtslint from "gulp-tslint";
import { createProject, Project } from "gulp-typescript";
import merge from "merge-stream";
import { Linter } from "tslint";
import tsc from "typescript";

let tsProject: Project;
createTsProject(null);

function createTsProject(cb: any) {
  tsProject = createProject("tsconfig.json", {
    declaration: true,
    typescript: tsc,
  });
  if (cb) {
    cb();
  }
}

export function clean() {
  return del(["generators/**", "types/*", "!types/gulp-prettier.d.ts"]);
}

export function pretty() {
  return src([
    "gulpfile.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yml",
    "!node_modules{,/**}",
    "!generators{,/**}",
    "!coverage/{,/**}",
  ]).pipe(check());
}

export function lint() {
  const program = Linter.createProgram("tsconfig.json");
  return src("{src,__tests__}/**/*.ts")
    .pipe(check())
    .pipe(
      gtslint({
        formatter: "stylish",
        program,
      })
    )
    .pipe(
      gtslint.report({
        allowWarnings: true,
      })
    );
}

function exportTemplatesTask() {
  return src("src/**/templates/**").pipe(dest("generators"));
}

function compileTypescript() {
  const tsResult = src("src/**/*.ts")
    .pipe(init())
    .pipe(tsProject());
  return merge([
    src("src/**/*.d.ts"),
    tsResult.dts,
    tsResult.js.pipe(write(".")),
  ]).pipe(dest("generators"));
}

function watchTask() {
  gulpWatch("src/**/*.ts", series(lint, compileTypescript));
  gulpWatch("__tests__/**/*.ts", lint);
  gulpWatch("src/**/templates/**", exportTemplatesTask);
  gulpWatch(
    ["tsconfig.json", "tslint.json"],
    series(createTsProject, lint, pretty, compileTypescript)
  );
  gulpWatch(
    [
      "gulpfile.ts",
      "**/*.json",
      "**/*.md",
      "**/*.yml",
      "!node_modules{,/**}",
      "!tsconfig.json",
      "!tslint.json",
      "!generators{,/**}",
      "!coverage/{,/**}",
    ],
    pretty
  );
}

export const build = series(
  parallel(clean, lint, pretty),
  parallel(compileTypescript, exportTemplatesTask)
);
export const watch = series(build, watchTask);
export default build;
