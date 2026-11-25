// One-Line Office Joke Laugh-Off — entry program (Node stdlib only).
//
// Winning joke (24/25 in candidates.md):
//   "My "quick sync" ran 47 minutes, and the only thing we synced was our mutual regret."
//
// Why this one won:
// - The punchline redefines the first half: "sync" flips from the meeting's
//   stated purpose (syncing work) to what actually got synced (mutual regret).
//   The twist lands on the last two words, which is exactly the shape the
//   judges reward: an unexpected turn at the end of the sentence.
// - "47 minutes" is a concrete, specific number — not a vague "forever" —
//   which makes the exaggeration feel observed rather than invented.
// - It is instantly clear in a single read, uses no banned office cliché,
//   and every word earns its place (83 characters, no filler).
//
// The program writes exactly this one line to /output/entry.txt with no
// trailing newline, then reads it back and verifies it is byte-identical.

import { writeFileSync, readFileSync } from "node:fs";

// REVISION (run 2): put "quick sync" in scare quotes — the quotes make the
// meeting's own label indict itself before the punchline even arrives, so
// "47 minutes" hits harder and "mutual regret" lands as the verdict, not
// just a complaint. Two characters, same joke, sharper contrast.
const JOKE =
  'My "quick sync" ran 47 minutes, and the only thing we synced was our mutual regret.';

const OUTPUT_PATH = "/output/entry.txt";

// Validation: length 1–200 characters counted in code points, one line,
// not whitespace-only, no control characters.
function validate(joke: string): void {
  const length = [...joke].length;
  if (length < 1 || length > 200) {
    throw new Error(`joke length ${length} is outside 1–200 characters`);
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (joke.trim().length === 0) {
    throw new Error("joke must not be whitespace-only");
  }
  for (const ch of joke) {
    if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
      throw new Error("joke must not contain control characters");
    }
  }
}

validate(JOKE);
writeFileSync(OUTPUT_PATH, JOKE, "utf8");

// Read back and verify byte-identical output.
const back = readFileSync(OUTPUT_PATH, "utf8");
if (back !== JOKE) {
  throw new Error("verification failed: /output/entry.txt does not match the joke");
}
if (back.endsWith("\n")) {
  throw new Error("verification failed: trailing newline present");
}

console.log(`Wrote ${[...JOKE].length} characters to ${OUTPUT_PATH}`);
console.log("Verified: entry.txt is byte-identical to the joke, no trailing newline.");
