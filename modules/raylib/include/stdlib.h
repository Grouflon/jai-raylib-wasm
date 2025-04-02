#pragma once

#define NULL 0
#define size_t unsigned long

void * malloc(unsigned long);
void * calloc(unsigned long, unsigned long);
void free(void*);
void * realloc(void *, unsigned long);
int system(const char *);