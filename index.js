const express = require('express');
const { chromium } = require('playwright');

const app = express();

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/emess', async (req, res) => {
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('https://www.emess.co.il/online', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    const items = await page.evaluate(() => {
      const nodes = document.querySelectorAll(
        'h1, h2, h3, .title, .headline, a[href*="/online"]'
      );

      return Array.from(nodes)
        .map(el => el.innerText ? el.innerText.trim() : '')
        .filter(text => text.length > 10)
        .slice(0, 5)
        .map(text => ({
          title: text.slice(0, 120),
          timestamp: Date.now()
        }));
    });

    await browser.close();

    if (!items.length) {
      return res.json({
        error: 'No headlines found'
      });
    }

    res.json(items);

  } catch (err) {
    if (browser) {
      try { await browser.close(); } catch {}
    }

    res.status(500).json({
      error: err.message
    });
  }
});

const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, '0.0.0.0');
