import { Page, ElementHandle } from "puppeteer";

let counter: number = 2;

export const writePrompt = async (prompt: string, page: Page) => {
  if (!page) {
    throw new Error("Page object not initialized.");
  }

  const input = await page.waitForSelector("#prompt-textarea");
  await input?.type(prompt);

  await page.waitForNetworkIdle({ idleTime: 1000 });

  const [submit] = await page.$x(
    "//*[name()='path' and contains(@d,'M.5 1.163A')]"
  );

  await (submit as ElementHandle<Element>).click();

  //   await page.keyboard.press('Enter');

  //   page.on("requestfinished", async () => {});

  await page.waitForNetworkIdle({ idleTime: 5000 });

  const response = await page.$x(
    `//*[@id="__next"]/div[1]/div/div/main/div[2]/div/div/div/div[${counter}]/div/div[2]/div[1]/div/div/p`
  );

  //*[@id="__next"]/div[1]/div/div/main/div[2]/div/div/div/div[4]/div/div[2]/div[1]/div/div/p

  if (response && response.length > 0) {
    const innerHTMLProperty = await response[0].getProperty("textContent");
    const responseContent = await innerHTMLProperty.jsonValue();

    const stringifyResponse = String(responseContent);

    counter += 2;

    return stringifyResponse;
  } else {
    return "Response Not Found";
  }
};
