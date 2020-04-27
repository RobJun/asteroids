
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
        this.direction = new vec2(0,0);
        this.resistance = 0.05;

        this.add = 0;
        this.set = false;

        this.controls = {
            shoot : false,
            move : false,
            rotate : 0,
            invincible: 0,
            time : 1,
            bullet : 1,
            shield : false
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


    onCollision(object){
        if(object.type == "asteroid" && this.controls.invincible == 0){
            this.health -=object.damage;
            this.controls.invincible = 60;
            if(!this.controls.shield){
            this.notify(`damaged=${object.damage}`,this);
            if(this.destroyed()){
                this.notify("destroyed",this);
            }
        }
        } else if(object.type == "powerup"){
            if(object.item === 0){
                STATS.multiplier = 2;
                setTimeout(ship =>{
                    STATS.multiplier = 1;
               },10000,this);
            }else if(object.item === 1){
                this.controls.shield = true
                setTimeout(ship =>{
                    ship.controls.shield = false;
               },10000,this);
            } else {
                this.controls.bullet = 3;
                setTimeout(ship =>{
                     ship.controls.bullet=1;
                },10000,this)
        }
    }
};

    _move(delta){
        if(this.controls.shoot && this.controls.time >= 0.5){
            this.notify("create=bullet",this);
            this.controls.time = 0;
        }
        this.controls.time+= delta;

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

    _render(context){
        if(this.controls.shield === true){
            context.beginPath();
            var center = this.getActPosPair(2);
            center = vec2.convertToPixels(center);
            context.arc(center.x,center.y,30,0,2*Math.PI);
            context.closePath();
            context.strokeStyle = "cyan";
            context.stroke();
        }
    }

    move(delta){
        if(this.add >= 1 ){
            STATS.score += 1* STATS.multiplier;
            this.add = 0;
            this.notify("scoreUpdate",this);
        }
        if(STATS.destroyed == 1 && this.set == false){
            this.notify("start=5000",this);
            this.set = true
        }else if(STATS.destroyed == 10 && this.set == false){
            this.notify("start=2500",this)
            this.set = true
        }else if(STATS.destroyed == 30 && this.set == false){
            this.notify("start=1000",this)
            this.set = true
        }else if (!STATS.destroyed == 1  && !STATS.destroyed == 10 && !STATS.destroyed == 30){
            this.set = false
        }
        this.add+= delta;
        this._move(delta);
    }
}