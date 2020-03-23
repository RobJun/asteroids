
function convertToCoord(x,y){
    return new vec2((2*x-area.width)/area.width,-(2*y-area.height)/area.height);
}

function convertToPixels(x,y){
    return new vec2((area.width*x+area.width)/2,(-area.height*y+area.height)/2);
}

