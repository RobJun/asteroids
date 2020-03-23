class Shape extends _SUPER_OBJECT{
    constructor(vertecies, collisionMap, color = {fillColor, strokeColor, lineWidth}){
        super();

        this.vertecies = vertecies || [
            0.005, 0.005,
            0.005,-0.005,
            -0.005,-0.005,
            -0.005,0.005
        ]
        this.collisionMap  = collisionMap || this.vertecies;
        this.actualPosition = this.vertecies.slice();

        this.color = color.fillColor || undefined;
        this.colorS = color.strokeColor || undefined;
        this.lineWidth = color.lineWidth || undefined;

    }

    getVertPair(pos){
        return {x : this.vertecies[pos*2], y: this.vertecies[pos*2+1]};
    }
    getActPosPair(pos){
        return {x : this.actualPosition[pos*2], y: this.actualPosition[pos*2+1]};
    }


    render(context){
        context.beginPath();
        var start = convertToPixels(this.actualPosition[0], this.actualPosition[1]);
        context.moveTo(start.x,start.y);
        for(var i = 2; i < this.actualPosition.length; i+=2 ){
            start = convertToPixels(this.actualPosition[i],this.actualPosition[i+1]);
            context.lineTo(start.x,start.y);    
            
        }
        context.closePath();
        if(this.color !== undefined){
        context.fillStyle = this.color;
        context.fill();
        }
        if(this.colorS !== undefined){
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.colorS;
        context.stroke();
        }
    }
    
    scale(vector, scaleVec){
        return calculateVector(vector,calculateScaleMat(scaleVec));
    }
}