export class Line {
    constructor(){
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.size = 25
        this.width = 5
        this.moveSpeed = 15
        this.theta = 0
        this.spinSpeed = 0.1
        this.rightCornerX = canvas.width / 2 + this.size
        this.rightCornerY = canvas.height / 2
        this.leftCornerX = canvas.width / 2 - this.size
        this.leftCornerY = canvas.height / 2
        this.created = false
        this.areaOn = 0
    }

    update(ctx, z, x, shift, areas){
        // console.log(this.areaOn)
        this.spin(z, x, shift)
        this.draw(ctx)
        this.collision(areas)
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
        ctx.moveTo(this.rightCornerX, this.rightCornerY);
        ctx.lineTo(this.leftCornerX, this.leftCornerY);
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

    collision(areas){
        for (const enemy of areas[this.areaOn].enemies){
            if (enemy.collision) {
                this.moveSpeed = 0
            }
        }
    }
}