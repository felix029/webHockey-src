
class Player{
    constructor(id, name, team){
        this.type = "player";

        this.id = id;
        this.name = name;
        this.team = team;
        this.initPos = {x: 0, y: 0};

        this.gotPuck = false;
        this.dizzy = false;
        this.dizzyCounter = 150;
        this.hitFrame = false;
        this.hitFrameCounter = 10;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.lastMove = "none";

        let columnCount = 2;
        let rowCount = 9;
        let refreshDelay = 200;
        let loopInColumns = true;
        let scale = 3.0;
        let spriteImg = "";

        this.maxVelocity = 3;
        this.Xvelocity = 0;
        this.Yvelocity = 0;

        //REMOVE AFTER TESTS ******************************************
<<<<<<< HEAD
        // if(team == "BLUE" && id == 0){
        //     document.onkeyup = e => {
        //         if(e.which == 87) this.up =             false;
        //         else if (e.which == 65) this.left =     false;
        //         else if (e.which == 83) this.down =     false;
        //         else if (e.which == 68) this.right =    false;
        //         else if (e.which == 17) this.hit();
        //     };

        //     document.onkeydown = e => {
        //         if(e.which == 87){
        //             this.up = true;
        //             if(this.gotPuck){
        //                 puck.direction = "up";        
        //             } 
        //         } 
        //         else if (e.which == 65){
        //             this.left = true;
        //             if(this.gotPuck){
        //                 puck.direction = "left";        
        //             } 
        //         } 
        //         else if (e.which == 83){
        //             this.down = true;
        //             if(this.gotPuck){
        //                 puck.direction = "down";        
        //             } 
        //         } 
        //         else if (e.which == 68){
        //             this.right = true;
        //             if(this.gotPuck){
        //                 puck.direction = "right";        
        //             } 
        //         } 
        //     };
        // }
=======
        if(team == "BLUE" && id == 1){
            document.onkeyup = e => {
                if      (e.which == 87) this.up =       false;
                else if (e.which == 65) this.left =     false;
                else if (e.which == 83) this.down =     false;
                else if (e.which == 68) this.right =    false;
                else if (e.which == 38) this.hit();
                else if (e.which == 40) this.shoot();
                else if (e.which == 39) this.pass();
            };

            document.onkeydown = e => {
                if(e.which == 87  && !this.left && !this.right && !this.down){
                    this.up = true;
                    this.lastMove = "up";
                    if(this.gotPuck){
                        puck.direction = "up";        
                    } 
                } 
                else if (e.which == 65  && !this.up && !this.right && !this.down){
                    this.left = true;
                    this.lastMove = "left";
                    if(this.gotPuck){
                        puck.direction = "left";        
                    } 
                } 
                else if (e.which == 83 && !this.left && !this.right && !this.up){
                    this.down = true;
                    this.lastMove = "down";
                    if(this.gotPuck){
                        puck.direction = "down";        
                    } 
                } 
                else if (e.which == 68 && !this.left && !this.up && !this.down){
                    this.right = true;
                    this.lastMove = "right";
                    if(this.gotPuck){
                        puck.direction = "right";        
                    } 
                } 
            };
        }
>>>>>>> c4828c6a88768fe53df0127293ff7b7e20f003ed
        //*************************************************************

        if(this.team == "RED"){
            spriteImg = "images/sprites/pRed.png";

            if(this.id == 0){
                this.x = 720;
                this.y = 300;
                this.initPos.x = 720;
                this.initPos.y = 300;
            }
            else{
                this.x = 600;
                this.y = 200;
                this.initPos.x = 600;
                this.initPos.y = 200;
            }
        }
        else{
            spriteImg = "images/sprites/pBlue.png";
            if(this.id == 0){
                this.x = 780;
                this.y = 300;
                this.initPos.x = 780;
                this.initPos.y = 300;
            }
            else{
                this.x = 900;
                this.y = 400;
                this.initPos.x = 900;
                this.initPos.y = 400;
            }
        }

        this.tiledImage = new TiledImage(   spriteImg, columnCount, 
                                            rowCount, refreshDelay, 
                                            loopInColumns, scale);

        this.tiledImage.changeRow(0);
    }

    move(action){

        //Directions
        if(action == "up" && !this.left && !this.right && !this.down){
            this.up = !this.up;
            this.lastMove = "up"; 
            if(this.gotPuck){
                puck.direction = action;        
            }   
        }
        if(action == "down" && !this.left && !this.right && !this.up){
            this.down = !this.down;
            this.lastMove = "down"; 
            if(this.gotPuck){ 
                puck.direction = action;    
            }      
        }
        if(action == "left" && !this.up && !this.right && !this.down){
            this.left = !this.left;
            this.lastMove = "left"; 
            if(this.gotPuck){ 
                puck.direction = action;    
            }      
        }
       if(action == "right" && !this.left && !this.up && !this.down){
            this.right = !this.right;
            this.lastMove = "right"; 
            if(this.gotPuck){
                puck.direction = action;  
            }   
        }

        //Actions
        if(action == "action-a"){
            if(this.gotPuck){
                this.shoot();
            }

        }

        if(action == "action-b"){
            if(this.gotPuck){
                this.pass();
            }
            else{
                this.hit();
            }
        }
    }

    shoot(){
        if(this.gotPuck){
            puck.move(this.x, this.y, 10);
            if(this.team == "RED"){
                gBlue.puckIncoming = true;
            }
            else{
                gRed.puckIncoming = true;
            }
            this.gotPuck = false;
        }
    }

    pass(){
        if(this.gotPuck){
            let teamMate = null;
            if(this.team == "RED"){
                if(this.id == 0){
                    teamMate = pRed[1];
                }
                else{
                    teamMate = pRed[0];
                }
            }
            else{
                if(this.id == 0){
                    teamMate = pBlue[1];
                }
                else{
                    teamMate = pBlue[0];
                }
            }

            //Verifying if teamMate is face the player
            let targetX = teamMate.x + (teamMate.Xvelocity * 1.5);
            let targetY = teamMate.y + (teamMate.Yvelocity * 1.5);
            let facing = false;
            if(puck.direction == "up"){
                if(teamMate.y < this.y){
                    facing = true;
                }
            }
            if(puck.direction == "down"){
                if(teamMate.y > this.y){
                    facing = true;
                }
            }
            if(puck.direction == "left"){
                if(teamMate.x < this.x){
                    facing = true;
                }
            }
            if(puck.direction == "right"){
                if(teamMate.x > this.x){
                    facing = true;
                }
            }

            if(facing){
                puck.pass(this.x, this.y, targetX, targetY);
                this.gotPuck = false;
            }

            //Maybe one day this thing will be fixed
            // let distX = 0;
            // let distY = 0;
            // let forceX = 0;
            // let forceY = 0;
            // if(puck.direction == "up"){
            //     if(teamMate.y < this.y){
            //         distY = this.y - targetY;
            //         forceY = distY / puckAcceleration - tickVar;
            //         if(teamMate.x < this.x){
            //             distX = this.x - targetX;
            //             forceX = distX / puckAcceleration - tickVar;
            //         }
            //         else{
            //             distX = targetX - this.x;
            //             forceX = distX / puckAcceleration + tickVar;
            //         }

            //         puck.Xvelocity = forceX;
            //         puck.Yvelocity = forceY;
            //     }
            // }
            // if(puck.direction == "down"){
            //     if(teamMate.y > this.y){
            //         distY = targetY - this.y;
            //         forceY = distY / puckAcceleration + tickVar;
            //         if(teamMate.x < this.x){
            //             distX = this.x - targetX;
            //             forceX = distX / puckAcceleration - tickVar;
            //         }
            //         else{
            //             distX = targetX - this.x;
            //             forceX = distX / puckAcceleration + tickVar;
            //         }
            //     }
            // }
            // if(puck.direction == "left"){
            //     if(teamMate.x < this.x){
            //         distX = this.x - targetX;
            //         forceX = distX / puckAcceleration - tickVar;
            //         if(teamMate.y < this.y){
            //             distY = this.y - targetY;
            //             forceY = distY / puckAcceleration - tickVar;
            //         }
            //         else{
            //             distY = targetY - this.y;
            //             forceY = distY / puckAcceleration + tickVar;
            //         }
            //     }
            // }
            // if(puck.direction == "right"){
            //     if(teamMate.x > this.x){
            //         distX = targetX - this.x;
            //         forceX = distX / puckAcceleration + tickVar;
            //         if(teamMate.y < this.y){
            //             distY = this.y - targetY;
            //             forceY = distY / puckAcceleration - tickVar;
            //         }
            //         else{
            //             distY = targetY - this.y;
            //             forceY = distY / puckAcceleration + tickVar;
            //         }
            //     }
            // }

            // puck.Xvelocity = forceX;
            // puck.Yvelocity = forceY;
        }
    }

    hit(){

        this.hitFrame = true;
        for(let i = 0; i < spriteList.length; i++){
            const sprite = spriteList[i];
            if(sprite.type === "player" && sprite.name !== this.name && sprite.team !== this.team){
                if(this.up){
                    if(sprite.collision(this.x, this.y - 5)){
                        sprite.dizzy = true;
                    }
                }
                if(this.down){
                    if(sprite.collision(this.x, this.y + 5)){
                        sprite.dizzy = true;
                    }
                }
                if(this.left){
                    if(sprite.collision(this.x - 5, this.y)){
                        sprite.dizzy = true;
                    }
                }
                if(this.right){
                    if(sprite.collision(this.x + 5, this.y)){
                        sprite.dizzy = true;
                    }
                }

                
            }
        }
    }

    collision(x, y){

        let self = {x: this.x-18, y: this.y-20, w: 34, h: 44};

        let player = {x: x-18, y: y-20, w: 34, h: 44};

        return boxCollision(self, player);
    }

    tick() {

        //TICK TIMER *********************************************************************
        // if(this.times.length < 500){
        //     this.times.push(Date.now());
        // }
        // else{
        //     let total = 0;
        //     for(let i = 0; i < this.times.length; i++){
        //         total += this.times[i];
        //     }
        //     let avg = Date.now() - (total / this.times.length);
        //     console.log("Average time for " + this.name + " last 500 ticks: " + avg);
        //     this.times = [];
        // }
        //*********************************************************************************

        //Adjustment of position in case it's stuck in a board collision
        //x
        if(this.x < 91){
            this.x = 92;
        }
        if(this.x > 1390){
            this.x = 1389;
        }
        //y
        if (this.y < 32){
            this.y = 33
        }
        if(this.y > 549){
            this.y = 548;
        }

        let collisionUp = false;
        let collisionDown = false;
        let collisionLeft = false;
        let collisionRight = false;
        
        for(let i = 0; i < spriteList.length; i++){
            
            const sprite = spriteList[i];
            if(sprite.type === "puck"){
                if(puckFree && sprite.collision(this.x, this.y) && !this.dizzy){
                    this.gotPuck = true;
                    puck.direction = this.lastMove;
                }
            }
            else if(sprite.type === "rink"){
                //left
                if(sprite.collision((this.x + this.Xvelocity) - 4, this.y)){
                    collisionLeft = true;
                }
                //right
                if(sprite.collision((this.x + this.Xvelocity) + 4, this.y)){
                    collisionRight = true;
                }
                //down
                if(sprite.collision(this.x, (this.y + this.Yvelocity + 4))){
                    collisionDown = true;
                }
                //up
                if(sprite.collision(this.x, (this.y + this.Yvelocity - 4))){
                    collisionUp = true;
                }
            }
        }

        if(this.dizzy){
            if(this.dizzyCounter > 0){
                this.tiledImage.changeRow(7);
                this.Xvelocity = -this.Xvelocity;
                this.Yvelocity = -this.Yvelocity;
                if(this.gotPuck){
                    this.gotPuck = false;
                    puckFree = true;
                    puck.Xvelocity = Math.floor(Math.random() * 5) + 2;
                    puck.Yvelocity = Math.floor(Math.random() * 5) + 2;
                }

                this.dizzyCounter--;
            }
            else{
                this.tiledImage.changeRow(0);
                this.dizzy = false;
                this.dizzyCounter = 150;
            }
        }

        if(this.up && !this.dizzy){
            if(this.team == "RED"){
                this.tiledImage.setFlipped(true);
            }
            else{
                this.tiledImage.setFlipped(false);
            }

            this.tiledImage.changeRow(4);

            if(!collisionUp){
                if(Math.abs(this.Yvelocity) < this.maxVelocity){
                    this.Yvelocity -= 0.1;
                }
            }
            else{
                this.Yvelocity = 0;
                // this.y += 1;
            }
            
            
            this.tiledImage.setLooped(true);
        }

        if(this.down && !this.dizzy){  
            if(this.team == "RED"){
                this.tiledImage.setFlipped(false);
            }
            else{
                this.tiledImage.setFlipped(true);
            }
            this.tiledImage.changeRow(2);


            if(!collisionDown){
                if(Math.abs(this.Yvelocity) < this.maxVelocity){
                    this.Yvelocity += 0.1;
                }
            }
            else{
                this.Yvelocity = 0;
                // this.y -= 1;
            }
            

            this.tiledImage.setLooped(true);
        }

        if(this.left && !this.dizzy){
            this.tiledImage.changeRow(0);

            if(this.team == "RED"){
                this.tiledImage.setFlipped(true);
            }
            else{
                this.tiledImage.setFlipped(false);
            }

            if(!collisionLeft){
                if(Math.abs(this.Xvelocity) < this.maxVelocity){
                    this.Xvelocity -= 0.1;
                }
            }
            else{
                this.Xvelocity = 0;
                // this.x += 1;
            }
            

            this.tiledImage.setLooped(true);
        }
        if(this.right && !this.dizzy){
            this.tiledImage.changeRow(0);

            if(this.team == "BLUE"){
                this.tiledImage.setFlipped(true);
            }
            else{
                this.tiledImage.setFlipped(false);
            }

            if(!collisionRight){
                if(Math.abs(this.Xvelocity) < this.maxVelocity){
                    this.Xvelocity += 0.1;
                }
            }
            else{
                this.Xvelocity = 0;
                // this.x -= 1;
            }
        
            this.tiledImage.setLooped(true);   
        }

        //Y velocity decrement
        if(!this.up && !this.down){
            //Gliding effect when controls are released
            if(this.Yvelocity != 0 && this.Yvelocity < 0){
                this.Yvelocity += 0.03;
            }
            if(this.Yvelocity != 0 && this.Yvelocity > 0){
                this.Yvelocity -= 0.03;
            }

            if(Math.abs(this.Yvelocity) <= 0.1 || collisionUp || collisionDown){
                this.Yvelocity = 0;
            }
        }
        //X velocity decrement
        if(!this.left && !this.right){
            if(this.Xvelocity != 0 && this.Xvelocity < 0){
                this.Xvelocity += 0.03;
            }
            if(this.Xvelocity != 0 && this.Xvelocity > 0){
                this.Xvelocity -= 0.03;
            }

            if(Math.abs(this.Xvelocity) <= 0.1 || collisionLeft || collisionRight){
                this.Xvelocity = 0;
            }
        }

        //Stopping animation when player stops moving
        if(!this.up && !this.down && !this.left && !this.right){
            this.tiledImage.setLooped(false);
        }

        if(!collisionLeft || !collisionRight){
            this.x += this.Xvelocity;               
        }

        if(!collisionUp || !collisionDown){
            this.y += this.Yvelocity;
        }

        if(this.gotPuck){
            puck.move(this.x, this.y, 0);
            puck.Xvelocity = this.Xvelocity;
            puck.Yvelocity = this.Yvelocity;
        }

        if(puckFree){
            this.gotPuck = false;
        }

        if(this.hitFrame){
            if(this.hitFrameCounter > 0){
                this.tiledImage.setLooped(false);
                this.tiledImage.changeRow(6);
                this.hitFrameCounter--;
            }
            else{
                this.tiledImage.setLooped(true);
                this.hitFrame = false;
                this.hitFrameCounter = 10;
            }
        }

        this.x = Math.floor(this.x * 100)/100;
        this.y = Math.floor(this.y * 100)/100;

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText(this.name, this.x-20, this.y-25);
        this.tiledImage.tick(this.x, this.y, ctx);
        return true;
    }
}
