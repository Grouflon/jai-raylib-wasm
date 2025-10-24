wasmBinaryFile = "jai-raylib-wasm.wasm";

Module.instantiateWasm = async function(imports, successCallback)
{
    console.log(imports);
    imports.env.set_update_function = function(f)
    {
        console.log(f);
        // wasmExports.__indirect_function_table
    }

    imports.env.wasm_debug_break = function()
    {
        console.log("wasm_debug_break");
    }

    imports.env.wasm_write_string = function()
    {
        console.log("wasm_write_string");
    }

    imports.env.memcmp = function()
    {
        console.log("memcmp");
    }

    imports.env.cosf = function()
    {
        console.log("cosf");
    }

    imports.env.acosf = function()
    {
        console.log("acosf");
    }

    imports.env.asinf = function()
    {
        console.log("asinf");
    }

    imports.env.sinf = function()
    {
        console.log("sinf");
    }

    imports.env.tan = function()
    {
        console.log("tan");
    }

    imports.env.atan2f = function()
    {
        console.log("atan2f");
    }

    imports.env.roundf = function()
    {
        console.log("roundf");
    }

    imports.env.fmaxf = function()
    {
        console.log("fmaxf");
    }

    imports.env.fminf = function()
    {
        console.log("fminf");
    }

    imports.env.pow = function()
    {
        console.log("pow");
    }

    imports.env.powf = function()
    {
        console.log("powf");
    }

    imports.env.calloc = function()
    {
        console.log("calloc");
    }

    imports.env.realloc = function()
    {
        console.log("realloc");
    }

    imports.env.strlen = function()
    {
        console.log("strlen");
    }

    imports.env.strcpy = function()
    {
        console.log("strcpy");
    }

    imports.env.strcmp = function()
    {
        console.log("strcmp");
    }

    imports.env.strstr = function()
    {
        console.log("strstr");
    }

    imports.env.strchr = function()
    {
        console.log("strchr");
    }

    imports.env.strrchr = function()
    {
        console.log("strrchr");
    }

    imports.env.strncpy = function()
    {
        console.log("strncpy");
    }

    imports.env.siprintf = function()
    {
        console.log("siprintf");
    }

    imports.env.snprintf = function()
    {
        console.log("snprintf");
    }

    imports.env.iprintf = function()
    {
        console.log("iprintf");
    }

    imports.env.log = function()
    {
        console.log("log");
    }

    imports.env.logf = function()
    {
        console.log("logf");
    }

    imports.env.exp2f = function()
    {
        console.log("exp2f");
    }

    imports.env.fmodf = function()
    {
        console.log("fmodf");
    }

    imports.env.opendir = function()
    {
        console.log("opendir");
    }

    imports.env.closedir = function()
    {
        console.log("closedir");
    }

    imports.env.mkdir = function()
    {
        console.log("mkdir");
    }

    imports.env.chdir = function()
    {
        console.log("chdir");
    }

    imports.env.fgets = function()
    {
        console.log("fgets");
    }

    imports.env.feof = function()
    {
        console.log("feof");
    }

    imports.env.fwrite = function()
    {
        console.log("fwrite");
    }

    imports.env.fgetc = function()
    {
        console.log("fgetc");
    }

    imports.env.ungetc = function()
    {
        console.log("ungetc");
    }

    imports.env.frexp = function()
    {
        console.log("frexp");
    }

    imports.env.qsort = function()
    {
        console.log("qsort");
    }

    imports.env.acos = function()
    {
        console.log("acos");
    }

    imports.env.vsnprintf = function()
    {
        console.log("vsnprintf");
    }

    imports.env.fputs = function()
    {
        console.log("fputs");
    }

    imports.env.cos = function()
    {
        console.log("cos");
    }

    imports.env.__small_sprintf = function()
    {
        console.log("__small_sprintf");
    }

    imports.env.fflush = function()
    {
        console.log("fflush");
    }

    imports.env.ferror = function()
    {
        console.log("ferror");
    }

    imports.env.fread = function()
    {
        console.log("fread");
    }

    imports.env.hypotf = function()
    {
        console.log("hypotf");
    }

    imports.env.hypot = function()
    {
        console.log("hypot");
    }

    imports.env.fmax = function()
    {
        console.log("fmax");
    }

    imports.env.sscanf = function()
    {
        console.log("sscanf");
    }

    imports.env.fopen = function()
    {
        console.log("fopen");
    }

    imports.env.fseek = function()
    {
        console.log("fseek");
    }

    imports.env.ftell = function()
    {
        console.log("ftell");
    }

    imports.env.fclose = function()
    {
        console.log("fclose");
    }

    imports.env.readdir = function()
    {
        console.log("readdir");
    }

    imports.env.stat = function()
    {
        console.log("stat");
    }

    imports.env.glfwSetWindowAttrib = function()
    {
        console.log("glfwSetWindowAttrib");
    }

    imports.env.glfwGetWindowAttrib = function()
    {
        console.log("glfwGetWindowAttrib");
    }

    imports.env.glfwSetWindowSize = function()
    {
        console.log("glfwSetWindowSize");
    }

    imports.env.glfwSetCursorPos = function()
    {
        console.log("glfwSetCursorPos");
    }

    imports.env.glfwGetProcAddress = function()
    {
        console.log("glfwGetProcAddress");
    }

    imports.env.emscripten_request_pointerlock = function()
    {
        console.log("emscripten_request_pointerlock");
    }

    imports.env.emscripten_exit_pointerlock = function()
    {
        console.log("emscripten_exit_pointerlock");
    }

    imports.env.emscripten_run_script = function()
    {
        console.log("emscripten_run_script");
    }

    imports.env.clock_gettime = function()
    {
        console.log("clock_gettime");
    }

    imports.env.getcwd = function()
    {
        console.log("getcwd");
    }

    imports.env.time = function()
    {
        console.log("time");
    }

    imports.env.nanosleep = function()
    {
        console.log("nanosleep");
    }

    imports.env.strpbrk = function()
    {
        console.log("strpbrk");
    }

    imports.env.access = function()
    {
        console.log("access");
    }

    imports.env.glTexParameterf = Module._emscripten_glTexParameterf;
    imports.env.glBindFramebuffer = Module._emscripten_glBindFramebuffer;
    imports.env.glDepthMask = Module._emscripten_glDepthMask;
    imports.env.glColorMask = Module._emscripten_glColorMask;
    imports.env.glScissor = Module._emscripten_glScissor;
    imports.env.glLineWidth = Module._emscripten_glLineWidth;
    imports.env.glGetError = Module._emscripten_glGetError;
    imports.env.glBlendEquation = Module._emscripten_glBlendEquation;
    imports.env.glBlendFuncSeparate = Module._emscripten_glBlendFuncSeparate;
    imports.env.glBlendEquationSeparate = Module._emscripten_glBlendEquationSeparate;
    imports.env.glGenRenderbuffers = Module._emscripten_glGenRenderbuffers;
    imports.env.glBindRenderbuffer = Module._emscripten_glBindRenderbuffer;
    imports.env.glRenderbufferStorage = Module._emscripten_glRenderbufferStorage;
    imports.env.glTexSubImage2D = Module._emscripten_glTexSubImage2D;
    imports.env.glGenerateMipmap = Module._emscripten_glGenerateMipmap;
    imports.env.glGenFramebuffers = Module._emscripten_glGenFramebuffers;
    imports.env.glFramebufferTexture2D = Module._emscripten_glFramebufferTexture2D;
    imports.env.glGetFramebufferAttachmentParameteriv = Module._emscripten_glGetFramebufferAttachmentParameteriv;
    imports.env.glDeleteRenderbuffers = Module._emscripten_glDeleteRenderbuffers;
    imports.env.glDeleteFramebuffers = Module._emscripten_glDeleteFramebuffers;
    imports.env.glFramebufferRenderbuffer = Module._emscripten_glFramebufferRenderbuffer;
    imports.env.glCheckFramebufferStatus = Module._emscripten_glCheckFramebufferStatus;
    imports.env.glUniform1fv = Module._emscripten_glUniform1fv;
    imports.env.glUniform2fv = Module._emscripten_glUniform2fv;
    imports.env.glUniform3fv = Module._emscripten_glUniform3fv;
    imports.env.glUniform4fv = Module._emscripten_glUniform4fv;
    imports.env.glUniform1iv = Module._emscripten_glUniform1iv;
    imports.env.glUniform2iv = Module._emscripten_glUniform2iv;
    imports.env.glUniform3iv = Module._emscripten_glUniform3iv;
    imports.env.glUniform4iv = Module._emscripten_glUniform4iv;
    imports.env.glVertexAttrib1fv = Module._emscripten_glVertexAttrib1fv;
    imports.env.glVertexAttrib2fv = Module._emscripten_glVertexAttrib2fv;
    imports.env.glVertexAttrib3fv = Module._emscripten_glVertexAttrib3fv;
    imports.env.glVertexAttrib4fv = Module._emscripten_glVertexAttrib4fv;

    var response = fetch(wasmBinaryFile, { credentials: 'same-origin' });
    var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
    console.log(instantiationResult);
    successCallback(instantiationResult.instance);
    return instantiationResult.instance.exports;
}