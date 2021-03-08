// import ws from 'ws';
import { line } from './line.js'
import { updateAreas, areas } from './area.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ws = new WebSocket('ws://localhost:3001');
let scaled = false
let areaOn = 0
let newArea = 'next'

ws.addEventListener('open', (e) => {
    ws.send('Hello');
});
ws.addEventListener('message', (msg) => {
    console.log(msg.data)
});

export function scaler(canvas) {
    // const bound = canvas.getBoundingClientRect()
    const winw = window.innerWidth;
    const winh = window.innerHeight;
    const xvalue = winw / canvas.width;
    const yvalue = winh / canvas.height;
    const scale = Math.min(xvalue, yvalue);
    canvas.style.transform = 'scale(' + scale + ')';
    canvas.style.left = (winw - canvas.width) / 2 + 'px';
    canvas.style.top = (winh - canvas.height) / 2 + 'px';
    window.scale = scale;

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
    ctx.fillStyle = "Blue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(areaOn !== line.areaOn && areas[line.areaOn]){
        if(areaOn > line.areaOn) newArea = 'previous'
        else if(areaOn < line.areaOn) newArea = 'next'
        areaOn = line.areaOn
        scaler(canvas)
    }
    if (line.created && areas[line.areaOn]) updateAreas(ctx, line.areaOn)
    if(areas[line.areaOn]) line.update(ctx)
    window.requestAnimationFrame(update);
}
window.onload = update()