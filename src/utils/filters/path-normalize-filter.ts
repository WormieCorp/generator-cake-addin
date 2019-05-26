import { PathUtils } from "../file-utils";
import { IFilter } from "./ifilter";

export class PathNormalizeFilter implements IFilter {
  constructor(private _prefix?: string, private _suffix?: string) {
    this.filter = this.filter.bind(this);
  }

  public filter(input: string) {
    return PathUtils.normalizePath(input, this._prefix, this._suffix);
  }
}
