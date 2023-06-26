import fs from "fs";
import { Page } from "puppeteer";

type authType = {
  username: string;
  password: string;
};

export async function manualLogin(
  cookiesFilePath: string,
  cookiesDir: string,
  page: Page,
  { username, password }: authType
) {
  await page.goto("https://chat.openai.com", { waitUntil: "load" });
  await page.waitForNetworkIdle({ idleTime: 5000 });

  const loginButton = await page.waitForSelector("button:nth-child(1)");
  await loginButton?.click();

  await page.waitForNetworkIdle({ idleTime: 5000 });

  const emailInput = await page.waitForSelector("#username");
  await emailInput?.type(username, { delay: 500 });

  await page.waitForNetworkIdle({ idleTime: 2000 });

  const emailContinue = await page.waitForSelector("button[value='default']");
  await emailContinue?.click();

  await page.waitForNetworkIdle({ idleTime: 2000 });

  const passwordInput = await page.waitForSelector("#password");
  await passwordInput?.type(password, { delay: 500 });

  await page.waitForNetworkIdle({ idleTime: 2000 });

  const passwordContinue = await page.waitForSelector(
    "button[value='default']"
  );
  await passwordContinue?.click();

  await page.waitForNetworkIdle({ idleTime: 2000 });

  const cookies = await page.cookies();
  const cookiesJSON = JSON.stringify(cookies);

  if (!fs.existsSync(cookiesDir)) {
    fs.mkdirSync(cookiesDir, { recursive: true });
  }
  fs.writeFileSync(cookiesFilePath, cookiesJSON, {
    flag: "w",
  });
}
