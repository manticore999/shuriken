class Triangle {
	constructor(circSize, dir) {
		this.dir = dir;
		this.circSize = circSize;
		this.size = 5;
		this.color = "red";
		this.width = Math.PI / 2
		this.pointX = 0
		this.pointY = 0
	}

	draw(ctx, path, angle, circX, circY, line) {
		this.angle = angle
		this.circX = circX
        this.circY = circY

		ctx.beginPath();
		path.moveTo(this.circX  - line.x + canvas.width / 2 + this.circSize * this.size *  Math.cos(this.angle + this.dir), this.circY - line.y + canvas.height / 2 + this.circSize * this.size *  Math.sin(this.angle + this.dir));
		path.lineTo(this.circX  - line.x + canvas.width / 2 + this.circSize * (Math.cos(this.angle + this.dir - this.width)), this.circY - line.y + canvas.height / 2 + this.circSize * (Math.sin(this.angle + this.dir - this.width)));
		path.lineTo(this.circX  - line.x + canvas.width / 2 + this.circSize * (Math.cos(this.angle + this.dir + this.width)), this.circY - line.y + canvas.height / 2 + this.circSize * (Math.sin(this.angle + this.dir + this.width)));
		ctx.fillStyle = this.color;
		ctx.fill(path);
		path.closePath();

		this.pointX = this.circX + this.circSize * this.size *  Math.cos(this.angle + this.dir)
		this.pointY = this.circY + this.circSize * this.size *  Math.sin(this.angle + this.dir)
	}
}

export class Enemy {
    constructor(areaX, areaY, areaWidth, areaHeight, size, triangleSize, spinSpeed, moveSpeed, triangleNum){
		this.size = size;
		// console.log(areaWidth, areaHeight, this.size, areaX, areaY)
		this.x = Math.random() * (areaWidth - this.size * 2) + areaX + this.size;
		this.y = Math.random() * (areaHeight - this.size * 2) + areaY + this.size;
		this.color = "black";
		this.angle = Math.random() * 360;
		this.velX = 0;
		this.velY = 0;
		this.spinSpeed = spinSpeed;
		this.moveSpeed = moveSpeed;
		this.collision = false;
		this.circle = new Path2D();
		this.trianglePath = new Path2D();
		this.triangles = [];
		this.triangleNum = triangleNum;
		this.triangleSize = triangleSize;
    }

    update(ctx, area, m, line){
        this.sMove(ctx, area, m, line)
		// console.log(this.x, this.y)
        this.draw(ctx, area, line)
		this.isColliding(ctx, line)
		this.trianglePath = new Path2D()
    }

    createTriangles() {
		let theta = 0;
		for (let i = 0; i < this.triangleNum; i++) {
			theta += (2 * Math.PI) / this.triangleNum;
			let newTriangle = new Triangle(this.size, theta)
			newTriangle.width = Math.PI / this.triangleNum
			this.triangles.push(newTriangle);
		}
    }

    direction(){
		let angle = Math.random() * Math.PI * 2;
		this.velX = Math.cos(angle) * this.moveSpeed;
		this.velY = Math.sin(angle) * this.moveSpeed;
    }

    sMove(ctx, area, m, line){
		if(this.x + this.size >= area.x + area.width || this.x - this.size <= area.x) this.velX *= -1
		if(this.y + this.size >= area.y + area.height || this.y - this.size <= area.y) this.velY *= -1
		
		this.x += this.velX;
		this.y += this.velY;
    }

	isColliding(ctx, line){
		this.collision = 
			(ctx.isPointInPath(this.trianglePath, line.leftCornerX, line.leftCornerY) ||
			ctx.isPointInPath(this.trianglePath, line.rightCornerX, line.rightCornerY)) &&
			(!ctx.isPointInPath(this.circle, line.leftCornerX, line.leftCornerY) &&
			!ctx.isPointInPath(this.circle, line.rightCornerX, line.rightCornerY))
		return this.collision
	}

	drawCircle(ctx, line){
		this.circle = new Path2D()
		ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        this.circle.arc(this.x - line.x + canvas.width / 2, this.y - line.y + canvas.height / 2, this.size, 0, Math.PI * 2);
        ctx.fill(this.circle);
        this.circle.closePath();
        ctx.stroke(this.circle);
	}

    draw(ctx, area, line){
        this.angle += this.spinSpeed * Math.PI / 180;

		for(const triangle of this.triangles){
			if(ctx.isPointInPath(area.safeZonePathLeft, triangle.pointX, triangle.pointY)) this.x++
			else if (ctx.isPointInPath(area.safeZonePathRight, triangle.pointX, triangle.pointY)) this.x--
			// if(ctx.isPointInPath(area.safeZonePathLeft, triangle.pointX, triangle.pointY)) console.log("a")
			// else if(ctx.isPointInPath(area.safeZonePathRight, triangle.pointX, triangle.pointY)) console.log("a")
			triangle.draw(ctx, this.trianglePath, this.angle, this.x, this.y, line)
		}
		this.drawCircle(ctx, line)
    }
}

export function updateEnemies(ctx, area, m, line){
	for(let i = 0; i < area.enemies.length; i++){
		area.enemies[i].update(ctx, area, m, line)
	}
}