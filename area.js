import { move } from './move.js'
import { line } from './line.js'

const areaNum = 1
export const areas = []

class Area {
    constructor(){
        this.width = 3000
        this.height = 500
        this.x = (canvas.width - this.width) / 2
        this.y = (canvas.height - this.height) / 2
        this.safeZoneWidth = 200
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
        // console.log(this.x, minX, minX <= this.x - this.safeZoneWidth)
        if(minX <= this.x - this.safeZoneWidth) this.x = minX + this.safeZoneWidth
        if(maxX >= this.x + this.width + this.safeZoneWidth) this.x = maxX - this.width - this.safeZoneWidth
        if(minY <= this.y) this.y = minY
        if(maxY >= this.y + this.height) this.y = maxY - this.height
        // console.log(this.x, this.y, this.width, this.height)

    }
}

for (let i = 0; i < areaNum; i++){
    areas.push(new Area())
}

export function updateAreas(ctx){
    for(const area of areas){
        area.update(ctx)
    }
}