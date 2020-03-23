/*var Player = {
    vertecies : [
        0.0, 0.05,
        0.03,-0.03,
        0.0,0.0,
        -0.03,-0.03
    ],
    collisionMap : [
        0.0, 0.05,
        0.03,-0.03,
        -0.03,-0.03
    ],
    health:100,
    playable : true,
    teleported : false,
    speed: 0.01,
    rotSpeed: 0.1,
    strokeColor: 'green',
    lineWidth : 3,
    angle : 0,

    satIndex : -1,
    shoot: 0,
    shootFrames : -1,
    bulletRadius : 0.9,
    direction : new vec2,
    
    //Vymazat
    getVertPair : function(pos){
        return {x : this.vertecies[pos*2], y: this.vertecies[pos*2+1]};
    },
    //Vymazat
    getActPosPair : function(pos){
        return {x : this.actualPosition[pos*2], y: this.actualPosition[pos*2+1]};
    },
    //Vymazat
    setUp : function() {
        this.actualPosition = this.vertecies.slice();
    },
    //Ponechat
    teleport : function(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    },
//Ponechat
    move : function(moveVec = {x,y}, rotate){
        rotate *= this.rotSpeed;
        this.angle += rotate;
        var moveVec = calculateVector(moveVec,calculateRotationMat(this.angle));
        moveVec.x *= this.speed;
        moveVec.y *= this.speed;
        this.direction = moveVec;
        var diff = new vec2;
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var rotateColMap = calculateVector({x : this.collisionMap[i], y : this.collisionMap[i+1]},calculateRotationMat(rotate));
            this.collisionMap[i] = rotateColMap.x;
            this.collisionMap[i+1] = rotateColMap.y;
        }
        for(var i = 0; i < this.actualPosition.length;i+=2){
            diff.x = this.actualPosition[i] - this.vertecies[i]
            diff.y = this.actualPosition[i+1]- this.vertecies[i+1];

            var copy = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateRotationMat(rotate));

            var vec = calculateVector({x: this.actualPosition[i] ,y: this.actualPosition[i+1]}, calculateTranslate(diff.invert()));
                vec = calculateVector(vec,calculateTranslate({ x : diff.x + this.direction.x, y : diff.y + this.direction.y}).multiply(calculateRotationMat(rotate)));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
            this.vertecies[i] = copy.x;
            this.vertecies[i+1] = copy.y;
        }
    },

    //vymazat
    render : function(context){
    context.beginPath();
    var start = convertToPixels(this.actualPosition[0], this.actualPosition[1]);
    context.moveTo(start.x,start.y);
    for(var i = 2; i < this.actualPosition.length; i+=2 ){
        start = convertToPixels(this.actualPosition[i],this.actualPosition[i+1]);
        context.lineTo(start.x,start.y);    

    }
    context.closePath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.strokeColor;
    context.stroke();
    }
}*/

//TODO 
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

        this.speed = 0.03;
        this.rotSpeed = 0.01;
        this.angle = 0;

        this.teleported = false;
        this.shoot = 0;
        this.shootFrames = -1;
        this.bulletRadius = 0.9;
        this.direction = new vec2;
    }
    move(moveVec = {x,y}, rotate){
        rotate *= this.rotSpeed;
        this.angle += rotate;
        var moveVec = calculateVector(moveVec,calculateRotationMat(this.angle));
        moveVec.x *= this.speed;
        moveVec.y *= this.speed;
        this.direction = moveVec;
        var diff = new vec2;
        for(var i = 0; i < this.collisionMap.length;i+=2){
            var rotateColMap = calculateVector({x : this.collisionMap[i], y : this.collisionMap[i+1]},calculateRotationMat(rotate));
            this.collisionMap[i] = rotateColMap.x;
            this.collisionMap[i+1] = rotateColMap.y;
        }
        for(var i = 0; i < this.actualPosition.length;i+=2){
            diff.x = this.actualPosition[i] - this.vertecies[i]
            diff.y = this.actualPosition[i+1]- this.vertecies[i+1];

            var copy = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateRotationMat(rotate));

            var vec = calculateVector({x: this.actualPosition[i] ,y: this.actualPosition[i+1]}, calculateTranslate(diff.invert()));
                vec = calculateVector(vec,calculateTranslate({ x : diff.x + this.direction.x, y : diff.y + this.direction.y}).multiply(calculateRotationMat(rotate)));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
            this.vertecies[i] = copy.x;
            this.vertecies[i+1] = copy.y;
        }
    }
}