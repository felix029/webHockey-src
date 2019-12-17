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
            let player = {x: x-18, y: y-20, w: 34, h: 44};
            let puck = {x: this.x-9, y: this.y-9, w: 18, h: 18};
            collision = boxCollision(puck, player);
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

        // let collisionUp = false;
        // let collisionDown = false;
        // let collisionLeft = false;
        // let collisionRight = false;
        
        for(let i = 0; i < spriteList.length; i++){
            
            const sprite = spriteList[i];
            if(sprite.type === "rink"){
                //left
                if(sprite.puckCollision((this.x - Math.abs(this.Xvelocity)) - 1, this.y, "left")){
                    // collisionLeft = true;
                    this.Xvelocity = Math.abs(this.Xvelocity);
                }
                //right
                if(sprite.puckCollision((this.x + Math.abs(this.Xvelocity)) + 1, this.y, "right")){
                    // collisionRight = true;
                    this.Xvelocity = -this.Xvelocity;
                }
                //down
                if(sprite.puckCollision(this.x, (this.y + Math.abs(this.Yvelocity) + 1), "down")){
                    // collisionDown = true;
                    this.Yvelocity = Math.abs(this.Yvelocity);
                }
                //up
                if(sprite.puckCollision(this.x, (this.y - Math.abs(this.Yvelocity) - 1), "up")){
                    // collisionUp = true;
                    this.Yvelocity = -this.Yvelocity;
                }
            }
        }
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

        console.log('X:' + this.x + ' Y: ' + this.y);
        if(imgPuck.complete){
            ctx.drawImage(imgPuck, this.x-9, this.y-9, 18, 18);
        }
        
        return true;
    }
}