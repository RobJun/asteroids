class Bullet extends Shape{
    constructor(parent, angle){
        super(parent,undefined,undefined,{fillColor : "red"});
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
    this.damage = 50; 
    this.exists = true;
    this.particles = new Particles(this);
    this.angle = angle || 0;
}


setUp(initPos, direction,angle) {
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
    move(delta){
        if( this.disFromInit() > 0.5){
            this.notify("delete",this);
            STATS.allBullets++;
        }
        this.particles.createParticles(0.5,"red", new vec2(0.1,0.8));
        this.particles.move(delta);
        console.log(this.particles);
        for(var i = 0; i < this.actualPosition.length; i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(this.direction.multiply(delta)));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
        var vec = calculateVector(this.center,calculateTranslate(this.direction.multiply(delta)));
            this.center.x = vec.x;
            this.center.y = vec.y;
    }

    render(context){
        context.beginPath();
        var center = vec2.convertToPixels(this.center);
        context.arc(center.x,center.y, vec2.convertToPixels(new vec2(-0.995)).x, 0, 2 * Math.PI);
        if(this.color !== undefined){
            context.fillStyle = this.color;
            context.fill();
        }
        if(this.colorS !== undefined){
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.colorS;
            context.stroke();
        }
        context.closePath();
        this.particles.render(context);
    }
}
