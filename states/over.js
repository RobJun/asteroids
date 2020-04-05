class OverState extends State {
    constructor(){
        super([
            new GameImage(stateManager.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
            new GameText("GAME OVER", new vec2(0,0.6),
                    {font : "Orbitron", size : "100px"}),
            new GameButton(()=>{stateManager.change = 1},
                    {position : new vec2(-0.5,-0.4), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "try again",font : "Orbitron",size : "20px"}),
            new GameButton(()=>{stateManager.change = 0},
                    {position : new vec2(-0.5,-0.7), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "Back to menu",font : "Orbitron",size : "20px"})
        ])
    }
}