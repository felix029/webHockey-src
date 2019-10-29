window.addEventListener("load", () => {
    
    let socket = io.connect();

    let roomNumber = 0;

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
    socket.emit('newRoom', function(data){
        if(data){
            roomNumber = data;
        
            let newNode = document.createElement("h2");
            let newTextNode = document.createTextNode("Room number: " + roomNumber);
            newNode.appendChild(newTextNode);
            document.querySelector("#title").appendChild(newNode);
        }
    })

    //Updating the players list
    socket.on('updatePlayers', function(red, blue){

        nameP1.nodeValue = red[0];
        nameP2.nodeValue = red[1];
        nameP3.nodeValue = blue[0];
        nameP4.nodeValue = blue[1];
    });

    document.querySelector("#start").onclick = e =>{
        e.preventDefault();

        socket.emit('startGame');
        document.querySelector('#waiting-room').style.display = "none";
        document.querySelector('#game').style.display = "block";
    }

;
})