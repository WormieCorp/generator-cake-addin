export abstract class PathUtils {
  public static normalizePath(
    path: string,
    prefix: string | null = null,
    suffix: string | null = null
  ) {
    if (!path || path.length === 0) {
      return path;
    }

    let newPath = path.replace("\\", "/").replace(/(^\.?\/|\/+$)/, "");
    if (prefix && !newPath.startsWith(prefix)) {
      newPath = prefix + newPath;
    }
    if (suffix && !newPath.endsWith(suffix)) {
      newPath = newPath + suffix;
    }

    return newPath;
  }
}
