import express from 'express'
import fs from 'fs/promises'
import ws from 'ws'
import { move } from './move.js'

const app = express()
const port = 3000
const wsport = 3001
const wss = new ws.Server({port: wsport});
let wsOpen = false
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

let pressedKeys = {
  up: false,
  left: false,
  right: false,
  down: false,
  z: false,
  x: false,
  shift: false,
}

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    pressedKeys = JSON.parse(msg)
    
    let m = move(pressedKeys)
    ws.send(JSON.stringify(m))
  })
});

wss.on('open', (ws) => {
  wsOpen = true
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})