 class Controller extends HTMLElement{
    constructor(){
        super();
        this.keys = new Array(parseInt(1024));
        this.buttons = new Array(3);
        this.mousecoords = new vec2;
        this.out = false;
        this.child = undefined;
        this.size = this.getBoundingClientRect()

        this.onmousemove = this.mousemove;
        this.onmousedown = this.mousedown;
        this.onmouseup = this.mouseup;
        this.onkeydown = this.keydown;
        this.onkeyup = this.keyup;
        this.onfocus = this.focusC;
        this.onblur = this.pause;
    }

    setUp(element) {
        this.setAttribute('tabindex','0');
        element.canvas.parentNode.insertBefore(this,area.canvas);
        this.appendChild(element.canvas);
        this.child = element;
        this.focus();
    }
    
    mousemove(e){
        e.preventDefault();
        this.mousecoords = convertToCoord(e.x-this.offsetLeft,e.y-this.offsetHeight)
    }

    mousedown(e){
        this.buttons[e.button] = true;
    }
    mouseup(e){
        this.buttons[e.button] = false;
    }

    keydown (e){
        this.keys[e.keyCode] = true;
    }
    keyup(e){
        this.keys[e.keyCode]= false;
    }

    pause(e){
        this.out = true;
        this.focus();
    }

    focusC(e){
        this.out = false;
    }



}