import { copyFile } from "node:fs/promises";

await copyFile(
    new URL("../../dist/ha-energie-dashboard.js", import.meta.url),
    new URL("../../ha-energie-dashboard.js", import.meta.url),
);
