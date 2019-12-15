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

        let zone = [ [113, 204], [197, 204], [197, 384], [113, 384] ];

        return inside([x, y], zone);
    }

    blueZoneCollision(x, y){

        let zone = [ [1290, 204], [1370, 204], [1370, 384], [1290, 384] ];

        return inside([x, y], zone);
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