import { TextLineStream } from "jsr:@std/streams";

let sum = 0;
const order = new Set<string>();
const rev = new Set<string>();
function pageSort(a: string, b: string) {
  if (a === b) return 0;
  const pair = `${a}|${b}`;
  return order.has(pair) ? -1 : 1;
}
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  if (line.includes("|")) {
    order.add(line);
    rev.add(line.split("|").reverse().join("|"));
  } else if (line !== "") {
    const pages = line.split(",");
    let correct = true;
    for (let j = 0; j < pages.length - 1; j += 1) {
      for (let i = j + 1; i < pages.length; i += 1) {
        const pair = `${pages[j]}|${pages[i]}`;
        if (rev.has(pair)) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }
    if (!correct) {
      pages.sort(pageSort);
      const mid = Math.floor((pages.length - 1) / 2);
      const mv = parseInt(pages[mid], 10);
      sum += mv;
    }
  }
}

console.log("Sum", sum);
