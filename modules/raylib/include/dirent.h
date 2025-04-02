#pragma once

typedef struct __dirstream DIR;

typedef unsigned long long ino_t;
typedef long long off_t;

struct dirent {
    ino_t d_ino;
    off_t d_off;
    unsigned short d_reclen;
    unsigned char d_type;
    char d_name[256];
};

DIR           *opendir(const char *);
int            closedir(DIR *);
struct dirent *readdir(DIR *);
