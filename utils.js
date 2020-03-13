
function convertToCoord(x,y){
    var xCoord = (2*x-area.width)/area.width;
    var yCoord = -(2*y-area.height)/area.height;
    return new vec2(xCoord,yCoord);
}

function convertToPixels(x,y){
    var xPixel = (area.width*x+area.width)/2;
    var yPixel = (-area.height*y+area.height)/2;
    return new vec2(xPixel,yPixel);
}
