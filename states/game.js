class GameState extends State{
    constructor(SM){
        super(SM);
        var state = this;
        this.objects =[
            new GameImage(state,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
            new asteroid(state,new vec2(2,2)).setUp(new vec2(0.5,0.1),new vec2(-0.1,0), -0.3),
            new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,0.5),new vec2(0.3,-0.1), 0.5),
            new asteroid(state,new vec2(1,1)).setUp(new vec2(-0.5,-0.5),new vec2(0.3,0.5), -0.9),
            new GameText(state,"score: 0",new vec2(0.0,0.9),{font : "Orbitron",size : "30px"}),
            new Player(state),
            new Bar(state,"health","red", new vec2(0,-0.9),new vec2(100,2))
             ]

        this.addCollision();
        this.setIndexes();
    }
}