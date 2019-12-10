class Player{
    constructor(id, name, team){
        this.times = [];
        this.id = id;
        this.name = name;
        this.team = team;

        this.gotPuck = false;
        this.dizzy = false;

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
        this.flipped = false;

        this.maxVelocity = 3;
        this.Xvelocity = 0;
        this.Yvelocity = 0;

        if(team == "RED" && id == 0){
            document.onkeyup = e => {
                if(e.which == 87) this.up =             false;
                else if (e.which == 65) this.left =     false;
                else if (e.which == 83) this.down =     false;
                else if (e.which == 68) this.right =    false;
            };

            document.onkeydown = e => {
                if(e.which == 87) this.up = true;
                else if (e.which == 65) this.left = true;
                else if (e.which == 83) this.down = true;
                else if (e.which == 68) this.right = true;
            };
        }

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
        if(action == "up")     {   this.up = !this.up;         }
        if(action == "down")   {   this.down = !this.down;     }
        if(action == "left")   {   this.left = !this.left;     }
        if(action == "right")  {   this.right = !this.right;   }

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

    }

    pass(){

    }

    hit(){

    }

    tick() {

        //  //TICK TIMER
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

        // if(this.up){
        //     this.tiledImage.changeRow(4);

        //     if(Math.abs(this.Yvelocity) < this.maxVelocity){
        //         this.Yvelocity -= 0.1;
        //     }
            
        //     this.tiledImage.setLooped(true);
        // }

        if(this.down){
            this.tiledImage.changeRow(2);

            if(Math.abs(this.Yvelocity) < this.maxVelocity){
                this.Yvelocity += 0.1;
            }

            this.tiledImage.setLooped(true);
          
        }

        if(this.left){
            this.tiledImage.changeRow(0);

            if(this.team == "RED"){
                this.tiledImage.setFlipped(true);
            }
            else{
                this.tiledImage.setFlipped(false);
            }

            if(Math.abs(this.Xvelocity) < this.maxVelocity){
                this.Xvelocity -= 0.1;
            }

            this.tiledImage.setLooped(true);
           
        }
        if(this.right){
            this.tiledImage.changeRow(0);

            if(this.team == "BLUE"){
                this.tiledImage.setFlipped(true);
            }
            else{
                this.tiledImage.setFlipped(false);
            }

            if(Math.abs(this.Xvelocity) < this.maxVelocity){
                this.Xvelocity += 0.1;
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

        if( !rink.boardCollision((this.x + this.Xvelocity), this.y) &&
            !rink.redZoneCollision((this.x + this.Xvelocity), this.y) &&
            !rink.blueZoneCollision((this.x + this.Xvelocity), this.y)){
            
                this.x += this.Xvelocity;
                // if(this.gotPuck){
                //     puck.move();
                // }
        }

        if( !rink.boardCollision(this.x, (this.y + this.Yvelocity)) &&
            !rink.redZoneCollision(this.x, (this.y + this.Yvelocity)) &&
            !rink.blueZoneCollision(this.x, (this.y + this.Yvelocity))){
            
                this.y += this.Yvelocity;
                // if(this.gotPuck){
                //     puck.move();
                // }
        }

        if(puckFree && puck.collision(this.x, this.y)){
             this.gotPuck = true;
        }

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText(this.name, this.x-20, this.y-25);
        this.tiledImage.tick(this.x, this.y, ctx);
        return true;
    }
}