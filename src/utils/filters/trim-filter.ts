import { IFilter } from "./ifilter";

export class TrimFilter implements IFilter {
  public filter(input: string) {
    return input.trim();
  }
}
