import { Line } from './line.js'
import { updateAreas, map } from './area.js'
import { pressedKeys } from './input.js'
import { scaleCanvas } from './scaleCanvas.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let ws
if(location.protocol == "http:") ws = new WebSocket(`ws://${location.host}`);
else if(location.protocol == "https:") ws = new WebSocket(`wss://${location.host}`);

const backgroundColor = "blue"
document.body.style.backgroundColor = backgroundColor   

let wsOpen = false
let scaled = false
let areaOn = 0
let newArea = 'next'
let players = []
let mainLine = new Line()
let m = {}

ws.addEventListener('open', (e) => {
    wsOpen = true
});

ws.addEventListener('message', (_msg) => {
    const msg = JSON.parse(_msg.data);
    m = msg.input

    for(let i = 0; i < msg.players.length; i++){
        let line = {}

        // console.log(msg.players, players)
        if(players[i] && msg.players[i].created) for(const obj in msg.players[i]) players[i][obj] = msg.players[i][obj]
        else {
            line = new Line()
            for(const obj in msg.players[i]) line[obj] = msg.players[i][obj]
            players.push(line)
        }
    }

    mainLine = players[msg.client]
});

let area = map[mainLine.areaOn]

export function scaler(canvas, line, area) {
    scaleCanvas(canvas)

    if((newArea == 'previous' || newArea == 'next') && area){
        if(newArea == 'next') area.x = canvas.width / 2 + area.safeZoneWidth - area.teleporterWidth - 1
        else if(newArea == 'previous') area.x = canvas.width / 2 - area.width - area.safeZoneWidth + area.teleporterWidth + 1
        console.log(line.areaOn)
        area.y = canvas.height - area.y
        // area.enemyNum = line.areaOn + 1
        area.enemyNum = 0
        if(!area.spawned) area.spawner(50, 3, 0.5, 2, 2)
        newArea = ''
    }

    scaled = true
}
scaler(canvas, mainLine, area)

window.onresize = () => scaler(canvas, mainLine, area)
window.getBound = () => canvas.getBoundingClientRect()
ctx.canvas.width *= window.devicePixelRatio
ctx.canvas.height *= window.devicePixelRatio

function update(){
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // console.log(mainLine.x, mainLine.y)
    if (m && area) updateAreas(ctx, area, m, mainLine)

    if(areaOn !== mainLine.areaOn && area){
        if(areaOn > mainLine.areaOn) newArea = 'previous'
        else if(areaOn < mainLine.areaOn) newArea = 'next'
        areaOn = mainLine.areaOn
        area = map[mainLine.areaOn]
        scaler(canvas, mainLine, area)
    }

    for(const line of players) if(map[line.areaOn] == area && line.update) line.update(ctx, m.keyZ, m.keyX, m.shift, map, m)

    if(wsOpen) ws.send(JSON.stringify({input: pressedKeys, player: {x: mainLine.x, y: mainLine.y, created: mainLine.created}}));

    window.requestAnimationFrame(update);
}
window.onload = update()