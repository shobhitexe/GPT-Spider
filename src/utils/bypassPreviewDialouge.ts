import { ElementHandle, Page } from "puppeteer";

export async function byPassPreviewDialouge(page: Page) {
  try {
    await page.waitForNetworkIdle({ idleTime: 1000 });

    const [nextButton] = await page.$x(
      `//*[@id="radix-:r9:"]/div[2]/div[1]/div[2]/button`
    );
    await (nextButton as ElementHandle<Element>).click();

    await page.waitForNetworkIdle({ idleTime: 1000 });

    const [nextButton2] = await page.$x(
      `//*[@id="radix-:r9:"]/div[2]/div[1]/div[2]/button[2]`
    );
    await (nextButton2 as ElementHandle<Element>).click();

    await page.waitForNetworkIdle({ idleTime: 1000 });

    const [doneButton] = await page.$x(
      `//*[@id="radix-:r9:"]/div[2]/div[1]/div[2]/button[2]`
    );
    await (doneButton as ElementHandle<Element>).click();
  } catch {
    console.log("Preview dialouge not found ");
  }
}
