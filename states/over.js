class OverState extends State {
    constructor(SM){
        super(SM);
        var state = this;
        this.objects =[
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
            new GameText(state,"GAME OVER", new vec2(0,0.6),
                    {font : "Orbitron", size : "100px"}),

            new Shape(state,undefined,undefined,{fillColor : "gray"}).moveShape(new vec2(-0.6,0.12),new vec2(90,55)),
            new GameText(state,"score:", new vec2(-0.5,0.3),
                    {font : "Orbitron", size : "20px", align : "right"}),
            new GameText(state,"0", new vec2(-0.45, 0.3),
                    {font : "Orbitron", size : "20px", color : "black", align : "left"}),
            new GameText(state,"accuracy:", new vec2(-0.5,0.12),
                    {font : "Orbitron", size : "20px", align : "right"}),
            new GameText(state,"100,00%", new vec2(-0.45,0.12),
                    {font : "Orbitron", size : "20px", color : "black",align : "left"}),
            new GameText(state,"destroyed:", new vec2(-0.5,-0.05),
                    {font : "Orbitron", size : "20px", align : "right"}),
            new GameText(state,"99999", new vec2(-0.45,-0.05),
                    {font : "Orbitron", size : "20px", color : "black",align : "left"}),
            new GameButton(state,()=>{SM.change = 1},
                    {position : new vec2(-0.5,-0.4), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "try again",font : "Orbitron",size : "20px"}),
            new GameButton(state,()=>{SM.change = 0},
                    {position : new vec2(-0.5,-0.7), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "Back to menu",font : "Orbitron",size : "20px"})
        ];
        this.setIndexes();
        this.reason;
    }
}