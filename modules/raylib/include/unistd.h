#pragma once

#define F_OK 0
#define R_OK 4
#define W_OK 2
#define X_OK 1

int access(const char *, int);
char *getcwd(char *, size_t);
int chdir(const char *);

