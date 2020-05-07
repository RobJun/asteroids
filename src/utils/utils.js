var AREA = {
    aspect: 3/4,
    width :1200,
    height : Number,
    image: 1222,

    fontBase : 800,

    setUp : function(){
        this.height = this.aspect* this.width;
        this.image = this.height/10;
    }
}


var STATS = {
    score : 0,
    best : 0,
    multiplier : 1,
    destroyed : 0,
    accuracy : 0,
    allBullets : 0,
    hit : 0,
    spawnedAsteroids : 3,

    reset : function(){
        this.score = 0;
        this.multiplier =1;
        this.destroyed = 0;
        this.allBullets = 0;
        this.hit = 0;
        this.spawnedAsteroids = 3;
    }
}


function getFontSize(size){
    return `${AREA.width * size/AREA.fontBase}px`;
}


function convertToCoord(x,y){
    return new vec2((2*x-AREA.width)/AREA.width,-(2*y-AREA.height)/AREA.height);
}

function convertToPixels(x,y){
    return new vec2((AREA.width*x+AREA.width)/2,(-AREA.height*y+AREA.height)/2);
}


async function wait(statement){
    var pro = resolve=>{
        if(statement()) {resolve()}
        else setTimeout(() => pro(resolve), 500);
    }
    return new Promise(pro);
}


