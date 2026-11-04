// @ts-ignore Node types are not installed; Vite runs this file in Node.
import { execSync } from "node:child_process";
// @ts-ignore see above
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import { cardBuild } from "ha-dashboard-kit/build/vite.mjs";

// The build stamp the card writes to the browser console, so it is obvious which build Home Assistant really runs.
const version: string = JSON.parse(readFileSync("package.json", "utf8")).version;
const commit: string = (() => {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
})();
const stamp = `${version} · ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · po ${commit}`;

const config = cardBuild("ha-energie-dashboard");
export default defineConfig({ ...config, define: { ...(config.define ?? {}), __BUILD__: JSON.stringify(stamp) } });
