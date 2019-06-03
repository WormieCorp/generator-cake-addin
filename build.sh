#!/bin/sh

runsetup() {
    echo "Compiling gulp build file..."
    yarn setup || exit $?
}

runinstall() {
    echo "Installing generator dependencies..."
    yarn install --frozen-lockfile || exit $?
}

runbuild() {
    echo "Building generators..."
    yarn build || exit $?
}

runtest() {
    echo "Running unit tests..."
    if [ "$CI" = "true" ]; then
        yarn test --coverage --ci || exit $?
    else
        yarn test || exit $?
    fi
}

runpack() {
    rm *.tgz
    yarn pack || exit $?
}

installgenerator() {
    find ~+ -name "*.tgz" -exec yarn global add {} --force \; || exit $?
}

uninstallGenerator() {
    yarn global remove generator-cake-addin || exit $?
}

BUILD="FALSE"
PACK="FALSE"
TEST="FALSE"
INSTALL="FALSE"
UNINSTALL="FALSE"

arguments=$@

if [ -z "$arguments" ]; then
    arguments="--build --test"
fi
for i in $arguments; do
    case $i in
    --build)
        BUILD="TRUE"
        PACK="TRUE"
        ;;
    --tests | --test)
        TEST="TRUE"
        ;;
    --install)
        INSTALL="TRUE"
        if [ ! -f *.tgz ]; then
            BUILD="TRUE"
            PACK="TRUE"
        fi
        ;;
    --uninstall)
        UNINSTALL="TRUE"
        ;;
    --pack)
        PACK="TRUE"
        ;;
    --no-pack)
        PACK="FALSE"
        ;;
    esac
done

if [ "$BUILD" = "TRUE" ]; then
    runinstall && runsetup && runbuild
fi

if [ "$PACK" = "TRUE" ]; then
    runpack
fi

if [ "$TEST" = "TRUE" ]; then
    runtest
fi

if [ "$INSTALL" = "TRUE" ]; then
    installgenerator
fi

if [ "$UNINSTALL" = "TRUE" ]; then
    uninstallGenerator
fi
