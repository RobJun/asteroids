var stateManager = new StateManager();
window.onload = function(){

if(document.location.search != ""){
    var string = document.location.search.split('&');
    var aspect = string[0].split('=')[1].split('/');
    AREA.aspect = parseFloat(parseFloat(aspect[0]/aspect[1]));
    console.log(string[1].split('=')[1]);
    AREA.height = parseInt(string[1].split('=')[1]);
}
customElements.define('game-controller', Controller);
AREA.setUp();
console.log(AREA);
var area = new GameArea("area",AREA.aspect,AREA.width,stateManager);
var controller = document.createElement('game-controller');
controller.setUp(area);
stateManager.controls = controller;
area.start();
}