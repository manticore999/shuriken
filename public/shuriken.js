import { line } from './line.js'
import { move } from './move.js'
import { enemies } from './area.js'

class Triangle {
	constructor(path, circSize, dir) {
		this.dir = dir;
		this.circSize = circSize;
		this.size = 5;
		this.color = "red";
		this.path = path
		this.width = Math.PI / 2
	}

	draw(ctx) {
		ctx.beginPath();
		this.path.moveTo(this.circSize * this.size * Math.cos(this.dir), this.circSize * this.size * Math.sin(this.dir));
		this.path.lineTo(this.circSize * (Math.cos(this.dir - this.width)), this.circSize * (Math.sin(this.dir - this.width)));
		this.path.lineTo(this.circSize * (Math.cos(this.dir + this.width)), this.circSize * (Math.sin(this.dir + this.width)));
		ctx.fillStyle = this.color;
		ctx.fill(this.path);
		this.path.closePath();
	}
}

export class Enemy {
    constructor(areaX, areaY, areaWidth, areaHeight, size, triangleSize, spinSpeed, moveSpeed, triangleNum){
		this.size = size;
		this.x = Math.random() * (areaWidth - this.size * 2) + areaX + this.size;
		this.y = Math.random() * (areaHeight - this.size * 2) + areaY + this.size;
		this.color = "black";
		this.angle = 0;
		this.velX = 0;
		this.velY = 0;
		this.spinSpeed = spinSpeed;
		this.moveSpeed = moveSpeed;
		this.collision = false;
		this.circle = new Path2D();
		this.trianlgePath = new Path2D();
		this.triangles = [];
		this.triangleNum = triangleNum;
		this.triangleSize = triangleSize;
    }

    update(ctx, area){
        this.sMove(area)
        this.draw(ctx)
    }

    createTriangles() {
		let theta = 0;
		
		for (let i = 0; i < this.triangleNum; i++) {
			theta += (2 * Math.PI) / this.triangleNum;
			let newTriangle = new Triangle(this.trianlgePath, this.size, theta)
			newTriangle.width = Math.PI / this.triangleNum
			this.triangles.push(newTriangle);
		}
    }

    direction(){
		let angle = Math.random() * Math.PI * 2;
		this.velX = Math.cos(angle) * this.moveSpeed;
		this.velY = Math.sin(angle) * this.moveSpeed;
    }

    sMove(area){
		const minX = Math.min(line.leftCornerX, line.rightCornerX)
		const maxX = Math.max(line.leftCornerX, line.rightCornerX)
		const minY = Math.min(line.leftCornerY, line.rightCornerY)
		const maxY = Math.max(line.leftCornerY, line.rightCornerY)

		const m = move()
		if(minX > area.x - area.safeZoneWidth && maxX < area.x + area.width + area.safeZoneWidth) this.x += m.x
		if(minY > area.y && maxY < area.y + area.height) this.y += m.y

		if(this.x + this.size >= area.x + area.width || this.x - this.size <= area.x) this.velX *= -1;
		if(this.y + this.size >= area.y + area.height || this.y - this.size <= area.y) this.velY *= -1;

		this.x += this.velX;
		this.y += this.velY;
    }

	isColliding(ctx){
		const collision = 
			(ctx.isPointInPath(this.trianlgePath, line.leftCornerX, line.leftCornerY) ||
			ctx.isPointInPath(this.trianlgePath, line.rightCornerX, line.rightCornerY)) &&
			(!ctx.isPointInPath(this.circle, line.leftCornerX, line.leftCornerY) &&
			!ctx.isPointInPath(this.circle, line.rightCornerX, line.rightCornerY))
		return collision
	}

    draw(ctx){
        this.angle += this.spinSpeed;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);

        for (const triangle of this.triangles) triangle.draw(ctx)

        this.circle = new Path2D()
        ctx.fillStyle = this.color;
        this.circle.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill(this.circle);
        this.circle.closePath();
        ctx.stroke(this.circle);

        this.collision = this.isColliding(ctx)
		console.log()
        ctx.restore();

		for (const triangle of this.triangles) triangle.path = new Path2D()
		this.trianlgePath = new Path2D()
    }
    
}

export function updateEnemies(ctx, area){
	for(let i = 0; i < enemies.length; i++){
		enemies[i].update(ctx, area)
	}
}