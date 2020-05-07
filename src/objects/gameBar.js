class Bar extends Shape{
    constructor(parent, type, color, position, scale){
        super(parent,undefined,undefined, {fillColor : color});
        this.type = type;
        this.update = scale
        this.moveShape(position,scale);
    }

    updateSize(vec){
        var small = new vec2(1/this.update.x, 1/this.update.y);
        this.moveShape(new vec2(0,0),small);
        this.update.x += vec.x;
        this.update.y += vec.y;
        this.moveShape(new vec2(0,0), this.update);
    }
}