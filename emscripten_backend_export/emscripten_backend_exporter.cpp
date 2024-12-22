#include <emscripten.h>
#include <GLFW/glfw3.h>
#include <stdio.h>

int main(int _argc, char** _argv)
{
    glfwSetErrorCallback(nullptr);

    glfwInit();
    glfwDefaultWindowHints();

    glfwTerminate();

    return 0;
}
