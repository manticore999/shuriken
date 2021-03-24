export class Line {
    constructor(){
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.size = 50
        this.width = 5
        this.moveSpeed = 15
        this.theta = 0
        this.spinSpeed = 0.05
        this.rightCornerX = canvas.width / 2 + this.size
        this.rightCornerY = canvas.height / 2
        this.leftCornerX = canvas.width / 2 - this.size
        this.leftCornerY = canvas.height / 2
        this.created = false
        this.areaOn = 0
        this.alive = true
    }

    update(ctx, z, x, shift, map, m){
        this.spin(z, x, shift)
        this.draw(ctx)
        this.move(m, shift, map)
        this.collision(map)
        if(!this.created) this.created = true
    }

    set(shift){
        let speed = {
          spin: this.spinSpeed,
          move: this.moveSpeed
        }

        if(shift){
          speed.spin = this.spinSpeed / 2
          speed.move = this.moveSpeed / 2
        }

        else if(shift){
          speed.spin = this.spinSpeed
          speed.move = this.moveSpeed
        }
  
        return speed
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (this.size * Math.cos(this.theta)), canvas.height / 2 + (this.size * Math.sin(this.theta)));
        ctx.lineTo(canvas.width / 2 - (this.size * Math.cos(this.theta)), canvas.height / 2 - (this.size * Math.sin(this.theta)));
        ctx.lineWidth = this.width;
        ctx.closePath();
        ctx.strokeStyle = "brown"
        ctx.stroke();
    }

    spin(z, x, shift){
        const lineSpeed = this.set(shift)
        if(z) this.theta -= lineSpeed.spin
        else if (x) this.theta += lineSpeed.spin
        else this.theta += 0

        this.rightCornerX = (this.x) + (this.size * Math.cos(this.theta))
        this.rightCornerY = (this.y) + (this.size * Math.sin(this.theta))
        this.leftCornerX = (this.x) - (this.size * Math.cos(this.theta))
        this.leftCornerY = (this.y) - (this.size * Math.sin(this.theta))
    }

    move(m, shift, map){
        const lineSpeed = this.set(shift)

        const minX = Math.min(this.leftCornerX, this.rightCornerX)
        const maxX = Math.max(this.leftCornerX, this.rightCornerX)
        const minY = Math.min(this.leftCornerY, this.rightCornerY)
        const maxY = Math.max(this.leftCornerY, this.rightCornerY)

        if(m.x) this.x += m.x * lineSpeed.move
        if(m.y) this.y += m.y * lineSpeed.move
        // console.log(minX < map[this.areaOn].x - map[this.areaOn].safeZoneWidth, this.x - minX)
        if(minX < map[this.areaOn].x - map[this.areaOn].safeZoneWidth) this.x = map[this.areaOn].x - map[this.areaOn].safeZoneWidth + this.x - minX
        if(maxX > map[this.areaOn].x + map[this.areaOn].width + map[this.areaOn].safeZoneWidth) this.x = map[this.areaOn].x + map[this.areaOn].width + map[this.areaOn].safeZoneWidth + this.x - maxX
        if(minY < map[this.areaOn].y) this.y = map[this.areaOn].y + this.y - minY
        if(maxY > map[this.areaOn].y + map[this.areaOn].height) this.y = map[this.areaOn].y + map[this.areaOn].height
    }

    collision(map){
        for (const enemy of map[this.areaOn].enemies){
            if (enemy.collision) {
                this.alive = false
                this.moveSpeed = 0
            }
        }
    }
}