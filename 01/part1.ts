import { TextLineStream } from "jsr:@std/streams";

const listA: number[] = [];
const listB: number[] = [];
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
  listA.push(a);
  listB.push(b);
}

listA.sort();
listB.sort();

let distance = 0;
for (let index = 0; index < listA.length; index += 1) {
  distance += Math.abs(listA[index] - listB[index]);
}

console.log("Distance", distance);
