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

    }

    tick() {
        if(imgPuck.complete){
            ctx.drawImage(imgPuck, this.x-5, this.y-5, 10, 10);
        }
        
        //GREY TRANSPARENT HALO BEHIND THE PUCK TO MAKE IT MORE VISIBLE
        //FOR SOME REASONS SLOWS DOWN THE GAME DRASTICALLY
        // ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI)
        // ctx.fillStyle = "rgba(10, 10, 10, 0.3)"
        // ctx.fill();
        
        return true;
    }
}