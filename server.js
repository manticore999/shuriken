import express from 'express'
const app = express()
import expressWs from 'express-ws'
expressWs(app)
import ws from 'ws'
import fs from 'fs/promises'
import { move } from './move.js'


const port = process.env.PORT || 3000
// const wsport = 3001
// const wss = new ws.Server({port: wsport});
// const wss = new ws.Server({port: port});

let wsOpen = false

app.use(express.static('public'))

const server = app.get('/', async (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

// const wss = new ws.Server({server});

let pressedKeys = {
  up: false,
  left: false,
  right: false,
  down: false,
  z: false,
  x: false,
  shift: false,
}

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    pressedKeys = JSON.parse(msg)
    
    let m = move(pressedKeys)
    ws.send(JSON.stringify(m))
  })
})

app.ws('/', (ws, req) => {
  ws.on('open', (ws) => {
    wsOpen = true
  })
})

app.listen(port, () => {
  // console.log($PORT, process.env.PORT)
  console.log(`Server listening at http://localhost:${port}`)
})