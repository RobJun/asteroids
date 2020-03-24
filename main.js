customElements.define('game-controller', Controller);

var states = [
    //Hlavne Menu
    new State([
        new GameImage("./res/background.jpg",new vec2(0,0),800,600),
        new asteroid(new vec2(5,5)).setUp(new vec2(0.3,0),new vec2(0,0),0.1,0),
        new GameButton(()=>{stateManager.change = 1},
                        {position : new vec2(-0.7,0),scale : new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Play",font : "Orbitron",size : "30px"}),
        new GameButton(()=>{},
                        {position : new vec2(-0.7,-0.25),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Controls",font : "Orbitron",size : "20px"}),
        new GameButton((button)=>{
                        states[0].objects[5].image.src= "./res/soundOFF.png";
                        button.text.text = "sound OFF"
                        },
                        {position : new vec2(-0.7,-0.45),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "sound ON",font : "Orbitron",size : "20px"}),
        new GameImage("./res/sound.png", new vec2(-0.9,-0.45),32),
        new GameText("ASTEROIDS", new vec2(0,0.7),
                        {font : "Orbitron", size : "100px"})
    ]),
    //game
    new State([
        new GameImage("./res/background.jpg",new vec2(0,0),800,600),
        new asteroid(new vec2(2,2)).setUp(new vec2(0.5,0.1),new vec2(-2,0), -0.3),
        new GameText("skore: 0",new vec2(0.0,0.9),{font : "Orbitron",size : "30px"}),
        new Player(),
         ])
]
var stateManager = new StateManager();
states.forEach(e =>{
    stateManager.addState = e;
})

stateManager.change = 0;

var area = new GameArea("area",3/4,800,stateManager);
var controller = document.createElement('game-controller');
controller.setUp(area);
stateManager.controls = controller;
area.start();

