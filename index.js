const express = require('express');
const app = express();

const DEFAULT_PORT = 81;

const argsPort = process.argv[2];
const port = parseInt(`${argsPort ?? DEFAULT_PORT}`, 10);
if (isNaN(port)) {
  throw new Error(`Cannot parse the port: "${argsPort}"`);
}

app.get('/', (req, res) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  res.send(`Hello World! [${Math.random()}]`);
});

app.listen(port, () => console.log(`Example app is running at http://localhost:${port}`));
