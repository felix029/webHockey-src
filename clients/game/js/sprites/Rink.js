class Rink {
    constructor(){
        this.type = "rink";
    }

    collision(x, y){
        let collision = true;

        if(!this.boardCollision(x, y) && !this.redZoneCollision(x, y) && !this.blueZoneCollision(x, y)){
            collision = false;
        }
        else{
            collision = true;
        }

        return collision;
    }

    puckCollision(x, y, dir){
        let goal = false;
        if(dir === "left"){
            if(this.redGoal(x, y)){
                gRed.puckIncoming = false;
                scoreBlue++;
                goal = true;
                alert("Et le but de l'équipe Bleu!");
            }
        }
        if(dir === "right"){
            if(this.blueGoal(x, y)){
                gBlue.puckIncoming = false;
                scoreRed++;
                goal = true;
                alert("Et le but de l'équipe Rouge!");
            }
        }
        if(!goal){
            if(this.puckBoardCollision(x, y)){
                puck.rebound();
            }
        }
        else{
            reset();
        }
    }

    //General collision
    boardCollision(x, y){

        let collision = 0;
        
        if(x <= 90 || x >= 1391){
            collision++;
        }
        if(y <= 31 || y >= 550){
            collision++;
        }
        
        return collision > 0;
    }

    //Player collision
    redZoneCollision(x, y){

        let collision = false;
        if(y >= 204 && y <= 385){
            if(x >= 113 && x <= 197){
                collision = true;
            }
        }

        return collision;
    }

    blueZoneCollision(x, y){

        let collision = false;
        if(y >= 204 && y <= 385){
            if(x >= 1290 && x <= 1370){
                collision = true;
            }
        }

        return collision;
    }

    //Puck collision
    puckBoardCollision(x, y){

        let collision = 0;
        
        if(x <= 70 || x >= 1410){
            collision++;
        }
        if(y <= 51 || y >= 570){
            collision++;
        }
        
        return collision > 0;
    }
    
    redGoal(x, y){
        let goal = false;
        if(y >= 250 && y <= 390){
            if(x >= 153 && x <= 171){
                goal = true;
            }
            if(x <= 152 && x >= 113){
                puck.rebound();
            }
        }

        return goal;
    }

    blueGoal(x, y){
        let goal = false;

        if(y >= 250 && y <= 390){
            if(x >= 1313 && x <= 1327){
                goal = true;
            }
            if(x > 1327 && x <= 1370){
                puck.rebound();
            }
        }

        return goal;
    }

    tick(){
        
    }
}