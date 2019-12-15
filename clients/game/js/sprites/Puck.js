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
        console.log(this.direction);
        console.log('in move');
        if(force == 0){
            console.log('in force 0');
            if(this.direction == "up"){
                console.log('in up');
                this.x = x+20;
                this.y = y+16;

            }
            if(this.direction == "down"){
                console.log('in down');
                this.x = x+14;
                this.y = y+23;
            }
            if(this.direction == "left"){
                console.log('in left');
                this.x = x-25;
                this.y = y+20;
            }
            if(this.direction == "right"){
                console.log('in right');
                this.x = x+25;
                this.y = y+20;
            }
        }
    }

    tick() {
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