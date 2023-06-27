import initSpider from "./config/initSpider";
import GPTSpider from "./config/createGPTSpider";

(async () => {
  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { page } = await initSpider("username", "password");
  const spider = GPTSpider(page);

  const res = await spider.writePrompt("Hellooo");

  console.log(res);

  timeout(20000);

  const res2 = await spider.writePrompt("You are a good bot man");

  console.log(res2);
})();

export { initSpider, GPTSpider };
