customElements.define('game-controller', Controller);
AREA.setUp();
var stateManager = new StateManager();
var area = new GameArea("area",AREA.aspect,AREA.width,stateManager);
var controller = document.createElement('game-controller');
controller.setUp(area);
stateManager.controls = controller;
area.start();