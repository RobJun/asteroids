class ControlState extends State{
    constructor(){

        super([
            new GameImage(stateManager.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
            new GameImage(stateManager.resourceMan.images.get("sprite"),new vec2(0,0),new vec2(-0.6,0.10),64,64,128,128,true,[60,120]),
            new GameImage(stateManager.resourceMan.images.get("sprite"),new vec2(0,128),new vec2(-0.6,-0.10),64,64,128,128,true,[120,60]),
            new GameImage(stateManager.resourceMan.images.get("sprite"),new vec2(0,256),new vec2(-0.2,0),64,64,128,128,true),
            new GameImage(stateManager.resourceMan.images.get("sprite"),new vec2(0,384),new vec2(0.2,0),64,64,128,128,true),
            new PlayerDummy(new vec2(-0.4,0),[1,2]),
            new PlayerDummy(new vec2(0,-0.15),[0,3]),
            new PlayerDummy(new vec2(0.4,-0.15),[0,4]),
            new GameText("Controls", new vec2(0.0,0.8), {font : "Orbitron",size : "30px"}),
            new GameButton(()=>{stateManager.change = 0},
                            {position : new vec2(0,-0.7), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                            {message : "Back to menu",font : "Orbitron",size : "20px"}),

        ])
    }
}