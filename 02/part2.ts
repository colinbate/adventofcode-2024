import { TextLineStream } from "jsr:@std/streams";

function levelsOk(levels: number[]): boolean {
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

function isSafe(levels: number[]): boolean {
  if (levelsOk(levels)) return true;
  for (let i = 0; i < levels.length; i += 1) {
    if (levelsOk([...levels.slice(0, i), ...levels.slice(i + 1)])) return true;
  }
  return false;
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
