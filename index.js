const express = require('express');
const { chromium } = require('playwright');

const app = express();

app.get('/emess', async (req, res) => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.emess.co.il/online');
    
    const headlines = await page.$$eval('.headline-selector', els => 
      els.map(el => ({
        title: el.innerText.trim(),
        timestamp: Date.now()
      }))
    );
    
    await browser.close();
    res.json(headlines);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Emess scraper listening on port ${port}`));
