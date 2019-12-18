//Source for this function: https://github.com/substack/point-in-polygon
const inside = (point, vs) => {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    let x = point[0], y = point[1];

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

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