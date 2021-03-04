const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import { enemies, updateEnemies } from './shuriken.js'
import { line } from './line.js'
import { updateAreas, areas } from './area.js'

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

    for(const area of areas){
        area.x = 1000
        area.y = (canvas.height - area.height) / 2
    }

    for(const shuriken of enemies){
        const area = areas[0]
        shuriken.x = Math.random() * (area.width) + area.x;
        shuriken.y = Math.random() * (area.height) + area.y;
    }
}
scaler(canvas)

window.onresize = () => scaler(canvas);
window.getBound = () => canvas.getBoundingClientRect()
ctx.canvas.width *= window.devicePixelRatio
ctx.canvas.height *= window.devicePixelRatio

function update(){
    ctx.fillStyle = "Blue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateAreas(ctx)
    updateEnemies(ctx)
    line.update(ctx)
    window.requestAnimationFrame(update);
}
window.onload = update()