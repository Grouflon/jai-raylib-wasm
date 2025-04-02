#pragma once

typedef void FILE;

#define SEEK_SET 0
#define SEEK_CUR 1
#define SEEK_END 2

FILE * fopen(const char *, const char *);
int fclose(FILE *);
int fseek( FILE *stream, long offset, int origin );
long ftell(FILE *);
