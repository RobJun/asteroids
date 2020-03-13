var gameArea = {
    canvas : document.getElementById("area"),
    aspectRatio: 3/4,
    time : 0,
    setUp : function(){
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 800;
        this.canvas.height= area.width*gameArea.aspectRatio;
    },

    clear : function(){
        this.context.clearRect(0,0, this.canvas.width,this.canvas.height);
    },

    updateGame : function(...ObjectArray){

    }
}

var background = new Image;
background.src = "./res/background.jpg";

var area = document.getElementById("area");
area.width = 800;
area.height = area.width*gameArea.aspectRatio;
var con = area.getContext("2d");
con.drawImage(background,0,0,1920,1080);

var moveVec = new vec2(0.0,0.0);
var radians = 0;
var forward = 0;
var frames = 0;

Player.setUp();
var aster = new asteroid();
var aster2 = new asteroid();
var aster3 = new asteroid();
aster.setUp(new vec2(0.5,0.1),new vec2(-2,0), -0.3);
aster2.setUp(new vec2(0,0),new vec2(0,0),0);
aster3.setUp(new vec2(-0.5,0),new vec2(0.8,0),-0.2);
var bulletArr = new Array;

var OutOfScreenVector = new vec2();
var OutofScreen = 0;
var stopped = 0;
var collided = 0;

var bull = new bullet();
bull.setUp(new vec2,new vec2);
var sat = new SAT();

sat.addSprite(bull);
sat.addSprite(aster);
sat.addSprite(aster2);
sat.addSprite(Player);
aster3.setSatIndex(aster);

function updateGame(){
    frames++;
    con.scale(0.5,0.5);
    con.drawImage(background,0,0,1600,1200);
    con.scale(2,2);
    if(forward){
        moveVec.y = 1.0;
    }
    else{
        if(!stopped && moveVec.y > 0){moveVec.y += -0.01; }
        else{stopped = 1; moveVec.y = 0;}

    }

    Player.move(moveVec,radians);
    aster.move();
    aster2.move();
    aster3.move();
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

    sat.updateAxis(Player);
    sat.updateAxis(aster);
    sat.updateAxis(aster2);

    if(sat.checkForCollision(Player,aster)){
        collided = 1;
        if(Player.direction.x == 0 && Player.direction.y == 0){
            aster.direction = aster.direction.invert();
        }else{
        aster.direction.x += Player.direction.x*0.1;
        aster.direction.y += Player.direction.y* 0.1;
        }
        aster.move();
    }
    if(sat.checkForCollision(aster2,aster)){
        sat.bounceObjects(aster,aster2);
    }
    if(sat.checkForCollision(aster3,aster2)){
        sat.bounceObjects(aster2,aster3);
    }
    if(sat.checkForCollision(aster3,aster)){
        sat.bounceObjects(aster,aster3);
    }
    
    
    
    if(bulletArr.length > 0 && bulletArr[0].disFromInit() > Player.bulletRadius){
        bulletArr[0].delete();
        bulletArr.shift();
    };
    
    if(Player.shoot && Player.shootFrames%(60/10) == 0){
        bulletArr.push(new bullet);
        bulletArr[bulletArr.length-1].setUp(Player.getActPosPair(0),Player.getVertPair(0));
        if(bull.satIndex != -1){
            bulletArr[bulletArr.length-1].satIndex = bull.satIndex;
        }
    }
    bulletArr.forEach((element,index) => {
        element.move();
        if(sat.checkForCollision(element,aster,1,con)){
            element.delete();   
            bulletArr.splice(index,1);
        }
        
        element.draw(con);
        
    });
    
    Player.draw(con);
    aster.draw(con);
    aster2.draw(con);
    aster3.draw(con);

    Player.shoot = 0;
    // sat.drawAxis(con);
}



document.addEventListener("keydown", (e)=>{

    if(e.keyCode === 37){
        radians = -1;
        sat.updateAxis(Player);
    }
    if (e.keyCode === 39){
        radians = 1;
        sat.updateAxis(Player);
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