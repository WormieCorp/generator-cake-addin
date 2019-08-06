import { TransformCallback } from "stream";
import * as through from "through2";
import { BufferFile } from "vinyl";

function transformContent(lines: string[], indentation: string): string[] {
  const results = [];
  for (let i = 0, len = lines.length; i < len; i++) {
    const line = lines[i];
    let newLine = "";
    for (const c of line) {
      if (c === "\t") {
        newLine += indentation;
      } else {
        newLine += c;
      }
    }

    results.push(newLine);
  }

  return results;
}

export interface IIndentOptions {
  tabs?: boolean;
  amount?: number;
}

export const indentStream = (
  options: IIndentOptions = { amount: 4, tabs: false }
) => {
  if (options.tabs === undefined) {
    options.tabs = false;
  }

  if (options.tabs) {
    options.amount = 1;
  } else if (options.amount === undefined || options.amount <= 0) {
    options.amount = 4;
  }

  return through.obj(function(
    file: BufferFile,
    _enc: string,
    done: TransformCallback
  ) {
    if (file.isNull()) {
      this.push(file);
      return done();
    }

    if (file.isStream()) {
      this.emit(
        "error",
        new Error("Stream content is not supported for indent-stream.")
      );
      return done();
    }

    if (file.isBuffer()) {
      const character = options.tabs ? "\t" : " ";
      let indentation = "";
      for (let i = 0; i < (options.amount as number); i++) {
        indentation += character;
      }
      const lines = transformContent(
        file.contents.toString().split("\n"),
        indentation
      );
      file.contents = Buffer.from(lines.join("\n"));
      this.push(file);
    }

    return done();
  });
};
