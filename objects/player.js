
class Player extends Shape{
    constructor(parent){
        super(parent,undefined, undefined,{ strokeColor : "green" ,lineWidth : 3});
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

        this.bounds = new vec2(1.3,1.3);

        this.speed = 0.9;
        this.rotSpeed = 10;

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
            rotate : 0,
            invincible: 0
        }
    }

    checkKey(controller){
    if(this.playable == true){
        if(controller.keys[37]){
            this.controls.rotate = -1;
        }else if(controller.keys[39]){
            this.controls.rotate = 1;
        }else{
            this.controls.rotate = 0;
        }

        this.controls.move = controller.keys[87];
        this.controls.shoot = controller.keys[81];
    }

    }

    teleport(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    }

    _move(delta){
        if(this.collided.happend){
            if(this.collided.with.type == "asteroid" && this.controls.invincible == 0){
                this.health -=this.collided.with.damage;
                this.controls.invincible = 60;
                this.notify(`damaged=${this.collided.with.damage}`,this);
                if(this.destroyed()){
                    this.notify("destroyed",this);
                }
                this.collided.happend = false;
            }
        }

        if(this.controls.invincible > 0){
            this.controls.invincible--
        }
        if(this.controls.move){
            this.direction.y = 1;
            this.direction.x = 0;
        } else if(this.direction.y >0){
            this.direction.y -= this.direction.y *this.resistance;
        }else{
            this.direction.y = 0;
        }

        var rot = this.controls.rotate* this.rotSpeed * delta;
        this.angle +=rot;
        var dir = calculateVector(this.direction,calculateRotationMat(this.angle));
        dir = dir.multiply(this.speed* delta);
        var diff = new vec2;
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var rotateColMap = calculateVector({x : this.collisionMap[i], y : this.collisionMap[i+1]},calculateRotationMat(rot));
            this.collisionMap[i] = rotateColMap.x;
            this.collisionMap[i+1] = rotateColMap.y;
        }
        for(var i = 0; i < this.actualPosition.length;i+=2){
            diff.x = this.actualPosition[i] - this.vertecies[i]
            diff.y = this.actualPosition[i+1]- this.vertecies[i+1];

            var copy = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateRotationMat(rot));

            var vec = calculateVector({x: this.actualPosition[i] ,y: this.actualPosition[i+1]}, calculateTranslate(diff.invert()));
                vec = calculateVector(vec,calculateTranslate({ x : diff.x+ dir.x, y : diff.y+ dir.y}).multiply(calculateRotationMat(rot)));
            this.actualPosition[i] = vec.x  
            this.actualPosition[i+1] = vec.y 
            this.vertecies[i] = copy.x;
            this.vertecies[i+1] = copy.y;
        }
        var outofscreenVec = new vec2;
        if(Math.abs(this.getActPosPair(2).x)+0.1>this.bounds.x){
            outofscreenVec.x = -2*this.getActPosPair(2).x;
        }
        if(Math.abs(this.getActPosPair(2).y)+0.1> this.bounds.y){
            outofscreenVec.y = -2*this.getActPosPair(2).y;

        }
        if(outofscreenVec.x != 0 ||outofscreenVec.y != 0){
            this.teleport(outofscreenVec);
            outofscreenVec.x = 0;
            outofscreenVec.y = 0;
        }
        this.center = this.getActPosPair(2);

    }

    move(delta){
        this._move(delta);
    }
}