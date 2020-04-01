
class Player extends Shape{
    constructor(){
        super(undefined, undefined,{ strokeColor : "green" ,lineWidth : 3});
        this.vertecies = [
            0.0, 0.05,
            0.03,-0.03,
            0.0,0.0,
            -0.03,-0.03
        ];
        this.collisionMap = [
            0.0, 0.05,
            0.03,-0.03,
            -0.03,-0.03
        ];
        this.actualPosition = this.vertecies.slice();
        this.playable = true;
        this.health = 100;
        this.type = "ship";

        this.speed = 0.9;
        this.rotSpeed = 10;
        this.rotate = 0;
        this.angle = 0;
        this.playable = true;
        this.teleported = false;
        this.shoot = false;
        this.shootFrames = -1;
        this.direction = new vec2(0,0);
        this.resistance = 0.05;

        this.controls = {
            shoot : false,
            move : false,
            rotate : 0
        }
    }
    destroyed(){
        if(this.health  <= 0)
            return 1
        return 0;  
    }
    checkKey(controller){
    if(this.playable == true){

        if(controller.keys[87]){
            this.controls.move = true;
        }else{
            this.controls.move = false;
        }
        if(controller.keys[37]){
            this.rotate = -1;
        }else if(controller.keys[39]){
            this.rotate = 1;
        }else{
            this.rotate = 0;
        }
    }

    }

    teleport(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    }

    move(delta){
        if(this.collided.happend){
            if(this.collided.with.type == "asteroid"){
                this.health -= 100;
                if(this.destroyed()){
                    console.log("e");
                    stateManager.change = 3;
                    stateManager.restore(1);
                }
            }
            this.collided.happend = false;
        }
        if(this.controls.move){
            this.direction.y = 1;
        } else if(this.direction.y >0){
            this.direction.y -= this.direction.y *this.resistance;
        }else{
            this.direction.y = 0;
        }
        this.angle += this.rotate* this.rotSpeed * delta;
        //var dir = this.direction.multiply(delta);
        var dir = calculateVector(this.direction,calculateRotationMat(this.angle));
        dir = dir.multiply(this.speed* delta);
        //console.log(delta, dir)

        var diff = new vec2;
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var rotateColMap = calculateVector({x : this.collisionMap[i], y : this.collisionMap[i+1]},calculateRotationMat(this.rotate* this.rotSpeed* delta));
            this.collisionMap[i] = rotateColMap.x;
            this.collisionMap[i+1] = rotateColMap.y;
        }
        for(var i = 0; i < this.actualPosition.length;i+=2){
            diff.x = this.actualPosition[i] - this.vertecies[i]
            diff.y = this.actualPosition[i+1]- this.vertecies[i+1];

            var copy = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateRotationMat(this.rotate* this.rotSpeed* delta));

            var vec = calculateVector({x: this.actualPosition[i] ,y: this.actualPosition[i+1]}, calculateTranslate(diff.invert()));
                vec = calculateVector(vec,calculateTranslate({ x : diff.x+ dir.x, y : diff.y+ dir.y}).multiply(calculateRotationMat(this.rotate* this.rotSpeed* delta)));
            this.actualPosition[i] = vec.x  
            this.actualPosition[i+1] = vec.y 
            this.vertecies[i] = copy.x;
            this.vertecies[i+1] = copy.y;
        }
        var outofscreenVec = new vec2;
        if(Math.abs(this.getActPosPair(2).x)+0.1>1.3){
            outofscreenVec.x = -2*this.getActPosPair(2).x;
        }
        if(Math.abs(this.getActPosPair(2).y)+0.1>1.3){
            outofscreenVec.y = -2*this.getActPosPair(2).y;

        }
        if(outofscreenVec.x != 0 ||outofscreenVec.y != 0){
            this.teleport(outofscreenVec);
            outofscreenVec.x = 0;
            outofscreenVec.y = 0;
        }
        this.center = this.getActPosPair(2);

    }
}