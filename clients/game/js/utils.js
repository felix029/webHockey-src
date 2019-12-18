const boxCollision = (box1, box2) => {
    //box parameters must be a dict {x: , y: , width: , height: }
    let collision = false;

    if (box1.x < box2.x + box2.w && box1.x + box1.w > box2.x &&
        box1.y < box2.y + box2.h && box1.h + box1.y > box2.y) {
            
            collision = true;
    }

    return collision;
}

const reset = () => {
    puckFree = true;
    puck.x = 750;
    puck.y = 300;
    puck.Xvelocity = 0;
    puck.Yvelocity = 0;
    
    for(let i = 0; i < 2; i++){
        const pR = pRed[i];
        const pB = pBlue[i];

        pR.x = pR.initPos.x;
        pR.y = pR.initPos.y;
        pR.Xvelocity = 0;
        pR.Xvelocity = 0;
        pR.gotPuck = false;
        
        pB.x = pB.initPos.x;
        pB.y = pB.initPos.y;
        pB.Xvelocity = 0;
        pB.Xvelocity = 0;
        pB.gotPuck = false;
        
    }
}