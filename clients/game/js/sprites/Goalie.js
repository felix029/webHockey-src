class Goalie{
    constructor(team){
        this.type = "goalie";

        //For tiled image
        let columnCount = 3;
        let rowCount = 2;
        let refreshDelay = 200;
        let loopInColumns = true;
        let scale = 3.0;
        let spriteImg = "";

        this.team = team;
        this.y = 240;
        if(this.team == "RED"){
            this.x = 197;
            spriteImg = "images/sprites/gRed.png";
        }
        else{
            this.x = 1285;
            spriteImg = "images/sprites/gBlue.png";
        }

        this.tiledImage = new TiledImage(   spriteImg, columnCount,
                                            rowCount, refreshDelay,
                                            loopInColumns, scale);
        this.tiledImage.setLooped(false);
        this.tiledImage.changeCol(1);
        this.tiledImage.changeRow(0);
        this.saveSpriteTimer = 0;

        this.puckIncoming = false;
        this.Yrandom = 0;
    }

    tick(){

        if(this.saveSpriteTimer == 0){
            if(puck.y >= 250 && puck.y <= 390){
                if(!this.puckIncoming){
                    this.y = puck.y - 80;
                }
                else{
                    if(Math.abs(this.x - puck.x) <= 100){
                        if(this.Yrandom == 0){
                            this.Yrandom = Math.floor(Math.random() * 8);
                            if(Math.round(Math.random() * 1) <= 0.5){
                                this.Yrandom = -this.Yrandom;
                            }                            
                        }
                        else{
                            this.y+=this.Yrandom;
                            if(this.Yrandom > 0){
                                this.Yrandom-=0.1;
                            }
                            else{
                                this.Yrandom+=0.1;
                            }
                            if(Math.abs(this.Yrandom) <= 0.2){
                                this.Yrandom = 0;
                            }
                        }
                    }
                }
                if(this.team == "RED"){
                    if(puck.x <= 576){
                        this.tiledImage.changeCol(1);
                    }
                    else{
                        this.tiledImage.changeCol(2);
                    }
                }
                else{
                    if(puck.x >= 924){
                        this.tiledImage.changeCol(1);
                    }
                    else{
                        this.tiledImage.changeCol(0);
                    }
                }   
            }
            else{
                this.tiledImage.changeCol(1);
            }
        }
        else{
            this.saveSpriteTimer--;
        }
            

        if(puck.saved(this.x, this.y)){
            if(this.team == "RED"){
                this.tiledImage.changeCol(0);
            }
            else{
                this.tiledImage.changeCol(2);
            }
            this.saveSpriteTimer = 20;
            this.puckIncoming = false;
        };

        this.tiledImage.tick(this.x, this.y, ctx);
    }
}