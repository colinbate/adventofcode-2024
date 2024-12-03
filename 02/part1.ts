import { TextLineStream } from "jsr:@std/streams";

function isSafe(levels: number[]) {
  let dir = 0;
  for (let i = 0; i < levels.length - 1; i += 1) {
    const delta = levels[i + 1] - levels[i];
    if (delta === 0 || Math.abs(delta) > 3) return false;
    const ddir = delta > 0 ? 1 : -1;
    if (dir !== 0 && ddir !== dir) return false;
    dir = ddir;
  }
  return true;
}
let safe = 0;
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  const levels = line.split(" ").map((x) => parseInt(x, 10));
  if (isSafe(levels)) safe += 1;
}

console.log("Safe", safe);
