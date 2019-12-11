class Rink {
    constructor(){}

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

        let rink = [    
                        [90, 72], [96, 50], [114, 31], [1370, 31], [1383, 50], [1391, 72], 
                        [1391, 526], [1381, 542], [1370, 550], [114, 550], [104, 541], [90, 526] 
                    ];
        
        return !inside([x, y], rink);
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