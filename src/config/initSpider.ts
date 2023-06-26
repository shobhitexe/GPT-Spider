import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { cookieLogin } from "../utils/cookieLogin";
import { manualLogin } from "../utils/manualLogin";
import { byPassPreviewDialouge } from "../utils/bypassPreviewDialouge";
import path from "path";

const cookiesFilePath = path.resolve(
  __dirname,
  "..",
  "cookies",
  "cookies.json"
);
const cookiesDir = path.dirname(cookiesFilePath);

const initSpider = async (username: string, password: string) => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0"
  );

  try {
    await cookieLogin(cookiesFilePath, page);
  } catch (error) {
    console.error("Error occurred during cookie login:", error);
    await manualLogin(cookiesFilePath, cookiesDir, page, {
      username: username,
      password: password,
    });
  }

  await byPassPreviewDialouge(page);

  return { browser, page };
};

export default initSpider;
