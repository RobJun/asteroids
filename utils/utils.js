var AREA = {
    aspect: 3/4,
    width :800,
    height : Number,
    image: 1222,

    fontBase : 800,

    setUp : function(){
        this.height = this.aspect* this.width;
        this.image = this.height/10;
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


