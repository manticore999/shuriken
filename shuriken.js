import { line } from './line.js'
export const enemies = [];
let enemyNum = 5;

export class Enemy {
    constructor(){
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.velX = 1;
      this.velY = 1;
      this.size = 50;
      this.color1 = "black";
      this.color2 = "red";
      this.angle = 0;
      this.speed = 1;
      this.collision = false;
      this.circle = new Path2D();
      this.triangles = new Path2D();
    }

    update(ctx){
        this.move()
        this.draw(ctx)
    }

    triangleLeft(){
      this.triangles.moveTo(-this.size * 3, 0);
      this.triangles.lineTo(0, 0 - this.size);
      this.triangles.lineTo(0, 0 + this.size);
    }

    triangleRight(){
      this.triangles.moveTo(this.size * 3, 0);
      this.triangles.lineTo(0, 0 - this.size);
      this.triangles.lineTo(0, 0 + this.size);
    }

    triangleUp(){
      this.triangles.moveTo(0, -this.size * 3);
      this.triangles.lineTo(0 - this.size, 0);
      this.triangles.lineTo(0 + this.size, 0);
    }

    triangleDown(){
      this.triangles.moveTo(this.size * 3, 0);
      this.triangles.lineTo(0, 0 - this.size);
      this.triangles.lineTo(0, 0 + this.size);
    }

    drawTriangle(triangle, ctx){
      ctx.beginPath();
      ctx.fillStyle = this.color2;
      ctx.fill(triangle);
      triangle.closePath();
      ctx.lineWidth = 1;
      ctx.stroke(triangle);
    }
    
    create(){
      this.triangles = new Path2D();
      this.triangleLeft()
      this.triangleRight()
    }

    move(){
      this.x = this.x + this.velX;
      this.y = this.y + this.velY;

      if (this.x >= canvas.width - this.size || this.x <= this.size) this.velX *= -1;
      if (this.y >= canvas.height - this.size || this.y <= this.size) this.velY *= -1;
    }

    draw(ctx){
        this.angle += this.speed;
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);

        this.drawTriangle(this.triangles, ctx)
        this.drawTriangle(this.triangles, ctx)

        this.circle = new Path2D()
        ctx.fillStyle = this.color1;
        this.circle.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill(this.circle);
        this.circle.closePath();
        ctx.stroke(this.circle);

        this.collision = (ctx.isPointInPath(this.triangles, line.leftCornerX, line.leftCornerY) ||
        ctx.isPointInPath(this.triangles, line.rightCornerX, line.rightCornerX)) &&
        (!ctx.isPointInPath(this.circle, line.leftCornerX, line.leftCornerY) ||
        !ctx.isPointInPath(this.circle, line.rightCornerX, line.rightCornerY))

        ctx.restore();
    }
    
  }

  function spawnEnemies(){
    for(let i = 0; i < enemyNum; i++){
      enemies.push(new Enemy())
      enemies[i].create()
    }
  }
  spawnEnemies()

  export function updateEnemies(ctx){
    for(let i = 0; i < enemies.length; i++){
      enemies[i].update(ctx)
    }
  }
