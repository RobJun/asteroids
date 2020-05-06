class OverState extends State {
    constructor(SM){
        super(SM);
        var state = this;

        this.statGroup = new RenderGroup(state, [ new GameText(state,"0", new vec2(-0.45, 0.3),{font : "Orbitron", size : 20, color : "black", align : "left"}),
                                                 new GameText(state,"100,00%", new vec2(-0.45,0.12), {font : "Orbitron", size : 20, color : "black",align : "left"}),
                                                 new GameText(state,"99999", new vec2(-0.45,-0.05),{font : "Orbitron", size : 20, color : "black",align : "left"})
                                                ])
        this.objects =[
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),new vec2(AREA.width,AREA.height),new vec2(800,600)),
            new GameText(state,"GAME OVER", new vec2(0,0.6),
                    {font : "Orbitron", size : 100}),

            new Shape(state,undefined,undefined,{fillColor : "gray"}).moveShape(new vec2(-0.6,0.12),new vec2(90,55)),
            new GameText(state,"score:", new vec2(-0.5,0.3),
                    {font : "Orbitron", size : 20, align : "right"}),
            new GameText(state,"accuracy:", new vec2(-0.5,0.12),
                    {font : "Orbitron", size : 20, align : "right"}),
            new GameText(state,"destroyed:", new vec2(-0.5,-0.05),
                    {font : "Orbitron", size : 20, align : "right"}),
                this.statGroup,
            new GameButton(state,()=>{SM.change = 1},
                    {position : new vec2(-0.5,-0.4), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "Try again",font : "Orbitron",size : 20}),
            new GameButton(state,()=>{SM.change = 0},
                    {position : new vec2(-0.5,-0.7), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                    {message : "Back to menu",font : "Orbitron",size : 20})
        ];
        this.setIndexes();
    }
}