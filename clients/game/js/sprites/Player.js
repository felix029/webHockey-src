class Player{
    constructor(id, name, team){
        this.id = id;
        this.name = name;
        this.team = team;

        //Adjust these variables in developpement
        this.x;
        this.y;
        this.speed;
        this.velocity;

        this.gotPuck = false;
        this.dizzy = false;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    move(action){
        
        //Temporary for tests
        let node = document.querySelector("#test");

        //Directions
        if(action === "up")     {   this.up = !this.up;         }
        if(action === "down")   {   this.down = !this.down;     }
        if(action === "left")   {   this.left = !this.left;     }
        if(action === "right")  {   this.right = !this.right;   }

        //Actions
        if(action === "action-a"){
            if(this.gotPuck){
                this.shoot();
            }

            //Temporary
            let action = document.createTextNode(this.name + " in team " + this.team + " pressed A.");
            let newNode = document.createElement("div");
            newNode.appendChild(action);
            node.prepend(newNode);
        }

        if(action === "action-b"){
            if(this.gotPuck){
                this.pass();
            }
            else{
                this.hit();
            }

            //Temporary
            let action = document.createTextNode(this.name + " in team " + this.team + " pressed B.");
            let newNode = document.createElement("div");
            newNode.appendChild(action);
            node.prepend(action);
        }
    }

    shoot(){

    }

    pass(){

    }

    hit(){

    }

    tick() {
        let node = document.querySelector("#test");
        let newNode = document.createElement("div");

        if(this.up){
            let action = document.createTextNode(this.name + " in team " + this.team + " is moving UP.");
            newNode.appendChild(action);
        }
        if(this.down){
            let action = document.createTextNode(this.name + " in team " + this.team + " is moving DOWN.");
            newNode.appendChild(action);
        }
        if(this.left){
            let action = document.createTextNode(this.name + " in team " + this.team + "is moving LEFT.");
            newNode.appendChild(action);
        }
        if(this.right){
            let action = document.createTextNode(this.name + " in team " + this.team + " is moving RIGHT.");
            newNode.appendChild(action);
        }

        node.prepend(newNode);
    }
}