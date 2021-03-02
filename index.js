const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import { updateEnemies } from './shuriken.js'
import { line } from './line.js'
import { updateAreas } from './area.js'

export function scaler(canvas) {
    const bound = canvas.getBoundingClientRect()
    const winw = window.innerWidth;
    const winh = window.innerHeight;
    const xvalue = winw / canvas.width;
    const yvalue = winh / canvas.height;
    const scale = Math.min(xvalue, yvalue);
    canvas.style.transform = 'scale(' + scale + ')';
    canvas.style.left = (winw - canvas.width) / 2 + 'px';
    canvas.style.top = (winh - canvas.height) / 2 + 'px';
    window.scale = scale;
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