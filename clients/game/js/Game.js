class Game {
    
    constructor(teamRed, teamBlue, socket){
        this.socket = socket;

        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.spriteList = [];
        this.bg = new Image();

        //Creations of the players
        this.teamRed = [];
        for(let i = 0; i < 2; i++){
            if(teamRed[i]){
                this.teamRed.push(new Player(teamRed[i][1], teamRed[i][0], "RED"));
            }
            else{
                this.teamRed.push(new AI(i, "RED"));
            }
        }

        this.teamBlue = [];
        for(let i = 0; i < 2; i++){
            if(teamBlue[i]){
                this.teamBlue.push(new Player(teamBlue[i][1], teamBlue[i][0], "BLUE"));
            }
            else{
                this.teamBlue.push(new AI(i, "BLUE"));
            }
        }

        this.scoreRed = 0;
        this.scoreBlue = 0;
        this.period = 1;
        this.time = 0;

    }

    tick () {
        this.socket.emit('fetch', (data) =>{
            if(data){
                for(let i = 0; i < data.length; i++){
                    if(data[i][0] === "RED"){
                        this.teamRed[data[i][1]].move(data[i][2]);
                    }
                    if(data[i][0] === "BLUE"){
                        this.teamBlue[data[i][1]].move(data[i][2]);
                    }
                }
            }
        });

        for(let i = 0; i < 2; i++){
            this.teamRed[i].tick();
            this.teamBlue[i].tick();
        }
    }
}

