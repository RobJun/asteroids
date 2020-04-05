class MenuState extends State{
    constructor(){
    super([
        new GameImage(stateManager.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
        new asteroid(new vec2(5,5)).setUp(new vec2(0.3,0),new vec2(0,0),0.1,0),
        new GameButton(()=>{stateManager.change = 1},
                        {position : new vec2(-0.5,0.1),scale : new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Play",font : "Orbitron",size : "30px"}),
        new GameButton(()=>{stateManager.change = 2},
                        {position : new vec2(-0.5,-0.15),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Controls",font : "Orbitron",size : "20px"}),
        new GameButton((button)=>{
                        if(button.text.text.includes("ON")){
                        states[0].objects[5].posImg = new vec2(127,512);
                        button.text.text = "sound OFF"
                        }else{
                            states[0].objects[5].posImg = new vec2(0,512);
                            button.text.text = "sound ON"  
                        }
                        },
                        {position : new vec2(-0.5,-0.35),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "sound ON",font : "Orbitron",size : "20px"}),
        new GameImage(stateManager.resourceMan.images.get("sprite"),new vec2(0,512), new vec2(-0.7,-0.35),32,32,120,120),
        new GameText("ASTEROIDS", new vec2(0,0.7),
                        {font : "Orbitron", size : "100px"})
    ]);

    }
}