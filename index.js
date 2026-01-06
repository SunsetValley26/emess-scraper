const express = require('express');
const { chromium } = require('playwright');
const app = express();

app.get('/', (req, res) => res.send('OK'));
app.get('/emess', async (req, res) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.emess.co.il/online');
  
  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.headline, .title, h2, h3')).slice(0, 5).map(el => ({
      title: el.innerText.trim(),
      timestamp: Date.now()
    }));
  });
  
  await browser.close();
  res.json(items);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0');
