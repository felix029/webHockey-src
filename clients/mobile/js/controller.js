window.addEventListener("load", () => {

    let socket;

    console.log(sessionStorage.getItem("socket"));

    if(sessionStorage.getItem("socket") == null){
        socket = io.connect();
        socket.emit("lobbyConnect");
        //Connect to a room
        let connectButton = document.querySelector("#connect");
        connectButton.onclick = e => {
            e.preventDefault();

            let userInput   = document.querySelector("#username").value;
            let roomInput   = parseInt(document.querySelector("#room").value);
            let radio       = document.getElementsByName("team")
            let teamInput   = "";
            for(let i = 0; i < radio.length; i++){
                if(radio[i].checked){
                    teamInput = radio[i].value;
                }
            }

            if(userInput == null || roomInput == null || teamInput == ""){
                alert("Missing informations.")
            }
            else{
                socket.emit('roomConnect', userInput, roomInput, teamInput, (data) => {
                    if(data === "roomValid"){
                    
                        document.querySelector("#login-screen").style.display = "none";
                        document.querySelector("#controller").style.display = "grid";
                        document.documentElement.webkitRequestFullScreen();
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
    
        }
        sessionStorage.setItem("socket", JSON.stringify(socket));
    }
    else{
        socket = JSON.parse(sessionStorage.getItem("socket"));
        document.querySelector("#login-screen").style.display = "none";
        document.querySelector("#controller").style.display = "grid";
    }
    
    

    //Controller
    let up      = document.querySelector("#up");    
    let right   = document.querySelector("#right");
    let down    = document.querySelector("#down");
    let left    = document.querySelector("#left");

    let actionA = document.querySelector("#action-a");
    let actionB = document.querySelector("#action-b");

    //Up events
    up.ontouchstart = e =>{
        socket.emit('up-on');    
    }

    up.ontouchend = e =>{
        socket.emit('up-off');
    }

    //Right events
    right.ontouchstart = e =>{
        socket.emit('right-on');       
    }

    right.ontouchend = e =>{
        socket.emit('right-off');
    }

    //Down events
    down.ontouchstart = e =>{
        socket.emit('down-on');    
    }

    down.ontouchend = e =>{
        socket.emit('down-off');
    }

    //Left events
    left.ontouchstart = e =>{
        socket.emit('left-on');    
    }

    left.ontouchend = e =>{
        socket.emit('left-off');
    }

    //Action a
    actionA.ontouchend = e =>{    
        socket.emit('action-a');    
    }

    //Action b
    actionB.ontouchend = e =>{
        socket.emit('action-b');  
    }

});