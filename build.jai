BUILD_NAME :: "wasm-playground";
BUILD_OUTPUT_ROOT :: "bin";

build_type_to_name :: (build_type: Operating_System_Tag) -> string
{
    if build_type == {
        case .WINDOWS; return "windows";
        case .WASM; return "wasm";
    }
    return "";
}

#run {
    set_build_options_dc(.{do_output = false});
    args := get_build_options().compile_time_command_line;

    wasm := array_find(args, "wasm");
    run := array_find(args, "run");

    w := compiler_create_workspace(BUILD_NAME);
    build_type: Operating_System_Tag = .WINDOWS;
    if wasm { build_type = .WASM; }

    output_path: = tprint("%/%", BUILD_OUTPUT_ROOT, build_type_to_name(build_type));
    make_directory_if_it_does_not_exist(output_path, recursive = true);

    options := get_build_options(w);
    copy_commonly_propagated_fields(get_build_options(), *options);

    options.output_type                         = .EXECUTABLE;
    options.backend                             = .LLVM; // WASM only works with the LLVM backend, obviously.
    options.os_target                           = build_type;
    options.cpu_target                          = .CUSTOM;
    options.emit_debug_info                     = .DWARF;
    options.backtrace_on_crash                  = .OFF; // Runtime_Support_Crash_Handler doesn’t support WASM (yet?)
    options.output_path                         = output_path;
    options.output_executable_name              = BUILD_NAME;
    options.llvm_options.enable_split_modules   = false;
    options.llvm_options.function_sections      = true; // To get around "LLVM ERROR: section already has a defining function: .text"

    import_paths: [..]string;
    // Add our own modules folder first so that we can override modules with our own version, if necessary.
    array_add(*import_paths, tprint("%modules", #filepath));
    for options.import_path array_add(*import_paths, it);
    options.import_path = import_paths;

    if build_type ==
    {
        case .WINDOWS;
        {

        }
        case .WASM;
        {
            // This was compiled from https://github.com/wingo/walloc via "clang -Oz --target=wasm64 -nostdlib -c -o walloc.o walloc.c".
            // We should probably port this allocator to Jai instead…
            //  -rluba, 2023-11-15
            walloc_object_file_path := "walloc.o";

            STACK_SIZE :: 24 * 1024;
            options.additional_linker_arguments = .[
                "--stack-first", "-z", tprint("stack-size=%", STACK_SIZE),
                "--export-table",
                "--export-all",
                walloc_object_file_path
            ];

            options.llvm_options.target_system_features = "+bulk-memory"; // "This options is needed so that "memcpy" and "memset" are mapped to "memory.copy" and "memory.fill" instructions in WASM.

            // Replace the default allocator with Walloc (https://github.com/wingo/walloc).
            remap_import(w, "*", "Default_Allocator", "Walloc");
        } 
    }

    set_build_options(options, w);



    error_count: = 0;
    compiler_begin_intercept(w);
    add_build_file("main.jai", w);

    while true
    {
        message := compiler_wait_for_message();
        if message.kind ==
        {
            case .ERROR;
                error_count += 1;

            case .TYPECHECKED;
                typechecked := cast(*Message_Typechecked) message;
                for body: typechecked.procedure_bodies {
                    header := body.expression.header;
                    // You could replace individual procedure bodies here, if you needed to.
                }

            case .COMPLETE;
                mc := cast(*Message_Complete) message;
                if mc.error_code != .NONE 
                {
                    error_count += 1;
                }
                break;
        }
    }

    compiler_end_intercept(w);
    if error_count != 0
    {
        log(tprint("Compilation failed with % error% :@", error_count, ifx error_count > 1 then "s" else ""));
        return;
    }
    log("Compilation completed without error :)");

    if build_type == .WINDOWS
    {
        // Copy raylib dll
        copy_file("modules/raylib/windows/raylib.dll", tprint("%/raylib.dll", output_path));
        copy_file("modules/raylib/windows/raylib.pdb", tprint("%/raylib.pdb", output_path));

        if run
        {
            exe_path: = tprint("%/%.exe", output_path, BUILD_NAME);
            result, output_string: = run_command(exe_path, capture_and_return_output= true);
            print("\n");
            log(output_string);
        }
    }
}

#import "Basic";
#import "Compiler";
#import "File";
#import "Process";
#import "File_Utilities";
