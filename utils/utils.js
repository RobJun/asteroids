var AREA = {
    width : 800,
    height :600
}


function convertToCoord(x,y){
    return new vec2((2*x-AREA.width)/AREA.width,-(2*y-AREA.height)/AREA.height);
}

function convertToPixels(x,y){
    return new vec2((AREA.width*x+AREA.width)/2,(-AREA.height*y+AREA.height)/2);
}

