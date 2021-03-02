import { move } from './move.js'
import { line } from './line.js'

const areaNum = 1
export const areas = []

class Area {
    constructor(){
        this.width = 3000
        this.height = 500
        this.x = 0
        this.y = (canvas.height - this.height) / 2
        console.log(this.x)
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
    }

    aMove(){
        console.log(this.x)
        this.move()

        let minX = Math.min(line.leftCornerX, line.rightCornerX)
        let maxX = Math.max(line.leftCornerX, line.rightCornerX)
        let minY = Math.min(line.leftCornerY, line.rightCornerY)
        let maxY = Math.max(line.leftCornerY, line.rightCornerY)

        if(minX <= this.x) this.x = minX
        if(maxX >= this.x + this.width) this.x = maxX - this.width
        if(minY <= this.y) this.y = minY
        if(maxY >= this.y + this.height) this.y = maxY - this.height
    }
}
Area.prototype.move = move

for (let i = 0; i < areaNum; i++){
    areas.push(new Area())
}

export function updateAreas(ctx){
    for(const area of areas){
        area.update(ctx)
    }
}