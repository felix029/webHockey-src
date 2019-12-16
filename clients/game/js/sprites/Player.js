class Player{
    constructor(id, name, team){
        this.type = "player";

        this.times = [];
        this.id = id;
        this.name = name;
        this.team = team;

        this.gotPuck = false;
        this.dizzy = false;
        this.dizzyCounter = 150;
        this.hitFrame = false;
        this.hitFrameCounter = 10;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

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
        if(team == "RED" && id == 0){
            document.onkeyup = e => {
                if(e.which == 87) this.up =             false;
                else if (e.which == 65) this.left =     false;
                else if (e.which == 83) this.down =     false;
                else if (e.which == 68) this.right =    false;
                else if (e.which == 38) this.hit();
                else if (e.which == 40) this.shoot();
            };

            document.onkeydown = e => {
                if(e.which == 87){
                    this.up = true;
                    if(this.gotPuck){
                        puck.direction = "up";        
                    } 
                } 
                else if (e.which == 65){
                    this.left = true;
                    if(this.gotPuck){
                        puck.direction = "left";        
                    } 
                } 
                else if (e.which == 83){
                    this.down = true;
                    if(this.gotPuck){
                        puck.direction = "down";        
                    } 
                } 
                else if (e.which == 68){
                    this.right = true;
                    if(this.gotPuck){
                        puck.direction = "right";        
                    } 
                } 
            };
        }
        //*************************************************************

        if(this.team == "RED"){
            spriteImg = "images/sprites/pRed.png";

            if(this.id == 0){
                this.x = 720;
                this.y = 300;
            }
            else{
                this.x = 600;
                this.y = 200;
            }
        }
        else{
            spriteImg = "images/sprites/pBlue.png";
            if(this.id == 0){
                this.x = 780;
                this.y = 300;
            }
            else{
                this.x = 900;
                this.y = 400;
            }
        }

        this.tiledImage = new TiledImage(   spriteImg, columnCount, 
                                            rowCount, refreshDelay, 
                                            loopInColumns, scale);

        this.tiledImage.changeRow(0);
    }

    move(action){

        //Directions
        if(action == "up"){
            this.up = !this.up; 
            if(this.gotPuck){
                puck.direction = action;        
            }   
        }
        if(action == "down"){
            this.down = !this.down; 
            if(this.gotPuck){ 
                puck.direction = action;    
            }      
        }
        if(action == "left"){
            this.left = !this.left; 
            if(this.gotPuck){ 
                puck.direction = action;    
            }      
        }
       if(action == "right"){
            this.right = !this.right; 
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
            this.gotPuck = false;
        }
        
    }

    pass(){

    }

    hit(){

        this.hitFrame = true;
        for(let i = 0; i < spriteList.length; i++){
            const sprite = spriteList[i];
            if(sprite.type === "player" && sprite.name !== this.name && sprite.team !== this.team){
                if(this.up){
                    if(sprite.collision(this.x, this.y - 2)){
                        sprite.dizzy = true;
                    }
                }
                if(this.down){
                    if(sprite.collision(this.x, this.y + 2)){
                        sprite.dizzy = true;
                    }
                }
                if(this.left){
                    if(sprite.collision(this.x - 2, this.y)){
                        sprite.dizzy = true;
                    }
                }
                if(this.right){
                    if(sprite.collision(this.x + 2, this.y)){
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

        let collisionX = false;
        let collisionY = false;
        for(let i = 0; i < spriteList.length; i++){
            
            const sprite = spriteList[i];
            if(sprite.type === "player"){
                if(sprite.name !== this.name){
                    if(sprite.collision((this.x + this.Xvelocity) + 0.1, this.y)){
                        collisionX = true;
                    }
                    if(sprite.collision(this.x, (this.y + this.Yvelocity) + 0.1)){
                        collisionY = true;
                    }
                }
            }
            else if(sprite.type === "puck"){
                if(puckFree && sprite.collision(this.x, this.y) && !this.dizzy){
                    this.gotPuck = true;
                   
                }
            }
            else{
                if(sprite.collision((this.x + this.Xvelocity) + 0.1, this.y)){
                    collisionX = true;
                }
                if(sprite.collision(this.x, (this.y + this.Yvelocity) + 0.1)){
                    collisionY = true;
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
                }

                this.dizzyCounter--;
            }
            else{
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

            if(!collisionY){
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


            if(!collisionY){
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

            if(!collisionX){
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

            if(!collisionX){
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

        if(!this.up && !this.down && !this.left && !this.right){
            this.tiledImage.setLooped(false);
            
            //Gliding effect when controls are released
            if(this.Yvelocity != 0 && this.Yvelocity < 0){
                this.Yvelocity += 0.05;
            }
            if(this.Yvelocity != 0 && this.Yvelocity > 0){
                this.Yvelocity -= 0.05;
            }
            if(this.Xvelocity != 0 && this.Xvelocity < 0){
                this.Xvelocity += 0.05;
            }
            if(this.Xvelocity != 0 && this.Xvelocity > 0){
                this.Xvelocity -= 0.05;
            }

            if(Math.abs(this.Yvelocity) <= 0.1){
                this.Yvelocity = 0;
            }
            if(Math.abs(this.Xvelocity) <= 0.1){
                this.Xvelocity = 0;
            }

        }

        if(!collisionX){
            this.x += this.Xvelocity;               
        }

        if(!collisionY){
            this.y += this.Yvelocity;
        }

        if(this.gotPuck){
            puck.move(this.x, this.y, 0);
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

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText(this.name, this.x-20, this.y-25);
        this.tiledImage.tick(this.x, this.y, ctx);
        return true;
    }
}
