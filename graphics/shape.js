class Shape{
    constructor(vertecies, collisionMap, color ={fillColor, strokeColor}, lineWidth){
        this.satIndex = -1;
        this.speed = 0.5;
        this.color = color.fillColor || undefined;
        this.colorS = color.strokeColor || undefined;
        this.lineWidth = lineWidth;

        this.playable = false;
        this.speed = 0.0;
        this.health = 0;

    }

    move(){

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
        context.lineWidth = this.lineWidth;
        if(this.color !== undefined){
        context.fillStyle =this.color;
        context.fill();
        }
        if(this.colorS !== undefined){
        context.strokeStyle = this.lineWidth;
        context.strokeColor = this.colorS;
         context.stroke();
        }
    }
    
    scale(vector, scaleVec){
        return calculateVector(vector,calculateScaleMat(scaleVec));
    }
    setSatIndex(object = {satIndex}){
        this.satIndex = object.satIndex;
    }

    delete(){
        delete this;
    }
}