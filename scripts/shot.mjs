/* Screenshot a local HTML preview file. Usage: node scripts/shot.mjs <html> <out.png> [width] */
import { chromium } from "playwright-core";
import path from "path";

const [html, out, w] = process.argv.slice(2);
const width = parseInt(w || "1440", 10);

const browser = await chromium.launch({
  executablePath: "/opt/meta-chromium/chrome",
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
await page.goto("file://" + path.resolve(html), { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: true });
console.log("shot", out, "errors:", errors.length ? errors : "none");
await browser.close();
