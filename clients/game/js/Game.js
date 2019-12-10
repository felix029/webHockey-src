let roomSocket = null;
let teamRed = [];
let teamBlue = [];

class Game {
    
    constructor(lobbyTeamRed, lobbyTeamBlue, socket){
        this.firstRequest = true;
        roomSocket = socket;

        // canvas = document.querySelector("canvas");
        // ctx = canvas.getContext("2d");
        this.spriteList = [];
        // this.bg = new Image();
        // this.bg.src = "images/rink.png"

        //Creating the puck
        this.puck = new Puck();
        this.spriteList.push(this.puck);

        //Creations of the players
        for(let i = 0; i < 2; i++){
            let temp = null;
            if(lobbyTeamRed[i]){
                temp = new Player(i, lobbyTeamRed[i][0], "RED", this.puck);
            }
            else{
                temp = new AI(i, "RED");
            }
            teamRed.push(temp);
            this.spriteList.push(temp);
        }

        for(let i = 0; i < 2; i++){
            let temp = null;
            if(lobbyTeamBlue[i]){
                temp = new Player(i, lobbyTeamBlue[i][0], "BLUE", this.puck);
            }
            else{
                temp = new AI(i, "BLUE");
            }
            teamBlue.push(temp);
            this.spriteList.push(temp);
        }

       

        this.scoreRed = 0;
        this.scoreBlue = 0;
        this.period = 1;
        this.time = 0;

    }

    tick () {
        // if(this.bg.complete){
        //     this.ctx.drawImage(this.bg, 0, 0, 1500, 600);
        // }

        if(this.firstRequest){
            this.firstRequest = false;
            setInterval(this.fetchData, 20);
        }
        

        for(let i = 0; i < this.spriteList.length; i++){
            let sprite = this.spriteList[i];
            sprite.tick();
        }
    }

    fetchData(){
        roomSocket.emit('fetch', (data) =>{
            if(data){
                for(let i = 0; i < data.length; i++){
                    if(data[i][0] === "RED"){
                        teamRed[data[i][1]].move(data[i][2]);
                    }
                    if(data[i][0] === "BLUE"){
                        teamBlue[data[i][1]].move(data[i][2]);
                    }
                }
            }
        });

        
    }
}

