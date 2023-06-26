import { Page } from "puppeteer";
import { writePrompt } from "../functions/writePrompt";

const GPTSpider = (page: Page) => {
  return {
    writePrompt: (prompt: string) => writePrompt(prompt, page),
  };
};

export default GPTSpider;
