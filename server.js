const path = require('path');
const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

const server = app.listen(port, () => {
  console.log('listening on port ', server.address().port);
});