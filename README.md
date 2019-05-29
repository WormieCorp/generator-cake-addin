# generator-cake-addin

A yeoman generator to get you quickly set up for writing Cake Addins

_NOTE: This project is very much in a pre-alpha state._

However, there are currently a few generators available for testing,
and you may try them out with the following build instructions.

1. Ensure that you got both nodejs, yarn, and yo installed (Check your distro/OS on how to install these).
2. Clone the repository with `git clone https://github.com/WormieCorp/generator-cake-addin.git`.
3. Navigate to the new directory and run `./build.ps1 --install` (or `./build.sh --install` on unix).
4. Run one of the generators, the main generator can be run with the following `yo cake-addin`.

   - You may also test out one of the sub generators as well by running `yo cake-addin:subgenerator-name` (ie `yo cake-addin:appveyor`).

5. When you're done with testing, run `./build.ps1 --uninstall` (or `./build.sh --uninstall`) to remove the generator.
