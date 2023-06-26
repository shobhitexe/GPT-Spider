import fs from "fs";
import { Page } from "puppeteer";

export async function cookieLogin(cookiesFilePath: string, page: Page) {
  try {
    const cookiesRawData = fs.readFileSync(cookiesFilePath, "utf-8");
    const cookiesData = JSON.parse(cookiesRawData);
    await page.setCookie(...cookiesData);
    await page.goto("https://chat.openai.com", { waitUntil: "load" });
  } catch (err) {
    throw new Error(`Error occured ${err}`);
  }
}
