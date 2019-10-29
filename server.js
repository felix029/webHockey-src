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

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function(socket){
    
    //Add socket in connections list
    connections.push(socket);
    console.log('Connected, %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(){
        if(socket.type === "Game"){
            delete rooms[socket.room];
            connections.splice(connections.indexOf(socket), 1);
            console.log('Game room %s closed. %s sockets connected.', socket.room, connections.length);
        }
        else if(socket.type === "Controller"){
            connections.splice(connections.indexOf(socket), 1);
            rooms[socket.room][socket.team].splice(rooms[socket.room][socket.team].indexOf(socket), 1);
            console.log('%s left %s team in room %s. %s sockets connected.', socket.username, socket.team, socket.room, connections.length);
            updatePlayers(socket.room);
        }
        else{
            connections.splice(connections.indexOf(socket), 1);
            console.log('Mobile client disconnected in main menu. %s sockets connected.', connections.length);
        }
        

    })

    //Creating a room when a game page is loaded
    socket.on('newRoom', function(callback){
        let roomCheck = true;
        let roomNumber = 0;

        do{
            roomNumber = Math.floor(100000 + Math.random() * 900000);

            if(roomNumber in rooms){
                roomCheck = false;
            }

        }while(!roomCheck)

        callback(roomNumber);
        socket.room = roomNumber;
        socket.type = "Game";
        //Status is at 1 if game is started
        rooms[roomNumber] = {"RED":[], "BLUE":[], "STATUS":0};


        roomsSocket[roomNumber] = socket;

        console.log("Room " + roomNumber + " created.")
    })

    //Connecting to room from a mobile browser, validating informations sent by user
    socket.on('roomConnect', function(user, room, team, callback) {
 
        if(room in rooms){
            if(rooms[room]["RED"].length < 2 || rooms[room]["BLUE"].length < 2){
                if(rooms[room][team].length < 2){
                    socket.type = "Controller";
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
    socket.on('startGame', function() {
        rooms[socket.room]["STATUS"] = 1;
    });
    
    //This function will update the player list in the game waiting room when a player joins the room
    function updatePlayers(room){
        let teamRed = []
        let teamBlue = []

        for(let i = 0; i < 2; i++){
            if(rooms[room]["RED"][i]){
                teamRed.push(rooms[room]["RED"][i].username);
            }
            else{
                teamRed.push("...");
            }
            if(rooms[room]["BLUE"][i]){
                teamBlue.push(rooms[room]["BLUE"][i].username);
            }
            else{
                teamBlue.push("...");
            }
        }
        
        roomsSocket[room].emit('updatePlayers', teamRed, teamBlue);
    }

    //Here the server will recieve the actions sent by the controllers and store them at the right place
    
    //UP
    socket.on('up-on', function(){
        console.log(socket.username, " pressed up in room ", socket.room);
    });

    socket.on('up-off', function(){
        console.log(socket.username, " released up in room ", socket.room);
    });

    //RIGHT
    socket.on('right-on', function(){
        console.log(socket.username, " pressed right in room ", socket.room);
    });

    socket.on('right-off', function(){
        console.log(socket.username, " released right in room ", socket.room);
    });

    //DOWN
    socket.on('donw-on', function(){
        console.log(socket.username, " pressed down in room ", socket.room);
    });

    socket.on('down-off', function(){
        console.log(socket.username, " released down in room ", socket.room);
    });

    //LEFT
    socket.on('left-on', function(){
        console.log(socket.username, " pressed left in room ", socket.room);
    });

    socket.on('left-off', function(){
        console.log(socket.username, " released left in room ", socket.room);
    });

    //ACTIONS
    socket.on('action-a', function(){
        console.log(socket.username, " pressed A in room ", socket.room);
    });

    socket.on('action-b', function(){
        console.log(socket.username, " pressed B in room ", socket.room);
    });

})