const express = require('express');
const { chromium } = require('playwright');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/emess', async (req, res) => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('https://www.emess.co.il/online', { waitUntil: 'networkidle' });
    
    const items = await page.evaluate(() => {
      const headlines = Array.from(document.querySelectorAll('h1, h2, h3, .title, .headline, a[href*="/news/"]'));
      return headlines.slice(0, 5).map(el => ({
        title: el.innerText.trim().slice(0, 100),
        timestamp: Date.now()
      })).filter(item => item.title);
    });
    
    await browser.close();
    res.json(items.length ? items : [{title: 'No headlines found', timestamp: Date.now()}]);
  } catch (e) {
    res.json([{title: `Scraper error: ${e.message.slice(0,50)}`, timestamp: Date.now()}]);
  }
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0');
