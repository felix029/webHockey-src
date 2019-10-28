window.addEventListener("load", () => {

    let socket = io.connect();
    let connectButton = document.querySelector("#connect");

    let username = "";
    let roomNumber = 0;
    let team = "";
    let id = 0;
    
    //Connect to a room

    
    connectButton.onclick = e => {
        e.preventDefault();

        let userInput = document.querySelector("#username").value;
        let roomInput = parseInt(document.querySelector("#room").value);
        let radio = document.getElementsByName("team")
        let teamInput = "";
        for(let i = 0; i < radio.length; i++){
            if(radio[i].checked){
                teamInput = radio[i].value;
            }
        }
    
        socket.emit('roomConnect', userInput, roomInput, teamInput, function(data, idPlayer){
            if(data === "roomValid"){
                username = userInput;
                roomNumber = roomInput;
                team = teamInput;
                id = idPlayer;

                document.querySelector("#login-screen").style.display = "none";
                document.querySelector("#controller").style.display = "grid";
            }
            else if(data === "roomFull"){
                alert("This room is full.");
            }
            else if(data === "roomNull"){
                alert("This room doesn't exist.");
            }
            else if(data === "teamFull"){
                alert("The team you selected is full.");
            }
        });
    }

    
    //Controller

});
