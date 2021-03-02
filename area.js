export const area = {
    x: 0,
    y: 0,
    width: 2000,
    height: 500,

    draw(ctx){
        this.x = (canvas.width - this.width) / 2
        this.y = (canvas.height - this.height) / 2

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "Bisque";
        ctx.fill();
        ctx.closePath();
    }
}