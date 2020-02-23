class asteroid{
    constructor(){
        this.vertecies = [
            0.07,0.05,
            0.10,0.0,
            0.10,-0.05,
            0.0,-0.10,
            -0.05,-0.04,
            -0.02,-0.02,
            -0.05,-0.02,
            -0.05,0.025,
             0.0,0.06,
         ];
    }
    setUp(initPos,direction){
        this.actualPosition = this.vertecies;
    }
    draw(context){
        context.beginPath();
        var start = convertToPixels(this.actualPosition[0], this.actualPosition[1]);
        context.moveTo(start.x,start.y);
        for(var i = 2; i < this.actualPosition.length; i+=2 ){
            start = convertToPixels(this.actualPosition[i],this.actualPosition[i+1]);
            context.lineTo(start.x,start.y);    
    
        }
        context.closePath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeColor;
        context.stroke();
        }
}