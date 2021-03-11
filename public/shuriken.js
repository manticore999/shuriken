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

	draw(ctx, path) {
		ctx.beginPath();
		path.moveTo(this.circSize * this.size * Math.cos(this.dir), this.circSize * this.size * Math.sin(this.dir));
		path.lineTo(this.circSize * (Math.cos(this.dir - this.width)), this.circSize * (Math.sin(this.dir - this.width)));
		path.lineTo(this.circSize * (Math.cos(this.dir + this.width)), this.circSize * (Math.sin(this.dir + this.width)));
		ctx.fillStyle = this.color;
		ctx.fill(path);
		path.closePath();

		this.pointX = this.circSize * this.size * Math.cos(this.dir)
		this.pointY = this.circSize * this.size * Math.sin(this.dir)
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
		this.trianglePath = new Path2D();
		this.triangles = [];
		this.triangleNum = triangleNum;
		this.triangleSize = triangleSize;
    }

    update(ctx, area, m, line){
        this.sMove(ctx, area, m, line)
        this.draw(ctx, line, area)
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
		const minX = Math.min(line.leftCornerX, line.rightCornerX)
		const maxX = Math.max(line.leftCornerX, line.rightCornerX)
		const minY = Math.min(line.leftCornerY, line.rightCornerY)
		const maxY = Math.max(line.leftCornerY, line.rightCornerY)
		const lineSpeed = line.set()

		if(minX > area.x - area.safeZoneWidth && maxX < area.x + area.width + area.safeZoneWidth) this.x += m.x * lineSpeed.move
		if(minY > area.y && maxY < area.y + area.height) this.y += m.y * lineSpeed.move

		if(this.x + this.size >= area.x + area.width || this.x - this.size <= area.x) this.velX *= -1
		if(this.y + this.size >= area.y + area.height || this.y - this.size <= area.y) this.velY *= -1

		this.x += this.velX;
		this.y += this.velY;
    }

	isColliding(ctx, line){
		const collision = 
			(ctx.isPointInPath(this.trianglePath, line.leftCornerX, line.leftCornerY) ||
			ctx.isPointInPath(this.trianglePath, line.rightCornerX, line.rightCornerY)) &&
			(!ctx.isPointInPath(this.circle, line.leftCornerX, line.leftCornerY) &&
			!ctx.isPointInPath(this.circle, line.rightCornerX, line.rightCornerY))
		return collision
	}

	drawCircle(ctx){
		this.circle = new Path2D()
        ctx.fillStyle = this.color;
        this.circle.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill(this.circle);
        this.circle.closePath();
        ctx.stroke(this.circle);
	}

    draw(ctx, line, area){
        this.angle += this.spinSpeed

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * Math.PI / 180)

		for(const triangle of this.triangles){
			if(ctx.isPointInPath(area.safeZonePathLeft, this.x + triangle.pointX, this.y + triangle.pointY) ||
			ctx.isPointInPath(area.safeZonePathRight, this.x + triangle.pointX, this.y + triangle.pointY)) this.velX *= -1
			triangle.draw(ctx, this.trianglePath)
		}
		this.drawCircle(ctx)

        this.collision = this.isColliding(ctx, line)
        ctx.restore()

		this.trianglePath = new Path2D()
    }   
}

export function updateEnemies(ctx, area, m, line){
	for(let i = 0; i < area.enemies.length; i++){
		area.enemies[i].update(ctx, area, m, line)
	}
}