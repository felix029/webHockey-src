let spriteList = [];
let pBlue = [];
let pRed = [];
let rink = null;
let puck = null;
let scoreRed = 0;
let scoreBlue = 0;
let period = 1;
let timer = new easytimer.Timer();
let scoreRedDiv = null;
let scoreBlueDiv = null;
let periodDiv = null;
let timeDiv = null;
let firstRequest = true;

class Game {
    
    constructor(){
        //Timer
        timer.start({countdown: true, startValues: {minutes: 2}});

        scoreRedDiv = document.getElementById("score-red");
        scoreBlueDiv = document.getElementById("score-blue");
        periodDiv = document.getElementById("period");
        timeDiv = document.getElementById("time");

        //Creating the rink
        rink = new Rink();
        spriteList.push(rink);

        //Creating the puck
        puck = new Puck();
        spriteList.push(puck);
        
        //Creations of the players
        for(let i = 0; i < 2; i++){
            let temp = null;
            if(teamRed[i]){
                temp = new Player(i, teamRed[i][0], "RED");
            }
            else{
                temp = new AI(i, "RED");
            }
            pRed.push(temp);
            spriteList.push(temp);
        }

        spriteList.push(new Goalie("RED"));

        for(let i = 0; i < 2; i++){
            let temp = null;
            if(teamBlue[i]){
                temp = new Player(i, teamBlue[i][0], "BLUE");
            }
            else{
                temp = new AI(i, "BLUE");
            }
            pBlue.push(temp);
            spriteList.push(temp);
        }

        spriteList.push(new Goalie("BLUE"));

    }

    tick () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(bg.complete){
            ctx.drawImage(bg, 0, 0, 1500, 600);
        }
        if(firstRequest){
            firstRequest = false;
            //setInterval(this.fetchData, 30);
        }

        scoreRedDiv.innerHTML = scoreRed;
        scoreBlueDiv.innerHTML = scoreBlue;
        periodDiv.innerHTML = period;
        timeDiv.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
        

        for(let i = 0; i < spriteList.length; i++){
            const sprite = spriteList[i]; 
            sprite.tick();
        }
    }

    // fetchData(){
    //     socket.emit('fetch', (data) =>{
    //         if(data){
    //             for(let i = 0; i < data.length; i++){
    //                 if(data[i][0] === "RED"){
    //                     pRed[data[i][1]].move(data[i][2]);
    //                 }
    //                 if(data[i][0] === "BLUE"){
    //                     pBlue[data[i][1]].move(data[i][2]);
    //                 }
    //             }
    //         }
    //     });

        
    // }
}

