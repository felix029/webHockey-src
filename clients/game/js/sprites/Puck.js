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
    
        this.free = true;
    }

    collision(x, y){
        let collision = false;
        
        if(this.free){
            let player = [ [(x-20),(y-20)], [(x+20),(y-20)], [(x+20), (y+23)], [(x-20), (y-23)] ];
            collision = Utils.inside([this.x-5,this.y-5], player);
            if(collision){
                this.free = false;
            }
        }

        return collision;
    }

    move(x, y, force){
        
    }

    tick() {

        this.ctx.drawImage(this.image, this.x-5, this.y-5, 10, 10);
        this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI)
        this.ctx.fillStyle = "rgba(10, 10, 10, 0.3)"
        this.ctx.fill();
        return true;
    }
}