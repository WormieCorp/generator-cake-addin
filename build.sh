#!/bin/sh

runinstall() {
    echo "Installing generator dependencies..."
    yarn install --frozen-lockfile
}

runbuild() {
    echo "Building generators..."
    yarn build
}

runtest() {
    echo "Running unit tests..."
    if [ "$CI" = "true" ]; then
        yarn test --coverage --ci
    else
        yarn test
    fi
}

runpack() {
    rm *.tgz
    yarn pack
}

installgenerator() {
    find ~+ -name "*.tgz" -exec yarn global add {} --force \;
}

uninstallGenerator() {
    yarn global remove generator-cake-addin
}

BUILD="FALSE"
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
        ;;
    --tests | --test)
        TEST="TRUE"
        ;;
    --install)
        INSTALL="TRUE"
        if [ ! -f *.tgz ]; then
            BUILD="TRUE"
        fi
        ;;
    --uninstall)
        UNINSTALL="TRUE"
        ;;
    esac
done

if [ "$BUILD" = "TRUE" ]; then
    runinstall && runbuild && runpack
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
