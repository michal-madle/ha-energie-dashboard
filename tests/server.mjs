// Static file server of the tests: the repository root, so the harness can load the built card
// (ha-energie-dashboard.js) and the test fonts from node_modules. The server is the kit's.
import { startServer } from "ha-dashboard-kit/testing/server.mjs";

startServer({ card: "ha-energie-dashboard.js", port: 4174 });
