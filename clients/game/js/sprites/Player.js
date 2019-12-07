class Player{
    constructor(id, name, team, ctx){
        this.id = id;
        this.name = name;
        this.team = team;
        this.ctx = ctx;

        //Adjust these variables in developpement
        this.x = 200;
        this.y = 100;
        this.speed;
        this.velocity;

        this.gotPuck = false;
        this.dizzy = false;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        let columnCount = 4;
        let rowCount = 6;
        let refreshDelay = 70;
        let loopInColumns = false;
        let scale = 2.0;

        this.tiledImage = new TiledImage("images/sprites/player.png",
                                          columnCount, rowCount, 
                                          refreshDelay, loopInColumns,
                                          scale);

        this.tiledImage.changeRow(0);
    }

    move(action){
        
        //Temporary for tests
        //let node = document.querySelector("#test");

        //Directions
        if(action === "up")     {   this.up = !this.up; console.log("up");        }
        if(action === "down")   {   this.down = !this.down; console.log("down");     }
        if(action === "left")   {   this.left = !this.left; console.log("left");     }
        if(action === "right")  {   this.right = !this.right; console.log("right");   }

        //Actions
        if(action === "action-a"){
            if(this.gotPuck){
                this.shoot();
            }

            //Temporary
            //let action = document.createTextNode(this.name + " in team " + this.team + " pressed A.");
            //let newNode = document.createElement("div");
            //newNode.appendChild(action);
            //node.prepend(newNode);
        }

        if(action === "action-b"){
            if(this.gotPuck){
                this.pass();
            }
            else{
                this.hit();
            }

            //Temporary
            //let action = document.createTextNode(this.name + " in team " + this.team + " pressed B.");
            //let newNode = document.createElement("div");
            //newNode.appendChild(action);
            //node.prepend(action);
        }
    }

    shoot(){

    }

    pass(){

    }

    hit(){

    }

    tick() {
        //let node = document.querySelector("#test");
        //let newNode = document.createElement("div");

        if(this.up){
            this.y -= 1;
            //let action = document.createTextNode(this.name + " in team " + this.team + " is moving UP.");
            //newNode.appendChild(action);
        }
        if(this.down){
            this.y += 1;
            //let action = document.createTextNode(this.name + " in team " + this.team + " is moving DOWN.");
            //newNode.appendChild(action);
        }
        if(this.left){
            this.x -= 1;
            //let action = document.createTextNode(this.name + " in team " + this.team + "is moving LEFT.");
            //newNode.appendChild(action);
        }
        if(this.right){
            this.x += 1;
            //et action = document.createTextNode(this.name + " in team " + this.team + " is moving RIGHT.");
            //newNode.appendChild(action);
        }

        //node.prepend(newNode);

        console.log("X: " + this.x + " Y: " + this.y);
        this.tiledImage.tick(this.x, this.y, this.ctx);
        return true;
    }
}