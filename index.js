const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Emess scraper LIVE'));
app.get('/emess', (req, res) => {
  res.json([{
    title: "🧪 TEST - Emess /online scraper ready!", 
    timestamp: Date.now()
  }]);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
