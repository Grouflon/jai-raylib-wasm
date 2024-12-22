#scope_export

va_list :: *void;

LIGHTGRAY :: Color.{ r = 200, g = 200, b = 200, a = 255  };
GRAY :: Color.{ r = 130, g = 130, b = 130, a = 255  };
DARKGRAY :: Color.{ r = 80, g = 80, b = 80, a = 255  };
YELLOW :: Color.{ r = 253, g = 249, b = 0, a = 255  };
GOLD :: Color.{ r = 255, g = 203, b = 0, a = 255  };
ORANGE :: Color.{ r = 255, g = 161, b = 0, a = 255  };
PINK :: Color.{ r = 255, g = 109, b = 194, a = 255  };
RED :: Color.{ r = 230, g = 41, b = 55, a = 255  };
MAROON :: Color.{ r = 190, g = 33, b = 55, a = 255  };
GREEN :: Color.{ r = 0, g = 228, b = 48, a = 255  };
LIME :: Color.{ r = 0, g = 158, b = 47, a = 255  };
DARKGREEN :: Color.{ r = 0, g = 117, b = 44, a = 255  };
SKYBLUE :: Color.{ r = 102, g = 191, b = 255, a = 255  };
BLUE :: Color.{ r = 0, g = 121, b = 241, a = 255  };
DARKBLUE :: Color.{ r = 0, g = 82, b = 172, a = 255  };
PURPLE :: Color.{ r = 200, g = 122, b = 255, a = 255  };
VIOLET :: Color.{ r = 135, g = 60, b = 190, a = 255  };
DARKPURPLE :: Color.{ r = 112, g = 31, b = 126, a = 255  };
BEIGE :: Color.{ r = 211, g = 176, b = 131, a = 255  };
BROWN :: Color.{ r = 127, g = 106, b = 79, a = 255  };
DARKBROWN :: Color.{ r = 76, g = 63, b = 47, a = 255  };
WHITE :: Color.{ r = 255, g = 255, b = 255, a = 255  };
BLACK :: Color.{ r = 0, g = 0, b = 0, a = 255  };
BLANK :: Color.{ r = 0, g = 0, b = 0, a = 0  };
MAGENTA :: Color.{ r = 255, g = 0, b = 255, a = 255  };
RAYWHITE :: Color.{ r = 245, g = 245, b = 245, a = 255  };

// IsMouseButtonPressed :: (button: MouseButton) -> bool { return IsMouseButtonPressed(cast(s32) button); }
// IsMouseButtonDown :: (button: MouseButton) -> bool { return IsMouseButtonDown(cast(s32) button); }
// IsMouseButtonReleased :: (button: MouseButton) -> bool { return IsMouseButtonReleased(cast(s32) button); }
// IsMouseButtonUp :: (button: MouseButton) -> bool { return IsMouseButtonUp(cast(s32) button); }

// IsKeyPressed :: (key: KeyboardKey) -> bool { return IsKeyPressed(cast(s32) key); }
// IsKeyPressedRepeat :: (key: KeyboardKey) -> bool { return IsKeyPressedRepeat(cast(s32) key); }
// IsKeyDown :: (key: KeyboardKey) -> bool { return IsKeyDown(cast(s32) key); }
// IsKeyReleased :: (key: KeyboardKey) -> bool { return IsKeyReleased(cast(s32) key); }
// IsKeyUp :: (key: KeyboardKey) -> bool { return IsKeyUp(cast(s32) key); }
// SetExitKey :: (key: KeyboardKey) -> void { return SetExitKey(cast(s32) key); }

#scope_module

#if OS == .WINDOWS
{
    user32  :: #library,system,link_always "user32";
    winmm   :: #library,system,link_always "winmm";
    gdi32   :: #library,system,link_always "gdi32";
    shell32 :: #library,system,link_always "shell32";
    #load "windows.jai";
}

#if OS == .WASM {
    #load "wasm.jai";
}

#import "Basic";
