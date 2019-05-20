using Cake.Core;
using Cake.Core.Annotations;
using Cake.Core.IO;

namespace Cake.<%= projectName %>
{
    [CakeAliasCategory("<%= projectName %>")]
    public static class <%= projectName %>Aliases
    {
        [CakeMethodAlias]
        public static void <%= projectName %> (this ICakeContext context)
        {
            <%= projectName %>(context, new <%= projectName %>Settings());
        }

        [CakeMethodAlias]
        public static void <%= projectName %> (this ICakeContext context, <%= projectName %>Settings settings)
        {
            var runner = new <%= projectName %>Runner(
                context.FileSystem,
                context.Environment,
                context.ProcessRunner,
                context.Tools);
            runner.Run(settings);
        }
    }
}
