const express = require('express');
const app = express();

// Health check FIRST
app.get('/', (req, res) => res.send('OK'));

app.get('/emess', (req, res) => {
  res.json([{title: "✅ LIVE - Emess scraper ready!", timestamp: Date.now()}]);
});

// CRITICAL: Listen IMMEDIATELY
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
