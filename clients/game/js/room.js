let game = null;
let canvas = null;
let ctx = null;
let bg = new Image();
let socket = null;

let teamRed = [];
let teamBlue = [];

// let times = [];

window.addEventListener("load", () => {
    
    //socket = io.connect();
    teamRed = [["P1", 0], ["P2", 1]];
    teamBlue = [["P3", 0], ["P4", 1]];
    let roomNumber = 0;

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "15px sport-content";
    bg.src = "images/rink.png";

    //Players list
    let p1 = document.querySelector("#j1");
    let p2 = document.querySelector("#j2");
    let p3 = document.querySelector("#j3");
    let p4 = document.querySelector("#j4");

    let nameP1 = document.createTextNode("(empty)");
    let nameP2 = document.createTextNode("(empty)");
    let nameP3 = document.createTextNode("(empty)");
    let nameP4 = document.createTextNode("(empty)");

    p1.appendChild(nameP1);
    p2.appendChild(nameP2);
    p3.appendChild(nameP3);
    p4.appendChild(nameP4);

    // //Creating the room
    // socket.emit('newRoom', data => {
    //     if(data){
    //         roomNumber = data;
        
    //         let newNode = document.createElement("h2");
    //         let newTextNode = document.createTextNode("Room number: " + roomNumber);
    //         newNode.appendChild(newTextNode);
    //         document.querySelector("#title").appendChild(newNode);
    //     }
    // });

    // //Updating the players list
    // socket.on('updatePlayers', (red, blue) => {

    //     nameP1.nodeValue = red[0][0];
    //     nameP2.nodeValue = red[1][0];
    //     nameP3.nodeValue = blue[0][0];
    //     nameP4.nodeValue = blue[1][0];

    //     teamRed = red;
    //     teamBlue = blue;

    // });



    document.querySelector("#start").onclick = e =>{
        e.preventDefault();
        

        // if(teamRed.length + teamBlue.length == 0){
        //     alert("You need at least one player to start the game!");
        // }
        // else{
            //socket.emit('startGame');
            document.querySelector('#waiting-room').style.display = "none";
            document.querySelector('#game').style.display = "grid";
    
            game = new Game();
            tick();
        //}
    }
    
});

const tick = () => {

    //TICK TIMER
    // if(times.length < 500){
    //     times.push(Date.now());
    // }
    // else{
    //     let total = 0;
    //     for(let i = 0; i < times.length; i++){
    //         total += times[i];
    //     }
    //     let avg = Date.now() - (total / times.length);
    //     console.log("Average time for last 500 ticks: " + avg);
    //     times = [];
    // }

    game.tick();

    window.requestAnimationFrame(tick);
}