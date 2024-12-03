import { TextLineStream } from "jsr:@std/streams";

const MUL = /mul\((\d{1,3}),(\d{1,3})\)/g;
function parse(input: string): number {
  let sum = 0;
  let res: ReturnType<(typeof MUL)["exec"]> = null;
  while (((res = MUL.exec(input)), res)) {
    const x = parseInt(res[1], 10);
    const y = parseInt(res[2], 10);
    sum += x * y;
  }
  return sum;
}
let sumOfProducts = 0;
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  sumOfProducts += parse(line);
}

console.log("Result", sumOfProducts);
