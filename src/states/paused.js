class Paused extends State{
 constructor(SM){
    super(SM);
    this.prev;
    this.objects = [
        new GameText(this,"PAUSED", new vec2(0,0),{ font : "Orbitron", size : 100}),
        new PauseCon(this,0)
    ]
 }
}