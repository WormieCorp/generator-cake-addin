import { TrimFilter } from "./trim-filter";

export class PrefixFilter extends TrimFilter {
  constructor(private _prefix: string) {
    super();
    this.filter = this.filter.bind(this);
  }

  public filter(input: string) {
    let result = super.filter(input);
    if (!result) {
      return result;
    }

    while (result.startsWith(this._prefix)) {
      result = result.substr(this._prefix.length);
    }

    return result;
  }
}
