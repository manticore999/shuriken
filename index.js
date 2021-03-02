const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth

export const areaW = 2000
export const areaH = 500

import { updateEnemies } from './shuriken.js'
import { line } from './line.js'

function update(){
    ctx.fillStyle = "Bisque"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateEnemies(ctx)
    line.update(ctx)
    window.requestAnimationFrame(update);
}
window.onload = update()