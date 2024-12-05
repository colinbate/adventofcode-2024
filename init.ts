import "jsr:@std/dotenv/load";

const TEMPLATE = `import { TextLineStream } from "jsr:@std/streams";

let value = 0;

const reader = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
for await (const line of reader) {
  
}

console.log(value);
`;

const day = Deno.args[0] ?? new Date().getDate().toString();
const year = Deno.env.get("AOC_YEAR") ?? new Date().getFullYear().toString();

const cookie = Deno.env.get("AOC_COOKIE")!;
if (!cookie) {
  console.log("No Auth Cookie found");
  Deno.exit(1);
}

console.log(`Initializing ${year}/${day}`);

const dayDir = `${day.length < 2 ? "0" : ""}${day}`;
await Deno.mkdir(dayDir, { recursive: true });

await addTemplateIfNeeded(`${dayDir}/part1.ts`);

await fetchInputIfNeeded();

async function exists(file: string): Promise<boolean> {
  try {
    const info = await Deno.stat(file);
    return info.isFile;
  } catch (e) {
    return !(e instanceof Deno.errors.NotFound);
  }
}

async function addTemplateIfNeeded(file: string) {
  if (!(await exists(file))) {
    await Deno.writeTextFile(file, TEMPLATE);
    console.log(`Created ${file} from template`);
  } else {
    console.log(`File ${file} already exists`);
  }
}

async function fetchInputIfNeeded() {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const file = `${dayDir}/input.txt`;
  if (await exists(file)) {
    console.log(`Input file already exists.`);
    return;
  }
  const res = await fetch(url, {
    headers: {
      cookie,
    },
  });
  if (res.ok && res.body) {
    await Deno.writeFile(file, res.body);
    console.log(`Wrote input data to`, file);
  }
}
