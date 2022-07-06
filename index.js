const puppeteer = require("puppeteer");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
   const browser = await puppeteer.launch({headless: false});
   const page = await browser.newPage();
   await page.goto("https://monkeytype.com/");

   // click accept cookies button
   await page.click('.button.active.acceptAll')
   await sleep(1000); // can be modified

   // set finished to true after 30s
   var finished = false;
   setTimeout( () => { finished = true }, 30000);

   while (!finished) {
      let word = await page.$eval('.word.active', word => word.textContent);
      page.keyboard.type(`${word} `);
      await sleep(100); // can be modified
   }

   console.log("Everything's done!");
})();
