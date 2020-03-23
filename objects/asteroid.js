class asteroid extends Shape{
    constructor(){
        super(undefined,undefined,{fillColor : "gray"});
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
        this.rotationSpeed = 0.01;
        this.direction = new vec2;
        this.weight = 1;
        this.center = new vec2;
        this.speed = 0.001;
        
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var vector = this.scale({x:this.collisionMap[i],y:this.collisionMap[i+1]},new vec2(1,1));
            this.collisionMap[i] = vector.x;
            this.collisionMap[i+1] = vector.y;
        }

         for(var i = 0; i < this.vertecies.length;i+=2){
             var vector = this.scale({x:this.vertecies[i],y:this.vertecies[i+1]},new vec2(1,1));
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
            this.rotationSpeed *= 0;
        else {
        this.rotationSpeed *= radians;
        }
        this.actualPosition = this.vertecies.slice();
        this.direction.x = direction.x * this.speed;
        this.direction.y = direction.y * this.speed;
        for(var i = 0; i < this.actualPosition.length; i+=2){
            var vec = calculateVector({x: this.actualPosition[i], y: this.actualPosition[i+1]},calculateTranslate(initPos));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }


        this.center = calculateVector(this.center,calculateTranslate(initPos));

        return this;
    }

    move(){
        for(var i = 0; i < this.collisionMap.length; i+=2){
            var vector = calculateVector({x : this.collisionMap[i],y : this.collisionMap[i+1]},calculateRotationMat(this.rotationSpeed));
            this.collisionMap[i] = vector.x;
            this.collisionMap[i+1] = vector.y;
         }
         for(var i = 0; i < this.actualPosition.length;i+=2){
             var copy = calculateVector({x : this.vertecies[i],y : this.vertecies[i+1]},calculateRotationMat(this.rotationSpeed));
             var diff = new vec2(this.actualPosition[i]-this.vertecies[i],this.actualPosition[i+1]-this.vertecies[i+1]);

                var vec = calculateVector({x : this.actualPosition[i], y :this.actualPosition[i+1]},calculateTranslate(diff.invert()));
                    vec = calculateVector(vec, calculateTranslate({x : diff.x+this.direction.x, y : diff.y+ this.direction.y}).multiply(calculateRotationMat(this.rotationSpeed)));
                    this.actualPosition[i] = vec.x;
                    this.actualPosition[i+1] = vec.y;
                    this.vertecies[i] = copy.x;
                    this.vertecies[i+1] = copy.y;
         }

         this.center = calculateVector(this.center,calculateTranslate(this.direction));
    }

    setSatIndex(object = {satIndex}){
        this.satIndex = object.satIndex;
    }


}