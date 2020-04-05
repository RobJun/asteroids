class GameState extends State{
    constructor(){
        super([
            new GameImage(stateManager.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
            new asteroid(new vec2(2,2)).setUp(new vec2(0.5,0.1),new vec2(-0.1,0), -0.3),
            new asteroid(new vec2(1,1)).setUp(new vec2(-0.5,0.5),new vec2(0.3,-0.1), 0.5),
            new asteroid(new vec2(1,1)).setUp(new vec2(-0.5,-0.5),new vec2(0.3,0.5), -0.9),
            new GameText("score: 0",new vec2(0.0,0.9),{font : "Orbitron",size : "30px"}),
            new Player(),
             ])
    }
}