var maps = [
    [
        0.07,0.05,
        0.10,0.0,
        0.10,-0.05,
        0.06,-0.11,
        0.0,-0.10,
        -0.05,-0.04,
        -0.03,-0.030,
        -0.05,-0.01,
        -0.05,0.025,
        0.0,0.06
    ],
    [
        0.0,0.0625,
        0.05,0.0375,
        0.0875,-0.0125,
        0.05,-0.05,
        0,-0.0625,
        -0.075,0.0,
        -0.05,0.05,
    ],
    [
        0.0,0.15,
        0.075,0.125,
        0.1,0.05,
        0.075,0.0,
        0.1,-0.05,
        0.05,-0.15,
        0.0,-0.1,
        -0.05,-0.125,
        -0.1,-0.05,
        -0.1,0.05,
        -0.025,0.075 
    ]
]

class asteroid extends Shape{
    constructor(parent,scale ,verteciesMap){
        super(parent,undefined,undefined,{ strokeColor : "gray", lineWidth : 4});
        this.type = "asteroid";
        this.vertecies = maps[verteciesMap || 0].slice();
        this.collisionMap = [
            0.07,0.05,
            0.10,0.0,
            0.10,-0.05,
            0.06,-0.11,
            0.0,-0.10,
            -0.05,-0.04,
            -0.05,0.025,
            0.0,0.06
        ]
        this.health = 100;
        this.damage = 20;
        this.inView = false;
        this.rotationSpeed = 1;
        this.direction = new vec2;
        this.scaleVec = scale || new vec2(1);
        this.weight = new vec2().dotProd(this.scaleVec);
        this.score = 100 * (this.scaleVec.x);
        this.out = {
            inY : true,
            inX : true
        }
        this.in = true;
        
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var vector = this.scale({x:this.collisionMap[i],y:this.collisionMap[i+1]},this.scaleVec);
            this.collisionMap[i] = vector.x;
            this.collisionMap[i+1] = vector.y;
        }

         for(var i = 0; i < this.vertecies.length;i+=2){
             var vector = this.scale({x:this.vertecies[i],y:this.vertecies[i+1]},this.scaleVec);
             this.vertecies[i] = vector.x;
             this.vertecies[i+1] = vector.y;
         }
    }
    setUp(initPos,direction, radians, weight){
        if(weight === undefined){
            this.weight = 1;
        }else{
            this.weight = weight;
        }
        if(radians === undefined)
            this.rotationSpeed = 0;
        else {
        this.rotationSpeed *= radians;
        }
        this.actualPosition = this.vertecies.slice();
        this.direction = direction;
        for(var i = 0; i < this.actualPosition.length; i+=2){
            var vec = calculateVector({x: this.actualPosition[i], y: this.actualPosition[i+1]},calculateTranslate(initPos));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
        this.center = calculateVector(this.center,calculateTranslate(initPos));

        return this;
    }
    
    bounce(object2){
        var Constant = new vec2(this.direction.x+object2.direction.x,this.direction.y+object2.direction.y);
        Constant.x -= (object2.direction.x - this.direction.x);
        Constant.y -= (object2.direction.y - this.direction.y);
        Constant.x/=2;
        Constant.y /=2;
        this.direction.x = (object2.direction.x + Constant.x - this.direction.x);
        this.direction.y = (object2.direction.y + Constant.y - this.direction.y);
        object2.direction = Constant;
    }

    onCollision(object,mtv){
        if(object.type == "asteroid"){
            
            this.direction = mtv.multiply(-5);
            object.direction = mtv.multiply(5);
        }
        else  if(object.type == "ship"){
            this.direction = new vec2().copy(object.actDirec).multiply(3);
        }else if(object.type == "bullet"){
            this.health-= object.damage;
            STATS.hit++;
            STATS.allBullets++;
            this.notify("delete",object);
            if(this.destroyed()){
                this.notify("destroyed",this);
            }
        }
    }

    move(delta){
        if(this.direction.x > 0.3){
            this.direction.x = 0.3;
        }else if(this.direction.x < -0.3){
            this.direction.x = -0.3;
        }
        if(this.direction.y > 0.3){
            this.direction.y = 0.3;
        }else if(this.direction.y < -0.3){
            this.direction.y = -0.3;
        }
        
        if(this.out.inX && Math.abs(this.center.x) > 1.2){
            this.direction.x = -this.direction.x;
        }else if(Math.abs(this.center.x) <= 1) {
            this.out.inX = true;
        }

        if( this.out.inY && Math.abs(this.center.y) > 1.2){
            this.direction.y = -this.direction.y;
        } else if(Math.abs(this.center.y) <= 1) {
            this.out.inY = true;
        }
        var direction = this.direction.multiply(delta);
        for(var i = 0; i < this.collisionMap.length; i+=2){
            var vector = calculateVector({x : this.collisionMap[i],y : this.collisionMap[i+1]},calculateRotationMat(this.rotationSpeed*delta));
            this.collisionMap[i] = vector.x;
            this.collisionMap[i+1] = vector.y;
         }
         for(var i = 0; i < this.actualPosition.length;i+=2){
             var copy = calculateVector({x : this.vertecies[i],y : this.vertecies[i+1]},calculateRotationMat(this.rotationSpeed*delta));
             var diff = new vec2(this.actualPosition[i]-this.vertecies[i],this.actualPosition[i+1]-this.vertecies[i+1]);

                var vec = calculateVector({x : this.actualPosition[i], y :this.actualPosition[i+1]},calculateTranslate(diff.invert()));
                    vec = calculateVector(vec, calculateTranslate({x : diff.x+direction.x, y : diff.y+ direction.y}).multiply(calculateRotationMat(this.rotationSpeed*delta)));
                    this.actualPosition[i] = vec.x;
                    this.actualPosition[i+1] = vec.y;
                    this.vertecies[i] = copy.x;
                    this.vertecies[i+1] = copy.y;
         }

         this.center = calculateVector(this.center,calculateTranslate(direction));

         this.parent.SAT.updateAxis(this);
    }
}