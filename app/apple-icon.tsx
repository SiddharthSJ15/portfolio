import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

async function iconDataUrl() {
  "use cache";
  cacheLife("max");
  const svg = await readFile(join(process.cwd(), "app/icon.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export default async function AppleIcon() {
  const src = await iconDataUrl();

  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size.width} height={size.height} />,
    size,
  );
}
