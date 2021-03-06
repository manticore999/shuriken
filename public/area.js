import { move } from './move.js'
import { line } from './line.js'
import { Enemy, updateEnemies } from './shuriken.js'

const areaNum = 1
export const areas = []
export const enemies = [];

class Area {
    constructor(){
        this.width = 3000
        this.height = 500
        this.x = (canvas.width - this.width) / 2
        this.y = (canvas.height - this.height) / 2
        this.safeZoneWidth = 200
        this.enemyNum = 1
    }

    update(ctx){
        this.draw(ctx)
        this.aMove()
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "Bisque";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(this.x - this.safeZoneWidth, this.y, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(this.x + this.width, this.y, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fill();
        ctx.closePath();
    }

    aMove(){
        const m = move()
        this.x += m.x
        this.y += m.y

        const minX = Math.min(line.leftCornerX, line.rightCornerX)
        const maxX = Math.max(line.leftCornerX, line.rightCornerX)
        const minY = Math.min(line.leftCornerY, line.rightCornerY)
        const maxY = Math.max(line.leftCornerY, line.rightCornerY)

        if(minX <= this.x - this.safeZoneWidth) this.x = minX + this.safeZoneWidth
        if(maxX >= this.x + this.width + this.safeZoneWidth) this.x = maxX - this.width - this.safeZoneWidth
        if(minY <= this.y) this.y = minY
        if(maxY >= this.y + this.height) this.y = maxY - this.height
    }

    spawner(){
        for(let i = 0; i < this.enemyNum; i++){
            const newEnemy = new Enemy(this.x, this.y, this.width, this.height, 50, 3, 2, 0.5, 2)
            newEnemy.createTriangles()
            newEnemy.direction()
            enemies.push(newEnemy)
        }
    }
}

for (let i = 0; i < areaNum; i++){
    let newArea = new Area()
    newArea.spawner()
    areas.push(newArea)
}

export function updateAreas(ctx){
    for(const area of areas){
        area.update(ctx)
        updateEnemies(ctx, area)
    }
}