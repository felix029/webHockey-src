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

    }

    //General collision
    boardCollision(x, y){

        let collision = 0;
        
        if(x < 90 || x > 1391){
            collision++;
        }
        if(y < 31 || y > 550){
            collision++;
        }
        
        return collision > 0;
    }

    //Player collision
    redZoneCollision(x, y){

        let collision = false;
        if(y > 204 && y < 385){
            if(x > 113 && x < 197){
                collision = true;
            }
        }

        return collision;
    }

    blueZoneCollision(x, y){

        let collision = false;
        if(y > 204 && y < 385){
            if(x > 1290 && x < 1370){
                collision = true;
            }
        }

        return collision;
    }

    //Puck collision
    redGoal(x, y){
        let goal = false;

        return goal;
    }

    blueGoal(x, y){
        let goal = false;

        return goal;
    }

    tick(){
        
    }
}