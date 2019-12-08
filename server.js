let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let rooms = {};
let roomsSocket = {};
let connections = [];

server.listen(process.env.PORT || 8000);
console.log("Server running");

app.use(express.static('clients'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', socket => {
    
    //Add socket in connections list
    connections.push(socket);
    console.log('Connected, %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', () => {
        if(socket.type === "Game"){
            delete rooms[socket.room];
            connections.splice(connections.indexOf(socket), 1);
            console.log('Game room %s closed. %s sockets connected.', socket.room, connections.length);
        }
        else if(socket.type === "Controller"){
            connections.splice(connections.indexOf(socket), 1);
            if(rooms[socket.room]){
                rooms[socket.room][socket.team].splice(rooms[socket.room][socket.team].indexOf(socket), 1);
                updatePlayers(socket.room);
            }
            console.log('%s left %s team in room %s. %s sockets connected.', socket.username, socket.team, socket.room, connections.length);
        }
        else{
            connections.splice(connections.indexOf(socket), 1);
            console.log('Mobile client disconnected in main menu. %s sockets connected.', connections.length);
        }
        

    })

    //Creating a room when a game page is loaded
    socket.on('newRoom', callback => {
        let roomCheck = true;
        let roomNumber = 0;

        do{
            //retirer le commentaire apres les tests
            roomNumber = Math.floor(100000 + Math.random() * 900000);
            
            if(roomNumber in rooms){
                roomCheck = false;
            }

        }while(!roomCheck)

        callback(roomNumber);
        socket.room = roomNumber;
        socket.type = "Game";
        socket.actions = [];
        //Status is at 1 if game is started
        rooms[roomNumber] = {"RED":[], "BLUE":[], "STATUS":0};


        roomsSocket[roomNumber] = socket;

        console.log("Room " + roomNumber + " created.")
    })

    //Checking if the socket already exists
    socket.on('checkConnection', (room, team, id, callback) => {

        if(rooms[room][team]){
            for(let i = 0; i < rooms[room][team].length; i++){
                if(rooms[room][team][i].id == id){
                    socket.username = rooms[room][team][i].username;
                    socket.room = room;
                    socket.team = team;
                    socket.id = id;
                    rooms[room][team][i] = socket;
                    console.log("Socket reassigned");
                    callback("reconnect");
                    break;
                }
            }
        }
        else{
            console.log("Socket doesn't exists... :(");
            callback("firstconnect");
        }

    });

    //Connecting to room from a mobile browser, validating informations sent by user    
    socket.on('roomConnect', (user, room, team, callback) => {
 
        if(room in rooms){
            if(rooms[room]["RED"].length < 2 || rooms[room]["BLUE"].length < 2){
                if(rooms[room][team].length < 2){
                    socket.team = team;
                    socket.username = user;
                    socket.room = room;
                    socket.id = rooms[room][team].length;

                    rooms[room][team].push(socket);

                    console.log("%s joined %s team in room number %s.", socket.username, socket.team, socket.room);
                    updatePlayers(room); 
                    callback("roomValid", socket.id);
                }
                else{
                    callback("teamFull", 0);
                }
            }
            else{
                callback("roomFull", 0);
            }
        }
        else{
            callback("roomNull", 0);
        }


    })
    
    //This function will change the game state to 1, meaning the game is going on
    socket.on('startGame', () => {
        rooms[socket.room]["STATUS"] = 1;
    });
    
    //This function will update the player list in the game waiting room when a player joins the room
    const updatePlayers = room => {
        let teamRed = []
        let teamBlue = []

        for(let i = 0; i < 2; i++){
            if(rooms[room]["RED"][i]){
                teamRed.push([rooms[room]["RED"][i].username, rooms[room]["RED"][i].id]);
            }
            else{
                teamRed.push("...");
            }
            if(rooms[room]["BLUE"][i]){
                teamBlue.push([rooms[room]["BLUE"][i].username, rooms[room]["BLUE"][i].id]);
            }
            else{
                teamBlue.push("...");
            }
        }
        
        roomsSocket[room].emit('updatePlayers', teamRed, teamBlue);
    }

    //Here the server will recieve the actions sent by the controllers and store them at the right place ===================================================
    //UP
    socket.on('up-on', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'up']);
    });

    socket.on('up-off', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'up']);
    });

    //RIGHT
    socket.on('right-on', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'right']);
    });

    socket.on('right-off', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'right']);
    });

    //DOWN
    socket.on('down-on', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'down']);
    });

    socket.on('down-off', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'down']);
    });

    //LEFT
    socket.on('left-on', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'left']);
    });

    socket.on('left-off', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'left']);
    });

    //ACTIONS
    socket.on('action-a', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'action-a']);
    });

    socket.on('action-b', () => {
        roomsSocket[socket.room].actions.push([socket.team, socket.id, 'action-b']);
    });

    //Here the server will receive a request from the game to fetch latest actions ========================================================================
    //and give them back to the game via a callback
    socket.on('fetch', callback =>{
        //Sending back the list of actions that as been added since the last tick
        callback(socket.actions);

        //Clearing the actions list
        socket.actions = [];
    });

})