#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void scan(char *s)
{
    int len = strlen(s);
    for (int i = 0; i < len; i++)
    {
        // printf("%s", &s[i]);
    }
}

void repl()
{
    char line[1024];

    while (true)
    {
        printf(": ");

        if (!fgets(line, sizeof(line), stdin))
        {
            printf("\n");
            break;
        };

        printf("> %s", line);
        scan(line);
    }
}

int main(int argc, char *argv[])
{
    printf("(( dau ))\n");

    if (argc == 1)
    {
        repl();
    }
    else if (argc == 2)
    {
    }
    return 0;
}