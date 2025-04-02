
let allocated; // A global reference of the WASM’s memory area so that we can look up pointers
function allocatedU8() { return new Uint8Array(allocated.buffer); }
let function_table;
let exports;
let native_functions = {};

let update_frame;
let previous_timestamp;

const text_decoder = new TextDecoder();
function jai_string_to_js_string(pointer, length) {
    const bytes = allocatedU8().subarray(Number(pointer), Number(pointer) + Number(length));
    return text_decoder.decode(bytes);
}

function c_string_to_js_string(pointer) {
    pointer = Number(pointer);
    var len = Number(strlen(pointer));

    return text_decoder.decode(allocatedU8().subarray(pointer, pointer + len));
}

function strlen(pointer, max_size = 256)
{
    pointer = Number(pointer);
    end = pointer;
    while (allocatedU8()[end] != 0 && end < pointer + max_size) { ++end; }
    return BigInt(end - pointer);
}

// These are all the functions that we declared as "#foreign" in our Jai code.
// They let you interact with the JS and DOM world from within Jai.
// If you forget to implement one, the Proxy below will log a nice error.
const exported_js_functions =
{
    wasm_write_string: (s_count, s_data, to_standard_error) => {
        const string = jai_string_to_js_string(s_data, s_count);
        console.log(string);
    },
    wasm_debug_break: () => {
        debugger;
    },
    set_update_function: (f) => {
        update_frame = function_table.get(Number(f));
    },
}

function frame(timestamp) {
    var dt = timestamp - previous_timestamp;
    previous_timestamp = timestamp;
    update_frame(dt);
    window.requestAnimationFrame(frame);
}

// Backend
var backend_exports =
{
    strlen: strlen,
    strcpy: (dest, source) => {
        return native_functions.strcpy(dest, source);
    },

    // strcpy: function(dest, source)
    // {
    //     console.log("strcpy", dest, source);
    //     return dest;
    // },

    glfwSetErrorCallback: function(cbfun)
    {
        console.log("glfwSetErrorCallback", cbfun);
        return cbfun;
    },

    glfwInit: function()
    {
        console.log("glfwInit");
        return 1;
    },

    glfwDefaultWindowHints: function()
    {
        console.log("glfwDefaultWindowHints");
    },

    glfwWindowHint: function(hint)
    {
        console.log("glfwDefaultWindowHints", hint);
    },

    glfwCreateWindow: function(width, height, title, monitor, share)
    {
        console.log("glfwCreateWindow", width, height, c_string_to_js_string(title), monitor, share);
        return 1n;
    },

    glfwSetWindowSizeCallback: function(window_handle, f)
    {
        console.log("glfwSetWindowSizeCallback", window_handle, f);
        return f;
    },

    glfwSetWindowIconifyCallback: function(window_handle, f)
    {
        console.log("glfwSetWindowIconifyCallback", window_handle, f);
        return f;
    },

    glfwSetWindowFocusCallback: function(window_handle, f)
    {
        console.log("glfwSetWindowFocusCallback", window_handle, f);
        return f;
    },

    glfwSetDropCallback: function(window_handle, f)
    {
        console.log("glfwSetDropCallback", window_handle, f);
        return f;
    },

    glfwSetKeyCallback: function(window_handle, f)
    {
        console.log("glfwSetKeyCallback", window_handle, f);
        return f;
    },

    glfwSetCharCallback: function(window_handle, f)
    {
        console.log("glfwSetCharCallback", window_handle, f);
        return f;
    },

    glfwSetMouseButtonCallback: function(window_handle, f)
    {
        console.log("glfwSetMouseButtonCallback", window_handle, f);
        return f;
    },

    glfwSetCursorPosCallback: function(window_handle, f)
    {
        console.log("glfwSetCursorPosCallback", window_handle, f);
        return f;
    },

    glfwSetScrollCallback: function(window_handle, f)
    {
        console.log("glfwSetScrollCallback", window_handle, f);
        return f;
    },

    glfwSetCursorEnterCallback: function(window_handle, f)
    {
        console.log("glfwSetCursorEnterCallback", window_handle, f);
        return f;
    },

    glfwMakeContextCurrent: function(window_handle)
    {
        console.log("glfwMakeContextCurrent", window_handle);
    },

    emscripten_set_window_title: function(c_title)
    {
        const title = c_string_to_js_string(c_title);
        console.log("emscripten_set_window_title", title);
        return document.title = title;
    },

    emscripten_set_fullscreenchange_callback_on_thread: function(a, b, c, d, e)
    {
        console.log("emscripten_set_fullscreenchange_callback_on_thread", a, b, c, d, e);
    },

    emscripten_set_resize_callback_on_thread: function(a, b, c, d, e)
    {
        console.log("emscripten_set_resize_callback_on_thread", a, b, c, d, e);
    },

    emscripten_set_click_callback_on_thread: function(a, b, c, d, e)
    {
        console.log("emscripten_set_click_callback_on_thread", a, b, c, d, e);
    },

    emscripten_set_pointerlockchange_callback_on_thread: function(a, b, c, d, e)
    {
        console.log("emscripten_set_click_callback_on_thread", a, b, c, d, e);
    },

    glGetString: function(name)
    {
        console.log("glGetString", name);
        return "";
    },

    glGetFloatv: function(name, data)
    {
        console.log("glGetFloatv", name, data);
        return 0;
    },

    glBindTexture: function(target, texture)
    {
        console.log("glBindTexture", target, texture);
    },

    glPixelStorei: function(pname, param)
    {
        console.log("glPixelStorei", pname, param);
    },

    glGenTextures: function(n, textures)
    {
        console.log("glGenTextures", n, textures);
    },

    glTexImage2D: function(target, level, internalformat, width, height, border, format, type, pixels)
    {
        console.log("glTexImage2D", target, level, internalformat, width, height, border, format, type, pixels);
    },

    glTexParameteri: function(target, pname, param)
    {
        console.log("glTexParameteri", target, pname, param);
    },

    calloc: function(count, size)
    {
        console.log("calloc", count, size);
        return exports.malloc(count*size);
    },

    glCreateShader: function(type)
    {
        console.log("glCreateShader", type);
    },

    glShaderSource: function(shader, count, string, length)
    {
        console.log("glShaderSource", shader, count, string, length);
    },

    glCompileShader: function(shader)
    {
        console.log("glCompileShader", shader);
    },

    glGetShaderiv: function(shader, pname, params)
    {
        console.log("glGetShaderiv", shader, pname, params);
    },

    glCreateProgram: function()
    {
        console.log("glCreateProgram");
    },

    glAttachShader: function(program, shader)
    {
        console.log("glAttachShader", program, shader);
    },

    glBindAttribLocation: function(program, index, name)
    {
        console.log("glBindAttribLocation", program, index, name);
    },

    glLinkProgram: function(program)
    {
        console.log("glLinkProgram", program);
    },

    glGetProgramiv: function(program, pname, params)
    {
        console.log("glGetProgramiv", program, pname, params);
    },

    glDeleteProgram: function(program)
    {
        console.log("glDeleteProgram", program);
    },

    glGenBuffers: function(n, buffers)
    {
        console.log("glGenBuffers", n, buffers);
    },

    glBindBuffer: function(target, buffer)
    {
        console.log("glBindBuffer", target, buffer);
    },

    glBufferData: function(target, size, data, usage)
    {
        console.log("glBufferData", target, size, data, usage);
    },

    glEnableVertexAttribArray: function(index)
    {
        console.log("glEnableVertexAttribArray", index);
    },

    glVertexAttribPointer: function(index, size, type, normalized, stride, pointer)
    {
        console.log("glVertexAttribPointer", index, size, type, normalized, stride, pointer);
    },

    glDepthFunc: function(func)
    {
        console.log("glDepthFunc", func);
    },

    glEnable: function(cap)
    {
        console.log("glEnable", cap);
    },

    glDisable: function(cap)
    {
        console.log("glDisable", cap);
    },

    glBlendFunc: function(sfactor, dfactor)
    {
        console.log("glBlendFunc", sfactor, dfactor);
    },

    glCullFace: function(mode)
    {
        console.log("glCullFace", mode);
    },

    glFrontFace: function(mode)
    {
        console.log("glFrontFace", mode);
    },

    glClearColor: function(red, green, blue, alpha)
    {
        console.log("glClearColor", red, green, blue, alpha);
    },

    glClearDepthf: function(d)
    {
        console.log("glClearDepthf", d);
    },

    glClear: function(mask)
    {
        console.log("glClear", mask);
    },

    glViewport: function(x, y, width, height)
    {
        console.log("glViewport", x, y, width, height);
    },

    glUseProgram: function(program)
    {
        console.log("glUseProgram", program);
    },

    time: function(ptr)
    {
        console.log("time", ptr);
        return 0n;
    },

    emscripten_sleep: function(milisecond)
    {
        console.log("emscripten_sleep", milisecond);
    },

    glfwGetTime: function()
    {
        // console.log("glfwGetTime");
        return 0;
    },

    glfwSwapBuffers: function(window)
    {
        console.log("glfwSwapBuffers", window);
        return 0;
    },
    
}


// Create the environment for the WASM file,
// which includes the exported JS functions for the WASM:
const imports = {
    "env": new Proxy(Object.assign(exported_js_functions, backend_exports), {
        get(target, prop, receiver) {
            if (target.hasOwnProperty(prop)) {
                return target[prop];
            }

            return () => { throw new Error("Missing function: " + prop); };
        },
    }),
}

// Load the WASM file we compiled and run its main.
WebAssembly.instantiateStreaming(fetch("wasm-playground.wasm"), imports).then(
    (obj) => {
        console.log(obj);
        exports = obj.instance.exports;
        allocated = obj.instance.exports.memory;
        function_table = obj.instance.exports.__indirect_function_table;
        console.log(function_table);

        for (const property in exports)
        {
            if (property.indexOf("strcpy") == 0)
            {
                native_functions.strcpy = exports[property];
            }
        }

        obj.instance.exports.main(0, BigInt(0));

        Object.keys(data).filter(function(k) {
            return k.indexOf('imageIds') == 0;
        })

        window.requestAnimationFrame((timestamp) => {
            previous_timestamp = timestamp;
            window.requestAnimationFrame(frame);
        })
    }
);

// var Module = {};
// Module.instantiateWasm = function(info, successCallback)
// {
//     info.env = new Proxy(Object.assign(exported_js_functions, info.env), {
//         get(target, prop, receiver) {
//             if (target.hasOwnProperty(prop)) {
//                 return target[prop];
//             }

//             return () => { throw new Error("Missing function: " + prop); };
//         },
//     });

//     WebAssembly.instantiateStreaming(fetch("wasm-playground.wasm"), info).then(
//         (obj) => {
//             allocated = obj.instance.exports.memory;
//             allocatedU8 = new Uint8Array(allocated.buffer);
//             successCallback(obj.instance);
//         }
//     );
// }
