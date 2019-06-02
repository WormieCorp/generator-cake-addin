/*!
 * generator-cake-addin - Get you bootstrapped for creating cake addins.
 * Copyright (C) 2019 Kim J. Nordmo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/** Simple path utility. */
export abstract class PathUtils {
  /**
   * A simple normalizer that will replace Windows specific directory separators
   * Can optionally make sure that either a prefix, or a suffix is used.
   */
  public static normalizePath(
    path: string,
    prefix: string | null = null,
    suffix: string | null = null
  ) {
    if (!path || path.length === 0) {
      return path;
    }

    let newPath = path.replace(/\\/g, "/").replace(/(^\.?\/+|\/+$)/g, "");
    if (prefix && !newPath.startsWith(prefix)) {
      newPath = prefix + newPath;
    }
    if (suffix && !newPath.endsWith(suffix)) {
      newPath = newPath + suffix;
    }

    return newPath;
  }
}
