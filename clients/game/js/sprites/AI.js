class AI extends Player{
    constructor(id, team){
        super(id, str.concat(team, (id + 1).toString()), team);
        console.log("new ai");
    }

    tick(){
        
    }
}