class shape{
    constructor(vertecies, collisionMap){

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
        context.fillStyle ='gray';
        context.fill();
        //context.strokeStyle = this.lineWidth;
       // context.stroke();
    }

    setSatIndex(object = {satIndex}){
        this.satIndex = object.satIndex;
    }

    delete(){
        delete this;
    }
}