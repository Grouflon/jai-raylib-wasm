#pragma once

char * strstr(const char *, const char *);
unsigned long strlen(const char *);
int strcmp(const char *, const char *);
int strncmp(const char *, const char *, unsigned long);
int sscanf(const char *restrict, const char *restrict, ...);
char * strcpy(char *, const char *);
char * strncpy(char *, const char *, unsigned long);
void * memset(void *, int, unsigned long);
void * memcpy(void *, const void *, unsigned long);
char * strchr(const char *, int);
char * strrchr(const char *, int);
char * strpbrk(const char *, const char *);