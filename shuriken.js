import { line } from './line.js'
import { move } from './move.js'
import { areas } from './area.js'

const area = areas[0]
export const enemies = [];
let enemyNum = 1;

class Enemy {
    constructor(){
      this.x = Math.random() * area.width + area.x;
      this.y = Math.random() * area.height + area.y;
      this.size = 50;
      this.triangleSize = 5
      this.color1 = "black";
      this.color2 = "red";
      this.angle = 0;
      this.velX = 0;
      this.velY = 0;
      this.spinSpeed = 0.5;
      this.moveSpeed = 2;
      this.collision = false;
      this.circle = new Path2D();
      this.triangles = new Path2D();
    }

    update(ctx){
        this.sMove()
        this.draw(ctx)
    }

    triangleLeft(){
      this.triangles.moveTo((-this.size * this.triangleSize), 0);
      this.triangles.lineTo(0, (0 - this.size));
      this.triangles.lineTo(0, (0 + this.size));
    }

    triangleRight(){
      this.triangles.moveTo((this.size * this.triangleSize), 0);
      this.triangles.lineTo(0, (0 - this.size));
      this.triangles.lineTo(0, (0 + this.size));
    }

    triangleUp(){
      this.triangles.moveTo(0, (-this.size * this.triangleSize));
      this.triangles.lineTo((0 - this.size), 0);
      this.triangles.lineTo((0 + this.size), 0);
    }

    triangleDown(){
      this.triangles.moveTo(0, (this.size * this.triangleSize));
      this.triangles.lineTo((0 - this.size), 0);
      this.triangles.lineTo((0 + this.size), 0);
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
      // this.triangleUp()
      // this.triangleDown()
    }

    direction(){
      let angle = Math.random() * Math.PI * 2;
      this.velX = Math.cos(angle) * this.moveSpeed;
      this.velY = Math.sin(angle) * this.moveSpeed;
    }

    sMove(){
      const m = move()
      this.x += m.x
      this.y += m.y

      if(this.x + this.size >= area.x + area.width || this.x - this.size <= area.x) this.velX *= -1;
      if(this.y + this.size >= area.y + area.height || this.y - this.size <= area.y) this.velY *= -1;
      this.x += this.velX;
      this.y += this.velY;
    }

    draw(ctx){
        this.angle += this.spinSpeed;
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

        this.collision = 
          (ctx.isPointInPath(this.triangles, line.leftCornerX, line.leftCornerY) ||
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
      enemies[i].direction()
    }
  }
  spawnEnemies()

  export function updateEnemies(ctx){
    for(let i = 0; i < enemies.length; i++){
      enemies[i].update(ctx)
    }
  }
