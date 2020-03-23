

var states = [
    new State([
        new GameImage("./res/background.jpg",new vec2(0,0),800,600),
        new asteroid().setUp(new vec2(0.5,0.1),new vec2(-2,0), -0.3),
        new GameText("skore: 0",new vec2(0.0,0.9),{font : "Orbitron",size : "30px"}),
        new Player()
         ],
        function(context,objects){
        objects.forEach(element => {
            element.move(new vec2,0);
            element.render(context);
        });
    })
]

states.set
var stateManager = new StateManager();
states.forEach(e =>{
    stateManager.addState = e;
})

stateManager.change = 0;

var area = new GameArea("area",3/4,800,stateManager);
area.start();