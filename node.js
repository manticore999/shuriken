const { createServer } = require("http")
const { readFileSync } = require("fs")

createServer((req, res) => {
  res.write(readFileSync("./index.html", { encoding: "utf8" }))
  res.end()
})
.listen(8080)