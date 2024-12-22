main :: ()
{
    print("Hello, Sailor!\n");

    rl.InitWindow(800, 600, "raylib example");
    rl.SetTargetFPS(60);

    while !rl.WindowShouldClose()
    {
        rl.BeginDrawing();

        rl.ClearBackground(rl.RAYWHITE);
        rl.DrawText("Congrats! You created your first window!", 190, 200, 20, rl.LIGHTGRAY);

        rl.EndDrawing();
    }

    rl.CloseWindow();

    print("Bye!\n");

}

#import "Basic";
rl :: #import "raylib";