class Puck {
    constructor(ctx){
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "images/sprites/puck.png";
        

        this.x = 750;
        this.y = 300;
        this.maxVelocity = 3;
        this.Xvelocity = 0;
        this.Yvelocity = 0;
    }

    tick() {




        this.ctx.drawImage(this.image, this.x, this.y, 20, 20);
        this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        this.ctx.fill();
        return true;
    }
}