import { Enemy, updateEnemies } from './shuriken.js'

const canvas = document.querySelector("canvas")
const areaNum = 10
export const map = []

class Area {
    constructor(){
        this.width = 3000
        this.height = 500
        this.x = (canvas.width - this.width) / 2
        this.y = (canvas.height - this.height) / 2
        this.safeZoneWidth = this.height / 2
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

    update(ctx, m, line){
        this.draw(ctx)
        this.aMove(m, line)
        this.teleport(ctx, line)
    }

    draw(ctx){
        this.path = new Path2D()
        ctx.beginPath();
        this.path.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "Bisque";
        ctx.fill(this.path);
        this.path.closePath();

        this.safeZonePathLeft = new Path2D()
        ctx.beginPath();
        ctx.rect(this.x - this.safeZoneWidth, this.y, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'Bisque';
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.safeZonePathLeft.arc(this.x - this.safeZoneWidth, this.y + this.height / 2, this.safeZoneWidth, Math.PI * 1.5, Math.PI * 0.5);
        this.safeZonePathLeft.lineTo(this.x - this.safeZoneWidth, this.y)
        // ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fillStyle = 'black';
        ctx.fill(this.safeZonePathLeft);
        this.safeZonePathLeft.closePath();

        this.safeZonePathRight = new Path2D()
        ctx.beginPath();
        ctx.rect(this.x + this.width, this.y, this.safeZoneWidth, this.height);
        ctx.fillStyle = 'Bisque';
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.safeZonePathRight.arc(this.x + this.width + this.safeZoneWidth, this.y + this.height / 2, this.safeZoneWidth, Math.PI * 0.5, Math.PI * 1.5);
        this.safeZonePathRight.lineTo(this.x + this.width + this.safeZoneWidth, this.y)
        // ctx.fillStyle = 'rgb(200, 175, 150)';
        ctx.fillStyle = 'black';
        ctx.fill(this.safeZonePathRight);
        this.safeZonePathRight.closePath();

        this.teleporterPathLeft = new Path2D()
        ctx.beginPath();
        this.teleporterPathLeft.arc(this.x - this.safeZoneWidth, this.y + this.height / 2, this.teleporterWidth, Math.PI * 1.5, Math.PI * 0.5);
        ctx.fillStyle = 'yellow';
        ctx.fill(this.teleporterPathLeft);
        this.teleporterPathLeft.closePath();

        this.teleporterPathRight = new Path2D()
        ctx.beginPath();
        this.teleporterPathRight.arc(this.x + this.width + this.safeZoneWidth, this.y + this.height / 2, this.teleporterWidth, Math.PI * 0.5, Math.PI * 1.5);
        ctx.fillStyle = 'yellow';
        ctx.fill(this.teleporterPathRight);
        this.teleporterPathRight.closePath();
    }

    aMove(m, line){
        // console.log(line)
        const lineSpeed = line.set()
        if(m.x) this.x += m.x * lineSpeed.move
        if(m.y) this.y += m.y * lineSpeed.move

        const minX = Math.min(line.leftCornerX, line.rightCornerX)
        const maxX = Math.max(line.leftCornerX, line.rightCornerX)
        const minY = Math.min(line.leftCornerY, line.rightCornerY)
        const maxY = Math.max(line.leftCornerY, line.rightCornerY)

        if(minX <= this.x - this.safeZoneWidth) this.x = minX + this.safeZoneWidth
        if(maxX >= this.x + this.width + this.safeZoneWidth) this.x = maxX - this.width - this.safeZoneWidth
        if(minY <= this.y) this.y = minY
        if(maxY >= this.y + this.height) this.y = maxY - this.height

    }

    teleport(ctx, line){

        if((ctx.isPointInPath(this.teleporterPathLeft, line.leftCornerX, line.leftCornerY) ||
        ctx.isPointInPath(this.teleporterPathLeft, line.rightCornerX, line.rightCornerY)) && map[line.areaOn - 1]) line.areaOn--

        else if((ctx.isPointInPath(this.teleporterPathRight, line.leftCornerX, line.leftCornerY) ||
        ctx.isPointInPath(this.teleporterPathRight, line.rightCornerX, line.rightCornerY)) && map[line.areaOn + 1]) line.areaOn++

    }

    spawner(size, triangleSize, spinSpeed, moveSpeed, triangleNum){
        for(let i = 0; i < this.enemyNum; i++){
            const newEnemy = new Enemy(this.x, this.y, this.width, this.height, size, triangleSize, spinSpeed, moveSpeed, triangleNum)
            newEnemy.createTriangles()
            newEnemy.direction()
            this.enemies.push(newEnemy)
            this.spawned = true
        }
    }
}

for (let i = 0; i < areaNum; i++){
    map.push(new Area())
}

export function updateAreas(ctx, area, m, line){
    area.update(ctx, m, line)
    updateEnemies(ctx, area, m, line)
    // console.log(area, area.x, area.y)
}