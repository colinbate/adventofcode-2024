import { TextLineStream } from "jsr:@std/streams";

const listA: number[] = [];
const listB = new Map<number, number>();
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
  listA.push(a);
  listB.set(b, (listB.get(b) ?? 0) + 1);
}

let similarity = 0;
for (let index = 0; index < listA.length; index += 1) {
  similarity += listA[index] * (listB.get(listA[index]) ?? 0);
}

console.log("Similarity", similarity);
