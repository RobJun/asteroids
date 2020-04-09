class asteroid extends Shape{
    constructor(parent,scale){
        super(parent,undefined,undefined,{fillColor : "gray"});
        this.type = "asteroid";
        this.vertecies = [
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
        ];
        
        /* this.vertecies = [
            0.0,0.25,
            0.2,0.15,
            0.35,-0.05,
            0.2,-0.2,
            0,-0.25,
            -0.3,0.0,
            -0.2,0.2,
            
        ];
        
        /*this.vertecies = [
            0.0,0.3,
            0.15,0.25,
            0.2,0.1,
            0.15,0.0,
            0.2,-0.1,
            0.1,-0.3,
            0.0,-0.2,
            -0.1,-0.25,
            -0.2,-0.1,
            -0.2,0.1,
            -0.05,0.15
        ]*/
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
        this.rotationSpeed = 1;
        this.direction = new vec2;
        this.scaleVec = scale || new vec2(1,1);
        this.weight = new vec2().dotProd(this.scaleVec);
        this.out = {
            inY : true,
            inX : true
        }
        
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
        object2.direction = Constant.multiply(0.9);
    }

    move(delta){

        if(this.collided.happend){
            if(this.collided.with.type == "asteroid"){
                this.collided.with.collided.happend = false;
                this.bounce(this.collided.with);
            }
            if(this.collided.with.type == "ship"){
                this.bounce(this.collided.with);
            }
            this.collided.happend = false;
        }
        if(this.out.inX && (this.center.x < -1||this.center.x >1)){
            this.direction.x = -this.direction.x;
            this.out.inX = false;
        }else if(this.center.x >= -0.8||this.center.x <= 0.8) {
            this.out.inX = true;
        }

        if(this.out.inY && (this.center.y < -1 ||this.center.y >1)){
            this.direction.y = -this.direction.y;
            this.out.inY = false;
        } else if(this.center.y >= -0.8||this.center.y <= 0.8) {
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
    }
}