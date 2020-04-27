class Shape extends _SUPER_OBJECT{
    constructor(parent,vertecies, collisionMap,color){
        super(parent);

        this.vertecies = vertecies || [
            0.005, 0.005,
            0.005,-0.005,
            -0.005,-0.005,
            -0.005,0.005
        ]
        this.collisionMap  = collisionMap || this.vertecies;
        this.actualPosition = this.vertecies.slice();
        this.center = new vec2;
        this.scaleVec = new vec2(1);

        if(color !== undefined){
            this.color = color.fillColor || undefined;
            this.colorS = color.strokeColor || undefined;
            this.lineWidth = color.lineWidth || undefined;
        }else{
            this.color =  undefined;
            this.colorS =  undefined;
            this.lineWidth =  undefined;
        }

    }

    onCollision(object){};
    
    destroyed(){
        if(this.health  <= 0)
            return 1
        return 0;  
    }

    moveShape(transVec,scaleVec){
        for(var i = 0; i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i],y: this.actualPosition[i+1]},calculateTranslate(transVec).multiply(calculateScaleMat(scaleVec)));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
        return this;
    }

    
    setCollision(sat){
        sat.addSprite(this);
    }

    getVertPair(pos){
        return new vec2( this.vertecies[pos*2], this.vertecies[pos*2+1]);
    }
    getActPosPair(pos){
        return new vec2(this.actualPosition[pos*2], this.actualPosition[pos*2+1]);
    }

    disFromInit(){
        return this.center.getDistancefromP(this.initCenter);
    }
    _render(context){};
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

        this._render(context);
    }
    
    scale(vector, scaleVec){
        return calculateVector(vector,calculateScaleMat(scaleVec));
    }
}