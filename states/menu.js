class MenuState extends State{
    constructor(SM){
        super(SM);
        var state = this;

        var buttonGroup = new RenderGroup(state,[
                                            new GameButton(this, ()=>{SM.change = 1},
                                                    {position : new vec2(-0.5,0.1),scale : new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                                                    {message : "Play",font : "Orbitron",size :40}),
                                            new GameButton(this,()=>{SM.change = 2},
                                                    {position : new vec2(-0.5,-0.15),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                                                    {message : "Controls",font : "Orbitron",size :20}),
                                            new GameButton(this,(button)=>{
                                                                    SM.soundMan.mute();
                                                                    if(button.text.text.includes("ON")){
                                                                        state.objects[3].posImg = new vec2(127,512);
                                                                        button.text.text = "sound OFF"
                                                                    }else{
                                                                        state.objects[3].posImg = new vec2(0,512);
                                                                        button.text.text = "sound ON"  
                                                                    }
                                                                },
                                                        {position : new vec2(-0.5,-0.35),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                                                        {message : "sound OFF",font : "Orbitron",size :  20}),
                                                ])



        var asterGroup = new RenderGroup(state,[
            new asteroid(this,new vec2(5,5)).setUp(new vec2(0.3,0),new vec2(0,0),0.1,0)
        ])

        this.objects =  [
        new GameImage(this,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),new vec2(AREA.width,AREA.height),new vec2(800,600)),
        asterGroup,
        buttonGroup,
        new GameImage(this,SM.resourceMan.images.get("sprite"),new vec2(127,512), new vec2(-0.7,-0.35),new vec2(AREA.image/2),new vec2(120)),
        new GameText(this,"ASTEROIDS", new vec2(0,0.7),
                        {font : "Orbitron", size : 100 })
    ]
    this.addCollision();
    this.setIndexes();
    }
}