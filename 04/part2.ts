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
const dirs: Vector[][] = [
    [[1, 1],[-1, -1]],
    [[-1, 1], [1, -1]],
];

function inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

const WORD = 'MAS';
function checkLeg(x: number, y: number, dir: Vector[]) {
    //if (x === 5 && y === 0) console.log(x, y, dir);
    if (grid[y][x] !== 'A') return false;
    const x1 = x + dir[0][0];
    const y1 = y + dir[0][1];
    const x2 = x + dir[1][0];
    const y2 = y + dir[1][1];
    if (!inBounds(x1, y1) || !inBounds(x2, y2)) return false;
    if (grid[y1][x1] === 'S' && grid[y2][x2] === 'M' || grid[y1][x1] === 'M' && grid[y2][x2] === 'S') {
        //console.log('Cross at', x, y)   
        return true;
    }
    return false;
}

for (let xx = 0; xx < grid[0].length; xx += 1) {
    for (let yy = 0; yy < grid.length; yy += 1) {
        if (checkLeg(xx, yy, dirs[0]) && checkLeg(xx, yy, dirs[1])) count += 1;
    }
}

console.log("Result", count);
