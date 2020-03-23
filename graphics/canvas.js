class GameArea {
    constructor(id,aspectRatio,width, stateMan){
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.aspectRatio = aspectRatio;
        this.canvas.width = width;
        this.canvas.height= this.canvas.width*aspectRatio;
        this.stateManager = stateMan;
        this.time = 0;
        this.game = this;
    }

    clear(context){
        context.clearRect(0,0, this.canvas.width,this.canvas.height);
    }

    updateView(){
        this.clear(this.context);
        this.stateManager.render(this.context);
        requestAnimationFrame(()=>{
            this.updateView();
        })
    }

    start(){
        this.updateView();
    }
}


/*
var area = document.getElementById("area");
area.width = 800;
area.height = area.width*3/4;
var con = area.getContext("2d");

var moveVec = new vec2(0.0,0.0);
var radians = 0;
var forward = 0;
var frames = 0;

var skore = new GameText("skore: 0",new vec2(0.0,0.9),{font : "Orbitron",size : "30px"});
var background = new GameImage("./res/background.jpg",new vec2(0,0),800,600);

var powerUp = new PowerUp("./res/trojita.png",new vec2(0.3,0.3),32);

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

var shape = new Shape(undefined,undefined,{});
var sat = new SAT();

sat.addSprite(shape);
sat.addSprite(aster);
sat.addSprite(aster2);
sat.addSprite(Player);
aster3.setSatIndex(aster);

function updateGame(){
    frames++;
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
    powerUp.move();
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
        if(shape.satIndex != -1){
            bulletArr[bulletArr.length-1].satIndex = shape.satIndex;
        }
    }
    con.clearRect(0,0, area.width,area.height);
    background.render(con);
    bulletArr.forEach((element,index) => {
        element.move();
        if(sat.checkForCollision(element,aster,1,con)){
            element.delete();   
            bulletArr.splice(index,1);
        }
        
        element.render(con);
        
    });
    aster.render(con);
    aster2.render(con);
    aster3.render(con);
    powerUp.render(con);
    skore.render(con);
    Player.render(con);
    Player.shoot = 0;
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
*/