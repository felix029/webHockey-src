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
        this.tempDirection = "none";
        this.reboundResetTimer = 5;

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

    rebound(){

        if(this.direction !== "rebound"){
            if(this.direction == "up"){
                this.Yvelocity = Math.abs(this.Yvelocity);
                this.tempDirection = "down";
            }
            if(this.direction == "down"){
                this.Yvelocity = -this.Yvelocity;
                this.tempDirection = "up";
            }
            if(this.direction == "left"){
                this.Xvelocity = Math.abs(this.Xvelocity);
                this.tempDirection = "right";
            }
            if(this.direction == "right"){
                this.Xvelocity = -this.Xvelocity;
                this.tempDirection = "left";
            }
            

            this.direction = "rebound";
        }
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
                this.x+=5;
                this.y-=20;
                this.Yvelocity = -force;
            }
            if(this.direction == "down"){
                this.x+=5;
                this.y+=20;
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
                this.Yvelocity -= 0.1;
            }
            if(this.Yvelocity < 0){
                this.y += this.Yvelocity;
                this.Yvelocity += 0.1;
            }
        }

        if(this.direction == "rebound"){
            if(this.reboundResetTimer > 0){
                this.reboundResetTimer--;
            }
            else{
                this.reboundResetTimer = 5;
                this.direction = this.tempDirection;
                this.tempDirection = "none";
            }
        }

        if(Math.abs(this.Xvelocity) <= 0.1){
            this.Xvelocity = 0;
        }
        
        if(Math.abs(this.Yvelocity) <= 0.1){
            this.Yvelocity = 0;
        }

        rink.puckCollision(this.x, this.y, this.direction)

        // console.log(this.x + " " + this.y);
        if(imgPuck.complete){
            ctx.drawImage(imgPuck, this.x-9, this.y-9, 18, 18);
        }

        return true;
    }
}