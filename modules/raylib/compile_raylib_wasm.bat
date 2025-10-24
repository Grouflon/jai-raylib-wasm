pushd raylib\\src
make -e PLATFORM=PLATFORM_WEB -B
xcopy libraylib.web.a ..\\..\\wasm\\raylib.a /Y
popd

rem pushd raylib\\src
rem clang --target=wasm64 -mbulk-memory -c rcore.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c rshapes.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c rtextures.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c rtext.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c utils.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c rmodels.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem clang --target=wasm64 -mbulk-memory -c raudio.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
rem llvm-ar rcv raylib.a rcore.o rshapes.o rtextures.o rtext.o utils.o  rmodels.o raudio.o
rem xcopy raylib.a ..\\..\\wasm\\raylib.a /Y
rem popd