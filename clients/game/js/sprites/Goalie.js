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
        

    }

    tick(){


        if(puck.y >= 250 && puck.y <= 390){
            this.y = puck.y - 80;
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

        puck.saved(this.x, this.y);

        this.tiledImage.tick(this.x, this.y, ctx);
    }
}