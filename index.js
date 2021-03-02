const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import { updateEnemies } from './shuriken.js'
import { line } from './line.js'
import { area } from './area.js'

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function update(){
    ctx.fillStyle = "Blue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    area.draw(ctx)
    updateEnemies(ctx)
    line.update(ctx)
    window.requestAnimationFrame(update);
}
window.onload = update()