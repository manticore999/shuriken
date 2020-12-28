import { pressedKeys } from './input.js'
import { enemies } from './shuriken.js'

export let line = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    theta: 0,
    rotationSpeed: 0.05,
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
        pressedKeys.shift ? 
        this.theta += 0:
        this.theta += this.rotationSpeed;
        this.rightCornerX = (this.x) + (this.size * Math.cos(this.theta))
        this.rightCornerY = (this.y) + (this.size * Math.sin(this.theta))
        this.leftCornerX = (this.x) - (this.size * Math.cos(this.theta))
        this.leftCornerY = (this.y) - (this.size * Math.sin(this.theta))
    },

    move(){
        if(pressedKeys.right) {
            this.x += this.speed;
            if (this.x + this.size >= canvas.width) this.x = canvas.width - this.size;
        }
        if(pressedKeys.left) {
            this.x -= this.speed;
            if (this.x <= 0) this.x = 0;
        }
        if(pressedKeys.down) {
            this.y += this.speed;
            if (this.y + this.size >= canvas.height) this.y = canvas.height - this.size;
        }
        if(pressedKeys.up) {
            this.y -= this.speed;
            if (this.y <= 0) this.y = 0;
        }
    },

    collision(ctx){
        for (const enemy of enemies){
            if (enemy.collision) {
                console.log("colision")
            }
        }
    }
}