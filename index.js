import express from 'express';
import { chromium } from 'playwright';

const app = express();

app.get('/emess', async (req, res) => {
  const browser = await chromium.launch({
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://www.emess.co.il/online', {
    waitUntil: 'networkidle'
  });

  const items = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('h1,h2,h3').forEach(el => {
      const text = el.innerText.trim();
      if (text.length > 25) {
        results.push({
          title: text,
          timestamp: Date.now()
        });
      }
    });
    return results.slice(0, 20);
  });

  await browser.close();
  res.json(items);
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(port, () => {
  console.log('Emess scraper listening on port', port);
});
