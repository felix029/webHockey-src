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

        this.targetX = 0;
        this.targetY = 0;
        this.forcePassX = 0;
        this.forcePassY = 0;

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

    saved(x, y){
        let saved = false;

        let goalie = {x: x-22, y: y+40, w: 42, h: 65};
        let puck = {x: this.x-9, y: this.y-9, w: 18, h: 18};
        saved = boxCollision(puck, goalie);
        
        if(saved){
            if(this.y < 300){
                this.Yvelocity = -Math.floor(Math.random() * 8);
                this.direction = "up";
            }
            else{
                this.Yvelocity = Math.floor(Math.random() * 8);
                this.direction = "down";
            }
            this.Xvelocity = -this.Xvelocity;
        }

        return saved;
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

        gBlue.puckIncoming = false;
        gRed.puckIncoming = false;
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
        //shot
        if(force == 10){
            puckFree = true;
            
            if(this.direction == "up"){
                this.x+=10;
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

    pass(x, y, tx, ty){
        puckFree = true;
        this.targetX = tx;
        this.targetY = ty;
        console.log(tx + " " + ty);
        let distX = tx - x;
        let distY = ty - y;
        let prct = 0;

        if(Math.abs(distX) > Math.abs(distY)){
            prct = Math.abs(distY) * 100 / Math.abs(distX);
            
            if(distX >= 0){
                this.forcePassX = 8;
            }
            else{
                this.forcePassX = -8;
            }

            if(distY >= 0){
                this.forcePassY = prct * 0.08;
            }
            else{
                this.forcePassY = -prct * 0.08;
            }
        }
        else{
            prct = Math.abs(distX) * 100 / Math.abs(distY);
            
            if(distY >= 0){
                this.forcePassY = 8;
            }
            else{
                this.forcePassY = -8;
            }

            if(distX >= 0){
                this.forcePassX = prct * 0.08;
            }
            else{
                this.forcePassX = -prct * 0.08;
            }
        }

        console.log(this.forcePassX +  " " + this.forcePassY);
    }

    tick() {

        if(puckFree){
            if(this.targetX != 0 && this.targetY != 0){
                this.Xvelocity = 0;
                this.Yvelocity = 0;
                if(this.x != this.targetX){
                    this.x+=this.forcePassX;
                }
                if(this.y != this.targetY){
                    this.y+=this.forcePassY;
                }
            }
            
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
        else{
            this.targetX = 0;
            this.targetY = 0;
            this.forcePassX = 0;
            this.forcePassY = 0;
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

        if(Math.abs(this.Xvelocity) <= 0.1 || !puckFree){
            this.Xvelocity = 0;
        }
        
        if(Math.abs(this.Yvelocity) <= 0.1 || !puckFree){
            this.Yvelocity = 0;
        }

        rink.puckCollision(this.x, this.y, this.direction)

        if(imgPuck.complete){
            ctx.drawImage(imgPuck, this.x-9, this.y-9, 18, 18);
        }

        return true;
    }
}