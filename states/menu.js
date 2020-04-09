class MenuState extends State{
    constructor(SM){
        super(SM);
        var state = this;
        this.objects =  [
        new GameImage(this,SM.resourceMan.images.get("background"),new vec2(0,0),new vec2(0,0),AREA.width,AREA.height),
        new asteroid(this,new vec2(5,5)).setUp(new vec2(0.3,0),new vec2(0,0),0.1,0),
        new GameButton(this,
                        ()=>{SM.change = 1},
                        {position : new vec2(-0.5,0.1),scale : new vec2(5,2),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Play",font : "Orbitron",size : "30px"}),
        new GameButton(this,()=>{SM.change = 2},
                        {position : new vec2(-0.5,-0.15),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "Controls",font : "Orbitron",size : "20px"}),
        new GameButton(this,(button)=>{
                        SM.soundMan.mute();
                        if(button.text.text.includes("ON")){
                            state.objects[5].posImg = new vec2(127,512);
                            button.text.text = "sound OFF"

                        }else{
                            state.objects[5].posImg = new vec2(0,512);
                            button.text.text = "sound ON"  
                        }
                        },
                        {position : new vec2(-0.5,-0.35),scale : new vec2(5,1.5),fillColor : "red",strokeColor : "white", lineWidth : 3},
                        {message : "sound OFF",font : "Orbitron",size : "20px"}),
        new GameImage(this,SM.resourceMan.images.get("sprite"),new vec2(127,512), new vec2(-0.7,-0.35),32,32,120,120),
        new GameText(this,"ASTEROIDS", new vec2(0,0.7),
                        {font : "Orbitron", size : "100px"})
    ]
    this.setIndexes();
    
    }
}