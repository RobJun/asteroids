class ControlState extends State{
    constructor(SM){

        super(SM);
        var state = this;
        this.collision = false;

        this.dummyGroup = new RenderGroup(state,[
            new PlayerDummy(state,new vec2(-0.4,0),[1,2]),
            new PlayerDummy(state,new vec2(0,-0.15),[3,0]),
            new PlayerDummy(state,new vec2(0.4,-0.15),[4,0])
        ])
        this.buttonGroup = new RenderGroup(state,[
            new GameImage(state,SM.resourceMan.images.get("sprite"),new vec2(0,0),new vec2(-0.6,0.10),new vec2(AREA.image),new vec2(128),true,[120,60]),
            new GameImage(state,SM.resourceMan.images.get("sprite"),new vec2(0,128),new vec2(-0.6,-0.10),new vec2(AREA.image),new vec2(128),true,[60,120]),
            new GameImage(state,SM.resourceMan.images.get("sprite"),new vec2(0,256),new vec2(-0.2,0),new vec2(AREA.image),new vec2(128),128,128,true),
            new GameImage(state,SM.resourceMan.images.get("sprite"),new vec2(0,384),new vec2(0.2,0),new vec2(AREA.image),new vec2(128),true)
        ])
        this.objects = [
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),new vec2(AREA.width,AREA.height),new vec2(800,600)),
            this.buttonGroup,
            this.dummyGroup,
            new RenderGroup(state),
            new GameText(state,"Controls", new vec2(0.0,0.8), {font : "Orbitron",size : 30}),
            new GameButton(state,()=>{SM.change = 0},
                            {position : new vec2(0,-0.7), scale: new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                            {message : "Back to menu",font : "Orbitron",size : 20}),

        ]

        this.setIndexes()
    }
}