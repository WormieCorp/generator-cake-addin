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
