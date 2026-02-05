import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { createHash } from "crypto";

const INPUT_DIR = path.join(process.cwd(), "input-data");
const DEFAULT_FILE = path.join(process.cwd(), "input.json");

function getFileForUrl(url: string | null): string {
  if (!url) return DEFAULT_FILE;
  // Create a hash of the URL for the filename
  const hash = createHash("md5").update(url).digest("hex").slice(0, 12);
  return path.join(INPUT_DIR, `${hash}.json`);
}

async function ensureDir() {
  if (!existsSync(INPUT_DIR)) {
    await mkdir(INPUT_DIR, { recursive: true });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    const inputFile = getFileForUrl(url);

    if (!existsSync(inputFile)) {
      return NextResponse.json([]);
    }
    const data = await readFile(inputFile, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    const item = await request.json();

    // Add the review URL to the item if present
    if (url) {
      item.reviewUrl = url;
    }

    await ensureDir();
    const inputFile = getFileForUrl(url);

    let input: unknown[] = [];
    if (existsSync(inputFile)) {
      const data = await readFile(inputFile, "utf-8");
      input = JSON.parse(data);
    }

    input.push(item);

    await writeFile(inputFile, JSON.stringify(input, null, 2));

    return NextResponse.json({ success: true, count: input.length });
  } catch (e) {
    console.error("Failed to save input:", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    const inputFile = getFileForUrl(url);

    await writeFile(inputFile, "[]");
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to clear" }, { status: 500 });
  }
}
