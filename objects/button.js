class GameButton extends _SUPER_OBJECT{
    constructor(pos = {position,scale,vertecies,fillColor,strokeColor, lineWidth}, text = {position,message,align,font,size, color}){
        super();
        this.pos = pos;
        this.textProperties = text;
        this.pos.vertecies = pos.vertecies || [
            0.05, 0.05,
            0.05,-0.05,
            -0.05,-0.05,
            -0.05,0.05
        ]
        this.pos.position = pos.position || new vec2;
        this.pos.scale = pos.scale || new vec2(0,0);

        for(var i = 0; i < this.pos.vertecies.length;i+=2){
            var scale = calculateVector({x : this.pos.vertecies[i], y : this.pos.vertecies[i+1]},calculateScaleMat(this.pos.scale));
            this.pos.vertecies[i] = scale.x + this.pos.position.x;
            this.pos.vertecies[i+1] = scale.y + this.pos.position.y;
        }
        this.textProperties.position = text.position || this.pos.position; 
        this.body = new Shape(this.pos.vertecies,undefined,this.pos);
        this.text = new GameText(this.textProperties.message,this.textProperties.position,this.textProperties);
    }
    move(){
    };
    render(context){
        this.body.render(context);
        this.text.render(context);
    }
}