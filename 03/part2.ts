import { TextLineStream } from "jsr:@std/streams";

let enabled = true;
function parse(input: string): number {
  let sum = 0;
  let pos = 0;
  let x,
    y = 0;
  let match = "";
  const takeDigits = () =>
    (match = (/^[0-9]{1,3}/.exec(input.substring(pos, pos + 3)) ?? [])[0] ?? "")
      .length
      ? (pos += match.length) > 0
      : false;
  const take = (char: string) =>
    input.substring(pos, pos + char.length) === char
      ? (pos += char.length) > 0
      : false;
  while (pos < input.length) {
    if (take("do")) {
      if (take("()")) {
        enabled = true;
      } else if (take(`n't()`)) {
        enabled = false;
      }
    } else if (take("mul(")) {
      if (takeDigits()) {
        x = parseInt(match, 10);
        if (take(",") && takeDigits()) {
          y = parseInt(match, 10);
          if (take(")")) {
            if (enabled) {
              sum += x * y;
            }
          }
        }
      }
    } else {
      pos++;
    }
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
