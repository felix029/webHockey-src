class Player{
    constructor(id, name, team, ctx){
        this.id = id;
        this.name = name;
        this.team = team;
        this.ctx = ctx;

        this.maxVelocity = 3;
        this.Xvelocity = 0;
        this.Yvelocity = 0;

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
        if(action === "up")     {   this.up = !this.up;         }
        if(action === "down")   {   this.down = !this.down;     }
        if(action === "left")   {   this.left = !this.left;     }
        if(action === "right")  {   this.right = !this.right;   }

        //Actions
        if(action === "action-a"){
            if(this.gotPuck){
                this.shoot();
            }

        }

        if(action === "action-b"){
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

        if(this.up){
            this.tiledImage.changeRow(4);

            if(Math.abs(this.Yvelocity) < this.maxVelocity){
                this.Yvelocity -= 0.1;
            }
            
            this.tiledImage.setLooped(true);
        }
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

        if( !Rink.boardCollision((this.x + this.Xvelocity), this.y) &&
            !Rink.redZoneCollision((this.x + this.Xvelocity), this.y) &&
            !Rink.blueZoneCollision((this.x + this.Xvelocity), this.y)){
            
                this.x += this.Xvelocity;
        }

        if( !Rink.boardCollision(this.x, (this.y + this.Yvelocity)) &&
            !Rink.redZoneCollision(this.x, (this.y + this.Yvelocity)) &&
            !Rink.blueZoneCollision(this.x, (this.y + this.Yvelocity))){
            
                this.y += this.Yvelocity;
        }

        this.ctx.font = "15px sport-content";
        this.ctx.fillText(this.name, this.x-20, this.y-25);
        this.tiledImage.tick(this.x, this.y, this.ctx);
        return true;
    }
}