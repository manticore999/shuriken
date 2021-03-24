import express from 'express'
const app = express()
import expressWs from 'express-ws'
expressWs(app)
import fs from 'fs/promises'
import { move } from './move.js'

const port = process.env.PORT || 3000
let players = []
let clientId = -1

app.use(express.static('public'))

const server = app.get('/', async (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

app.ws('/', (ws, req) => {
  console.log("connected")
  clientId++

  ws.on('message', (_msg) => {
    const msg = JSON.parse(_msg)
    let pressedKeys = msg.input
    let m = move(pressedKeys)
    players[clientId] = msg.player
    ws.send(JSON.stringify({input: m, players: players, client: clientId}))
  })

  players.push(player)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})