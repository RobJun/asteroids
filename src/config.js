window.onload = function(){
    string = prompt("set resolution [aspect ratio, height]","4/3,600");
    string= string.split(",");
    var iframe = document.createElement("iframe");
    iframe.src=`./game.html?aspect=${string[0]}&height=${string[1]}`
    iframe.setAttribute("allowfullscreen", "")
    document.body.append(iframe);
}