class GameState extends State{
    constructor(SM){
        super(SM);
        var state = this;

        var asterGroup = new RenderGroup(state, [            
                                        new asteroid(state,new vec2(2,2)).setUp(new vec2(0.5,0.1),new vec2(-0.1,0), -0.3),
                                        new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,0.5),new vec2(0.3,-0.1), 0.5),
                                        new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,-0.5),new vec2(0.3,0.5), -0.9)
                                        ]);

        var playerGroup = new RenderGroup(state,[new Player(state)])
        var bulletGroup = new RenderGroup(state);
        var powerGroup = new RenderGroup(state);
        var statsGroup = new RenderGroup(state,[
                                        new Bar(state,"health","red", new vec2(0,-0.9),new vec2(100,2)),
                                        new Score(state, 0)
                                        ])
        this.objects =[
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),new vec2(AREA.width,AREA.height),new vec2(800,600)),
            asterGroup,
            playerGroup,
            bulletGroup,
            powerGroup,
            statsGroup
             ]

        this.addCollision();
        this.setIndexes();
    }
}