import { TextLineStream } from "jsr:@std/streams";

let count = 0;
const grid: string[] = [];
const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  grid.push(line);
}

type Vector = [number, number];
const dirs: Vector[] = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
];

function inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

const WORD = 'XMAS';
function checkDir(x: number, y: number, dir: Vector) {
    //if (x === 5 && y === 0) console.log(x, y, dir);
    if (!inBounds(x + dir[0]*(WORD.length-1), y + dir[1]*(WORD.length-1))) return false;
    //if (x === 5 && y === 0) console.log(x, y, dir, 'in bounds');
    for (let pos = 0; pos < WORD.length; pos += 1) {
        const px = x + dir[0] * pos;
        const py = y + dir[1] * pos;
        if (grid[py][px] !== WORD[pos]) return false;
    }
    return true;
}

for (let xx = 0; xx < grid[0].length; xx += 1) {
    for (let yy = 0; yy < grid.length; yy += 1) {
        for (let dd = 0; dd < dirs.length; dd += 1) {
            if (checkDir(xx, yy, dirs[dd])) count += 1;
        }
    }
}

console.log("Result", count);
