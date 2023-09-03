#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <time.h>

#define TEST_NUM 5

int os[1 << 8]; // operation stack
int vr[1 << 4]; // variable registers

size_t sp = 0; // stack pointer
size_t ip = 0; // instruction pointer

bool on = true;

enum Op { HLT, STL, LTE, JNT, JMP, MUL, INC, PRT };

typedef struct Ins {
  int op;
  int x;
  int y;
  int z;
} Ins;

Ins code[] = {{STL, 0, TEST_NUM}, // n
              {STL, 1, 1},        // r
              {STL, 2, 1},        // i
              {LTE, 2, 0, 4},     // i < n !? jump
              {MUL, 1, 1, 2},     // r = r * i
              {INC, 2},           // i++
              {JMP, -3},          // jump
              {PRT, 1},           // print
              {HLT}};

int main() {

  clock_t t = clock();

  while (on) {
    switch (code[ip].op) {
    case HLT: // halt
      on = false;
      break;
    case STL: // set lit
      vr[code[ip].x] = code[ip].y;
      break;
    case INC: // inc
      vr[code[ip].x]++;
      break;
    case LTE: // lt or eq
      if (!(vr[code[ip].x] <= vr[code[ip].y]))
        ip += code[ip].z - 1;
      break;
    case JMP: // jump
      ip += code[ip].x - 1;
      break;
    case PRT:
      printf("%d\n", vr[code[ip].x]);
      break;
    case MUL: // mul
      vr[code[ip].x] = vr[code[ip].y] * vr[code[ip].z];
      break;
    }

    ip++;
  }

  printf("VM time: %f\n", (double)clock() - t);

  t = clock();

  {
    int n = TEST_NUM;
    int r = 1;
    int i = 1;
    while (i <= n) {
      r = r * i;
      i++;
    }
    printf("%d\n", r);
  }

  printf("Native time: %f\n", (double)clock() - t);

  return 0;
}