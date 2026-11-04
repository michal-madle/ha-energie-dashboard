import { makeTest } from "ha-dashboard-kit/testing/fixtures.mjs";

/** `test` for the specs: with `npm run coverage` it also records the coverage of the card bundle (the kit's fixture). */
export const test = makeTest("ha-energie-dashboard.js");

export { expect } from "@playwright/test";
export type { CDPSession, Page } from "@playwright/test";
