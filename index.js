const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));
app.get('/emess', (req, res) => res.json({status: "LIVE"}));

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on', port);
  process.send && process.send('ready'); // Signal startup complete
});
