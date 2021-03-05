import express from 'express'
import fs from 'fs/promises';
import WebSocket from 'ws';

const app = express()
const port = 3000
// const ws = new WebSocket('ws:http://localhost:${port}');
app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// ws.on('open', function open() {
//   ws.send('something');
// });