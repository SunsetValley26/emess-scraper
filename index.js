const express = require('express');
const app = express();

// Health check - boots in 1s
app.get('/', (req, res) => res.send('OK'));

app.get('/emess', (req, res) => {
  res.json([{title: "✅ LIVE TEST", timestamp: Date.now()}]);
});

// Listen IMMEDIATELY
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
