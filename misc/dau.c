#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void scan(char *s)
{
    int len = strlen(s);
    int i = 0;
    while (i < len)
    {
        char c = s[i];
        if (isspace(c))
            i++;
        else if (c == '(' || c == ')')
            printf("%c\n", s[i++]);
        else
        {
            while (s[i] != '\0' && !isspace(s[i]) && s[i] != '(' && s[i] != ')')
                putchar(s[i++]);
            puts("");
        }
    }
    // printf("%s", &s[i]);
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