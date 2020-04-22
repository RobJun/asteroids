class GameState extends State{
    constructor(SM){
        super(SM);
        var state = this;

        this.asterGroup = new RenderGroup(state, [            
                                        new asteroid(state,new vec2(2,2)).setUp(new vec2(0.5,0.1),new vec2(-0.1,0), -0.3),
                                        new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,0.5),new vec2(0.3,-0.1), 0.5),
                                        new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,-0.5),new vec2(0.3,0.5), -0.9)
                                        ]);

        this.playerGroup = new RenderGroup(state,[new Player(state)])
        this.bulletGroup = new RenderGroup(state);
        this.exploded = new RenderGroup(state);
        this.powerGroup = new RenderGroup(state);
        this.statsGroup = new RenderGroup(state,[
                                        new Bar(state,"health","red", new vec2(0,-0.9),new vec2(100,2)),
                                        new Score(state, 0)
                                        ])
        this.objects =[
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),new vec2(AREA.width,AREA.height),new vec2(800,600)),
            this.asterGroup,
            this.playerGroup,
            this.bulletGroup,
            this.exploded,
            this.powerGroup,
            this.statsGroup
             ]

        this.addCollision();
        this.setIndexes();
    }
}