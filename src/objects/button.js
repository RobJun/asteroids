class GameButton extends _SUPER_OBJECT{
    constructor(parent,action, pos = {position,scale,vertecies,fillColor,strokeColor, lineWidth}, text = {position,message,align,font,size, color}){
        super(parent);
        this.action = action || undefined;
        this.clicked = false;
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
        this.was = false;

        for(var i = 0; i < this.pos.vertecies.length;i+=2){
            var scale = calculateVector({x : this.pos.vertecies[i], y : this.pos.vertecies[i+1]},calculateScaleMat(this.pos.scale));
            this.pos.vertecies[i] = scale.x + this.pos.position.x;
            this.pos.vertecies[i+1] = scale.y + this.pos.position.y;
        }
        this.textProperties.position = text.position || this.pos.position; 
        this.body = new Shape(this.parent,this.pos.vertecies,undefined,this.pos);
        this.text = new GameText(this.parent,this.textProperties.message,this.textProperties.position,this.textProperties);
    }
    move(delta){
    };

    checkKey(controller){
        if(controller.mousecoords.x > this.pos.vertecies[6] && controller.mousecoords.x < this.pos.vertecies[0] 
            && controller.mousecoords.y > this.pos.vertecies[5] && controller.mousecoords.y < this.pos.vertecies[1] ){
                document.body.style.cursor = "pointer";
                console.log(document.body.style.cursor);
                this.body.color = '#b30000';
                this.was = true;
                if(controller.buttons[0] && this.clicked === false){
                    this.action(this);
                    this.clicked = true;
                }else if (!controller.buttons[0]){
                    this.clicked = false;
                }
            } else{
                this.body.color = "red";
                if(this.was){
                    document.body.style.cursor = "default"
                    this.was = false;
                }
            }
    }


    render(context){
        this.body.render(context);
        this.text.render(context);
    }
}