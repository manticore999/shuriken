import { Enemy, updateEnemies } from './shuriken.js'

const canvas = document.querySelector("canvas")
const areaNum = 10
export const map = []

class Area {
    constructor(){
        this.width = 3000
        this.height = 500
        // this.x = (canvas.width - this.width) / 2
        // this.y = (canvas.height - this.height) / 2
        this.safeZoneWidth = this.height / 2
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.enemyNum = 1
        this.enemies = []
        this.path = new Path2D()
        this.safeZonePathLeft = new Path2D()
        this.safeZonePathRight = new Path2D()
        this.teleporterPathLeft = new Path2D()
        this.teleporterPathRight = new Path2D()
        this.teleporterWidth = this.safeZoneWidth / 2
        this.spawned = false
    }

    update(ctx, line){
        this.draw(ctx, line)
        this.teleport(ctx, line)
    }

    draw(ctx, line){
        // console.log(this.x, this.y, line.x + canvas.width / 2, line.y, this.x - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2)
        this.path = new Path2D()
        ctx.beginPath();
        this.path.rect(this.x - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.width, this.height);
        ctx.fillStyle = "Bisque";
        ctx.fill(this.path);
        this.path.closePath();

        this.safeZonePathLeft = new Path2D()
        ctx.beginPath();
        this.safeZonePathLeft.rect(this.x - this.safeZoneWidth - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fill(this.safeZonePathLeft);
        ctx.closePath(this.safeZonePathLeft);

        this.safeZonePathRight = new Path2D()
        ctx.beginPath();
        this.safeZonePathRight.rect(this.x + this.width - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fill(this.safeZonePathRight);
        ctx.closePath(this.safeZonePathRight);

        this.teleporterPathLeft = new Path2D()
        ctx.beginPath();
        this.teleporterPathLeft.rect(this.x - this.safeZoneWidth - this.teleporterWidth - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.teleporterWidth, this.height);
        ctx.fillStyle = 'yellow';
        ctx.fill(this.teleporterPathLeft);
        this.teleporterPathLeft.closePath();

        this.teleporterPathRight = new Path2D()
        ctx.beginPath();
        this.teleporterPathRight.rect(this.x + this.width + this.safeZoneWidth - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.teleporterWidth, this.height);
        ctx.fillStyle = 'yellow';
        ctx.fill(this.teleporterPathRight);
        this.teleporterPathRight.closePath();

        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "black";
        ctx.fill()
    }

    teleport(ctx, line){
        // console.log((ctx.isPointInPath(this.teleporterPathLeft, line.leftCornerX, line.leftCornerY) ||
        // ctx.isPointInPath(this.teleporterPathLeft, line.rightCornerX, line.rightCornerY)) && map[line.areaOn - 1],
        // (ctx.isPointInPath(this.teleporterPathRight, line.leftCornerX, line.leftCornerY) ||
        // ctx.isPointInPath(this.teleporterPathRight, line.rightCornerX, line.rightCornerY)) && map[line.areaOn + 1])

        const minX = Math.min(line.leftCornerX, line.rightCornerX)
        const maxX = Math.max(line.leftCornerX, line.rightCornerX)
        const minY = Math.min(line.leftCornerY, line.rightCornerY)
        const maxY = Math.max(line.leftCornerY, line.rightCornerY)
        // console.log(minX < this.x - this.safeZoneWidth - line.x + canvas.width / 2, maxX > this.x - this.safeZoneWidth - line.x + canvas.width / 2 + this.teleporterWidth)
        console.log(minX, this.x - this.safeZoneWidth, maxX, this.x - this.safeZoneWidth + this.width)

        if(minX < this.x - this.safeZoneWidth - line.x + canvas.width / 2 && map[line.areaOn - 1]) line.areaOn--
        if(maxX > this.x - this.safeZoneWidth - line.x + canvas.width / 2 + this.teleporterWidth && map[line.areaOn + 1]) line.areaOn++

        // if((ctx.isPointInPath(this.teleporterPathLeft, line.leftCornerX, line.leftCornerY) ||
        // ctx.isPointInPath(this.teleporterPathLeft, line.rightCornerX, line.rightCornerY)) && map[line.areaOn - 1]) line.areaOn--

        // else if((ctx.isPointInPath(this.teleporterPathRight, line.leftCornerX, line.leftCornerY) ||
        // ctx.isPointInPath(this.teleporterPathRight, line.rightCornerX, line.rightCornerY)) && map[line.areaOn + 1]) line.areaOn++

    }

    spawner(size, triangleSize, spinSpeed, moveSpeed, triangleNum){
        for(let i = 0; i < this.enemyNum; i++){
            const newEnemy = new Enemy(this.x, this.y, this.width, this.height, size, triangleSize, spinSpeed, moveSpeed, triangleNum)
            newEnemy.createTriangles()
            newEnemy.direction()
            // console.log(newEnemy)
            this.enemies.push(newEnemy)
            // console.log(this.enemies[0].x, this.enemies[0].y)
            this.spawned = true
        }
    }
}

for (let i = 0; i < areaNum; i++) map.push(new Area())

export function updateAreas(ctx, area, m, line){
    area.update(ctx, line)
    updateEnemies(ctx, area, m, line)
}