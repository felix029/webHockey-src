class Rink {

    //General collision
    static boardCollision(x, y){

        let rink = [    
                        [90, 72], [114, 31], [1370, 31], [1391, 72], 
                        [1391, 526], [1370, 550], [114, 550], [90, 526] 
                    ];
        
        return !Utils.inside([x, y], rink);
    }

    //Player collision
    static redZoneCollision(x, y){

        let zone = [ [113, 204], [197, 204], [197, 384], [113, 384] ];

        return Utils.inside([x, y], zone);
    }

    static blueZoneCollision(x, y){

        let zone = [ [1290, 204], [1370, 204], [1370, 384], [1290, 384] ];

        return Utils.inside([x, y], zone);
    }

    //Puck collision
    static redGoal(x, y){
        let goal = false;

        return goal;
    }

    static blueGoal(x, y){
        let goal = false;

        return goal;
    }
}