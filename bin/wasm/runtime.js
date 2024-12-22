
let allocated; // A global reference of the WASM’s memory area so that we can look up pointers

// These are all the functions that we declared as "#foreign" in our Jai code.
// They let you interact with the JS and DOM world from within Jai.
// If you forget to implement one, the Proxy below will log a nice error.
const exported_js_functions =
{
    wasm_write_string: (s_count, s_data, to_standard_error) => {
        const string = js_string_from_jai_string(s_data, s_count);
        console.log(string);
    },
    wasm_debug_break: () => {
        debugger;
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
        allocated = obj.instance.exports.memory;
        obj.instance.exports.main(0, BigInt(0));
    }
);

const text_decoder = new TextDecoder();
function js_string_from_jai_string(pointer, length) {
    const u8 = new Uint8Array(allocated.buffer)
    const bytes = u8.subarray(Number(pointer), Number(pointer) + Number(length));
    return text_decoder.decode(bytes);
}
