class bullet {
    constructor(){
    this.vertecies = [
        0.008, 0.008,
        0.008,-0.008,
        -0.008,-0.008,
        -0.008,0.008
    ]
    this.color = "red";
    this.speed = 0.5;
    this.direction = new vec2;
    this.center = new vec2(0,0);
    this.initCenter = new vec2(0,0);
    this.collision = 0;
    this.satIndex= -1;
    }
    disFromInit(){
        return this.center.getDistancefromP(this.initCenter);
    }

    setUp(initPos, direction) {
        this.actualPosition = this.vertecies;
        this.direction.x = direction.x * this.speed;
        this.direction.y = direction.y * this.speed;
        for(var i = 0; i < this.actualPosition.length; i+=2){
            var vec = calculateVector({x: this.actualPosition[i], y: this.actualPosition[i+1]},calculateTranslate(initPos));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
        this.InitPos = this.actualPosition;
        var vec = calculateVector(this.center,calculateTranslate(initPos));
            this.initCenter.x = this.center.x= vec.x;
            this.initCenter.y = this.center.y=vec.y;
        this.normals =  new Array;
        this.normals.push(new vec2(1.0,0.0), new vec2(0.0,1.0));

        return this;

    }
    move(){
        for(var i = 0; i < this.actualPosition.length; i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(this.direction));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
        var vec = calculateVector(this.center,calculateTranslate(this.direction));
            this.center.x = vec.x;
            this.center.y = vec.y;
        
            this.projection = this.center.dotProd(this.normals[0])/(this.normals[0].magnitude());

        
    }
    draw(context){
        context.beginPath();
        var start = convertToPixels(this.actualPosition[0], this.actualPosition[1]);
        context.moveTo(start.x,start.y);
        for(var i = 2; i < 8; i+=2 ){
            start = convertToPixels(this.actualPosition[i],this.actualPosition[i+1]);
            context.lineTo(start.x,start.y);    
    
        }
        context.closePath();


        context.fillStyle = this.color;
        context.fill();
        }
    
    setSatIndex(index){
        this.satIndex = index;
    }

    delete(){
        delete this;
    }
}
