const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import { updateEnemies } from './shuriken.js'
import { line } from './line.js'

    function update(){
        ctx.fillStyle = "Bisque"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        updateEnemies(ctx)
        line.update(ctx)
        window.requestAnimationFrame(update);
    }
    update()