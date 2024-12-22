# Build raylib.a
- edit the Makefile in the `src` folder
    - update `EMSDK_PATH`, `PYTHON_PATH` and `NODE_PATH`
    - add `-sMEMORY64=1` and `-mbulk-memory` to `CFLAGS`
- run `make -e PLATFORM=PLATFORM_WEB -B` in the `src` folder