import { line } from './line.js'
import { updateAreas, areas } from './area.js'
import { pressedKeys } from './input.js'
import { scaleCanvas } from './scaleCanvas.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// const ws = new WebSocket('ws://localhost:3001');
const port = 3000
const ws = new WebSocket(`ws://sshuriken.herokuapp.com/`);
// const ws = new WebSocket();

const backgroundColor = "blue"
document.body.style.backgroundColor = backgroundColor

let wsOpen = false
let scaled = false
let areaOn = 0
let newArea = 'next'
export let m = {
    x: 0,
    y: 0,
    keyZ: 0,
    keyX: 0,
    shift: 0,
}

ws.addEventListener('open', (e) => {
    wsOpen = true
});

ws.addEventListener('message', (msg) => {
    for(const obj in m){
        m[obj] = JSON.parse(msg.data)[obj]
    }
});

export function scaler(canvas) {
    scaleCanvas(canvas)

    const area = areas[line.areaOn]
    if((newArea == 'previous' || newArea == 'next') && area){
        if(newArea == 'next') area.x = canvas.width / 2 + area.safeZoneWidth - area.teleporterWidth - line.size - 1
        else if(newArea == 'previous') area.x = canvas.width / 2 - area.width - area.safeZoneWidth + area.teleporterWidth + line.size + 1
        area.y = (canvas.height - area.height) / 2
        area.enemyNum = line.areaOn + 1
        if(!area.spawned) area.spawner(50, 3, 0.5, 2, 2)
        newArea = ''
    }
    scaled = true
}
scaler(canvas)

window.onresize = () => scaler(canvas);
window.getBound = () => canvas.getBoundingClientRect()
ctx.canvas.width *= window.devicePixelRatio
ctx.canvas.height *= window.devicePixelRatio

function update(){
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(areaOn !== line.areaOn && areas[line.areaOn]){
        if(areaOn > line.areaOn) newArea = 'previous'
        else if(areaOn < line.areaOn) newArea = 'next'
        areaOn = line.areaOn
        scaler(canvas)
    }

    if (line.created && areas[line.areaOn]) updateAreas(ctx, line.areaOn, m, line)
    if(areas[line.areaOn]) line.update(ctx, m.keyZ, m.keyX, m.shift, areas)

    if(wsOpen) ws.send(JSON.stringify(pressedKeys));

    window.requestAnimationFrame(update);
}
window.onload = update()