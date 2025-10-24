
// clang --target=wasm64 -mbulk-memory -c rcore.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c rshapes.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c rtextures.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c rtext.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c utils.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c rmodels.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include
// clang --target=wasm64 -mbulk-memory -c raudio.c -DPLATFORM_WEB -DGRAPHICS_API_OPENGL_ES2 -Os -I. -Iexternal/glfw/include -Iexternal/glfw/include -I%EMSDK%/upstream/emscripten/cache/sysroot/include

raylib_files: = string.[
    "rcore.c",
    "rshapes.c",
    "rtextures.c",
    "rtext.c",
    "utils.c",
    "rmodels.c",
    "raudio.c",
];

#run {
    set_build_options_dc(.{do_output = false});

    for file: raylib_files
    {
        command: = string.[
            "clang",
            "--target=wasm64",
            "-mbulk-memory",
            "-c",
            file,
            "-DPLATFORM_WEB_JAI",
            "-DGRAPHICS_API_OPENGL_ES2",
            "-Os",
            "-I.",
            "-I../jai_include",
        ];
        run_command(..command, "src", capture_and_return_output= true, print_captured_output= true);

        log("%", file);
    }
}

#import "Basic";
#import "Compiler";
#import "Process";
