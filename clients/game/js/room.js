let game = null;
let canvas = null;
let ctx = null;
let bg = new Image();

window.addEventListener("load", () => {
    
    let socket = io.connect('http://localhost:8000', {resource: '/node_modules/socket.io'});
    let teamRed = [];
    let teamBlue = [];
    let roomNumber = 0;

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    bg.src = "images/rink.png";

    //Players list
    let p1 = document.querySelector("#j1");
    let p2 = document.querySelector("#j2");
    let p3 = document.querySelector("#j3");
    let p4 = document.querySelector("#j4");

    let nameP1 = document.createTextNode("...");
    let nameP2 = document.createTextNode("...");
    let nameP3 = document.createTextNode("...");
    let nameP4 = document.createTextNode("...");

    p1.appendChild(nameP1);
    p2.appendChild(nameP2);
    p3.appendChild(nameP3);
    p4.appendChild(nameP4);

    //Creating the room
    socket.emit('newRoom', data => {
        if(data){
            roomNumber = data;
        
            let newNode = document.createElement("h2");
            let newTextNode = document.createTextNode("Room number: " + roomNumber);
            newNode.appendChild(newTextNode);
            document.querySelector("#title").appendChild(newNode);
        }
    });

    //Updating the players list
    socket.on('updatePlayers', (red, blue) => {

        nameP1.nodeValue = red[0][0];
        nameP2.nodeValue = red[1][0];
        nameP3.nodeValue = blue[0][0];
        nameP4.nodeValue = blue[1][0];

        teamRed = red;
        teamBlue = blue;

    });



    document.querySelector("#start").onclick = e =>{
        e.preventDefault();
        

        if(teamRed.length + teamBlue.length == 0){
            alert("You need at least one player to start the game!");
        }
        else{
            socket.emit('startGame');
            document.querySelector('#waiting-room').style.display = "none";
            document.querySelector('#game').style.display = "grid";
    
            game = new Game(teamRed, teamBlue, socket);
            tick();
        }
    }
});

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(bg.complete){
        ctx.drawImage(bg, 0, 0, 1500, 600);
    }
    game.tick();

    window.requestAnimationFrame(tick);
}