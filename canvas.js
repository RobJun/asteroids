

var area = document.getElementById("area");
area.width = 800;
area.height = area.width*3/4;

var Debug = document.getElementById("rotation");

var con = area.getContext("2d");
con.fillStyle = "black";
con.fillRect(0,0, area.width,area.height);


function convertToCoord(x,y){
    var xCoord = (2*x-area.width)/area.width;
    var yCoord = -(2*y-area.height)/area.height;
    return new vec2(xCoord,yCoord);
}

function convertToPixels(x,y){
    var xPixel = (area.width*x+area.width)/2;
    var yPixel = (-area.height*y+area.height)/2;
    return new vec2(xPixel,yPixel);
}



var moveVec = new vec2(0.0,0.0);
var radians = 0;
var forward = 0;
var frames = 0;

Player.setUp();
var aster = new asteroid();
aster.setUp();
var bulletArr = new Array;

var OutOfScreenVector = new vec2();
var OutofScreen = 0;
var stopped = 0;


var coll = new SAT();
function updateGame(){
    frames++;
    con.fillStyle = "black";
    con.fillRect(0,0, area.width,area.height);
    if(forward){
        moveVec.y = 1.0;
    }
    else{
        if(!stopped && moveVec.y > 0){moveVec.y += -0.01; }
        else{stopped = 1; moveVec.y = 0;}

    }

    Player.move(moveVec,radians);
    if( Math.abs(Player.getActPosPair(2).x)+0.1>1.3){
        OutOfScreenVector.x = -2*Player.getActPosPair(2).x;
        OutofScreen=1;
    }
    if(Math.abs(Player.getActPosPair(2).y)+0.1>1.3){
        OutOfScreenVector.y = -2*Player.getActPosPair(2).y;
        OutofScreen=1;
    }

    if(OutofScreen){
        Player.teleport(OutOfScreenVector,radians);
        OutOfScreenVector.x = 0;
        OutOfScreenVector.y = 0;
        OutofScreen = 0;
    }
    Player.draw(con);
    aster.draw(con);

    //TODO chage to magnitude traveled
    if(bulletArr.length > 0 && bulletArr[0].disFromInit() > Player.bulletRadius){
        bulletArr[0].delete();
        bulletArr.shift();
    };

    if(Player.shoot && Player.shootFrames%(60/10) == 0){
        bulletArr.push(new bullet);
        bulletArr[bulletArr.length-1].setUp(Player.getActPosPair(0),Player.getVertPair(0));
    }
    bulletArr.forEach(element => {
        element.move();
        element.draw(con);
        
    });
    Player.shoot = 0;
}



document.addEventListener("keydown", (e)=>{

    if(e.keyCode === 37){
        radians = -1;
    }
    if (e.keyCode === 39){
        radians = 1;
    }
    if(e.keyCode === 87){
        forward = 1;
        stopped = 0;
    }
    if(e.keyCode === 81){
        Player.shoot = 1;
        Player.shootFrames+=1;
    }
})


document.addEventListener("keyup", (e)=> {
    if(e.keyCode === 37 || e.keyCode === 39){
        radians = 0;
    }
    if(e.keyCode === 87){
        forward = 0;
    }
    if(e.keyCode === 81){
        Player.shoot = 0;
        Player.shootFrames=-1;
    }
})


setInterval(updateGame,1000/60);