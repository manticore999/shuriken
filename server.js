import express from 'express'
import fs from 'fs/promises';
import ws from 'ws';

const app = express()
const port = 3000
const wsport = 3001
const wss = new ws.Server({port: wsport});

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

wss.on('connection', function connection(ws) {
  console.log("a")
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
});

  ws.send('something');
});

wss.on('open', () => {
  wss.send('Hello');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})