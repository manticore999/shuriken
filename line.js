import { pressedKeys } from './input.js'
import { enemies } from './shuriken.js'

export let line = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    theta: 0,
    rotationSpeed: 0.1,
    speed: 10,
    rightCornerX: 0,
    rightCornerY: 0,
    leftCornerX: 0,
    leftCornerY: 0,

    update(ctx){
        this.draw(ctx)
        this.spin()
        this.move()
        this.collision(ctx)
    },

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.rightCornerX, this.rightCornerY);
        ctx.lineTo(this.leftCornerX, this.leftCornerY);
        ctx.lineWidth = 10;
        ctx.closePath();
        ctx.stroke();
    },

    spin(){
        if(pressedKeys.z) this.theta -= this.rotationSpeed
        else if (pressedKeys.x) this.theta += this.rotationSpeed
        else this.theta += 0
        this.rightCornerX = (this.x) + (this.size * Math.cos(this.theta))
        this.rightCornerY = (this.y) + (this.size * Math.sin(this.theta))
        this.leftCornerX = (this.x) - (this.size * Math.cos(this.theta))
        this.leftCornerY = (this.y) - (this.size * Math.sin(this.theta))
    },

    move(){
        const vec = { x: 0, y: 0 }
        if (pressedKeys.right) vec.x += 1
        if (pressedKeys.left) vec.x -= 1
        if (pressedKeys.down) vec.y += 1
        if (pressedKeys.up) vec.y -= 1
        const m = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
        if (m !== 0) {
          vec.x /= m
          vec.y /= m
        }

        this.x += this.speed * vec.x
        this.y += this.speed * vec.y
        if (this.x >= canvas.width) this.x = canvas.width
        if (this.x <= 0) this.x = 0;
        if (this.y >= canvas.height) this.y = canvas.height;
        if (this.y <= 0) this.y = 0;

    },

    collision(){
        for (const enemy of enemies){
            if (enemy.collision) {
                console.log("colision")
            }
        }
    }
}