window.onload = function(){
    string = prompt("set resolution [aspect ratio, width]","3/4,800");
    string= string.split(",");
    var iframe = document.createElement("iframe");
    iframe.src=`./game.html?aspect=${string[0]}&width=${string[1]}`
    document.body.append(iframe);
}