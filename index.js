const express = require('express');
const playwright = require('playwright');

const app = express();

app.get('/emess', async (req, res) => {
  res.json([{title: "🧪 Test - Scraper Ready", timestamp: Date.now()}]);
});

app.get('/', (req, res) => {
  res.send('Emess scraper OK');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Emess scraper listening on port ${port}`);
});
