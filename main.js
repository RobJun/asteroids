var stateManager = new StateManager();
window.onload = function(){
customElements.define('game-controller', Controller);
AREA.setUp();
var area = new GameArea("area",AREA.aspect,AREA.width,stateManager);
var controller = document.createElement('game-controller');
controller.setUp(area);
stateManager.controls = controller;
area.start();
}