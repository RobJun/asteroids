var Player = {
    vertecies : [
        0.0, 0.05,
        0.03,-0.03,
        0.0,0.0,
        -0.03,-0.03
    ],
    health:100,
    playable : true,
    teleported : false,
    speed: 0.01,
    rotSpeed: 0.1,
    strokeColor: '#CCCCCC',
    lineWidth : 1,
    angle : 0,

    shoot: 0,
    shootFrames : -1,
    bulletRadius : 0.9,

    getVertPair : function(pos){
        return {x : this.vertecies[pos*2], y: this.vertecies[pos*2+1]};
    },
    getActPosPair : function(pos){
        return {x : this.actualPosition[pos*2], y: this.actualPosition[pos*2+1]};
    },
    setUp : function() {
        this.actualPosition = this.vertecies.slice();
    },

    teleport : function(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    },

    move : function(moveVec, rotate){
        rotate *= this.rotSpeed;
        this.angle += rotate;
        var moveVec = calculateVector(moveVec,calculateRotationMat(this.angle));
        var dir = new vec2(0,0);
        dir.x = moveVec.x * this.speed;
        dir.y = moveVec.y * this.speed;
        var diff = new vec2;
        for(var i = 0; i < this.actualPosition.length;i+=2){
            diff.x = this.actualPosition[i] - this.vertecies[i]
            diff.y = this.actualPosition[i+1]- this.vertecies[i+1];

            var copyT = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateRotationMat(rotate));

            var vec = calculateVector({x: this.actualPosition[i] ,y: this.actualPosition[i+1]}, calculateTranslate(diff.invert()));
                vec = calculateVector(vec,calculateTranslate({ x : diff.x + dir.x, y : diff.y + dir.y}).multiply(calculateRotationMat(rotate)));
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
            this.vertecies[i] = copyT.x;
            this.vertecies[i+1] = copyT.y;
        }
    },


    draw : function(context){
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
}