class bullet extends Shape{
    constructor(){
        super(undefined,undefined,{fillColor : "red"});
    this.vertecies = [
        0.005, 0.005,
        0.005,-0.005,
        -0.005,-0.005,
        -0.005,0.005
    ]
    this.direction = new vec2;
    this.center = new vec2(0,0);
    this.initCenter = new vec2(0,0);
    this.speed =0.5;
    this.bulletRadius = 0.9;

    this.type = "bullet";
}


setUp(initPos, direction) {
    this.actualPosition = this.vertecies.slice();
    this.collisionMap = this.vertecies.slice();
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

        
    }
}
