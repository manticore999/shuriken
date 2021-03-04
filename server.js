import express from 'express'
import fs from 'fs/promises';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(await fs.readFile('index.html', 'utf8'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})