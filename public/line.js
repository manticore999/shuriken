import { pressedKeys } from './input.js'
import { enemies } from './area.js'

export let line = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    width: 10,
    moveSpeed: 15,
    theta: 0,
    spinSpeed: 0.1,
    rightCornerX: 0,
    rightCornerY: 0,
    leftCornerX: 0,
    leftCornerY: 0,
    created: false,

    update(ctx){
        this.spin()
        this.draw(ctx)
        this.collision(ctx)
        if(!this.created) this.created = true
    },

    set(){
        let speed = {
          spin: this.spinSpeed,
          move: this.moveSpeed
        }

        if(pressedKeys.shift){
          speed.spin = this.spinSpeed / 2
          speed.move = this.moveSpeed / 2
        }

        else if(!pressedKeys.shift){
          speed.spin = this.spinSpeed
          speed.move = this.moveSpeed
        }
  
        return speed
    },

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.rightCornerX, this.rightCornerY);
        ctx.lineTo(this.leftCornerX, this.leftCornerY);
        ctx.lineWidth = this.width;
        ctx.closePath();
        ctx.strokeStyle = "black"
        ctx.stroke();
    },

    spin(){
        const lineSpeed = line.set()
        if(pressedKeys.z) this.theta -= lineSpeed.spin
        else if (pressedKeys.x) this.theta += lineSpeed.spin
        else this.theta += 0

        this.rightCornerX = (this.x) + (this.size * Math.cos(this.theta))
        this.rightCornerY = (this.y) + (this.size * Math.sin(this.theta))
        this.leftCornerX = (this.x) - (this.size * Math.cos(this.theta))
        this.leftCornerY = (this.y) - (this.size * Math.sin(this.theta))
    },

    collision(){
        for (const enemy of enemies){
            if (enemy.collision) {
                this.moveSpeed = 0
                // console.log("collision")
            }
        }
    }
}