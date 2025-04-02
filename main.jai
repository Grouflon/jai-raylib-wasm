test :: (color: rl.Color)
{
    print("%\n", color.r);
}

#if OS == .WASM
{
    UpdateFunction :: #type (float) -> void #c_call;
    set_update_function :: (f: UpdateFunction) -> void #foreign "set_update_function";

    strcpy :: (dest: *u8, source: *u8) -> *u8 #c_call
    {
        push_context {
            print("%, %\n", dest, source);
        }
        return dest;
    }
}

main :: ()
{
    print("Hello, Sailor!\n");
    test(rl.RAYWHITE);

    rl.InitWindow(800, 600, "raylib example");
    rl.SetTargetFPS(60);
    return;

    #if OS == .WASM
    {
        set_update_function(update);
        return;
    }
    else
    {
        while !rl.WindowShouldClose()
        {
            update();
        }
    }

    rl.CloseWindow();

    print("Bye!\n");
}

update :: (dt: float) #c_call
{
    push_context
    {
        print("update %\n", dt);
        rl.BeginDrawing();

        rl.ClearBackground(rl.RAYWHITE);
        rl.DrawText("Congrats! You created your first window!", 190, 200, 20, rl.LIGHTGRAY);

        rl.EndDrawing();
    }
}

#import "Basic";
rl :: #import "raylib";