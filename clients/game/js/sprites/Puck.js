let puckFree = true;
let imgPuck = new Image();

class Puck {
    constructor(){
        this.type = "puck";
        
        imgPuck.src = "images/sprites/puck.png";
        
        this.x = 750;
        this.y = 300;
        this.maxVelocity = 3;
        this.Xvelocity = 0;
        this.Yvelocity = 0;

        this.direction = "none";

    }

    collision(x, y){
        let collision = false;
        
        if(puckFree){
            let player = [ [(x-20),(y-20)], [(x+20),(y-20)], [(x+20), (y+23)], [(x-20), (y-23)] ];
            collision = inside([this.x-5,this.y-5], player);
            if(collision){
                puckFree = false;
            }
        }

        return collision;
    }

    move(x, y, force){
        //skating with the puck
        if(force == 0){
            if(this.direction == "up"){
                this.x = x+20;
                this.y = y+16;

            }
            if(this.direction == "down"){
                this.x = x+14;
                this.y = y+23;
            }
            if(this.direction == "left"){
                this.x = x-25;
                this.y = y+20;
            }
            if(this.direction == "right"){
                this.x = x+25;
                this.y = y+20;
            }
        }
        //pass
        if(force == 5){
            puckFree = true;
        }
        //shot
        if(force == 10){
            puckFree = true;
            if(this.direction == "up"){
                this.y-=5;
                this.Yvelocity = -force;
            }
            if(this.direction == "down"){
                this.y-=5;
                this.Yvelocity = force;
            }
            if(this.direction == "left"){
                this.x-=5;
                this.Xvelocity = -force;
            }
            if(this.direction == "right"){
                this.x+=5;
                this.Xvelocity = force;
            }
        }
    }

    tick() {

        if(puckFree){
            if(this.Xvelocity > 0){
                this.x += this.Xvelocity;
                this.Xvelocity -= 0.1;
            }
            if(this.Xvelocity < 0){
                this.x += this.Xvelocity;
                this.Xvelocity += 0.1;
            }
            if(this.Yvelocity > 0){
                this.y += this.Yvelocity;
                this.Xvelocity -= 0.1;
            }
            if(this.Yvelocity < 0){
                this.y += this.Yvelocity;
                this.Xvelocity += 0.1;
            }
        }

        if(Math.abs(this.Xvelocity) <= 0.1){
            this.Xvelocity = 0;
        }
        
        if(Math.abs(this.Yvelocity) <= 0.1){
            this.Yvelocity = 0;
        }

        if(imgPuck.complete){
            ctx.drawImage(imgPuck, this.x-9, this.y-9, 18, 18);
        }
        
        //GREY TRANSPARENT HALO BEHIND THE PUCK TO MAKE IT MORE VISIBLE
        //FOR SOME REASONS ctx.fill() SLOWS DOWN THE GAME DRASTICALLY
        // ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI)
        // ctx.fillStyle = "rgba(10, 10, 10, 0.3)"
        // ctx.fill();
        
        return true;
    }
}