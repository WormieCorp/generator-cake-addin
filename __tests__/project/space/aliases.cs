/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

namespace Cake.TestApp
{
  using Cake.Core;
  using Cake.Core.Annotations;
  using Cake.Core.IO;

  [CakeAliasCategory("TestApp")]
  public static class TestAppAliases
  {
    [CakeMethodAlias]
    public static void TestApp(this ICakeContext context)
    {
      TestApp(context, new TestAppSettings());
    }

    [CakeMethodAlias]
    public static void TestApp(this ICakeContext context, TestAppSettings settings)
    {
      var runner = new TestAppRunner(
        context.FileSystem,
        context.Environment,
        context.ProcessRunner,
        context.Tools);
      runner.Run(settings);
    }
  }
}
