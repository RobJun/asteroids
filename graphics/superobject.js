class _SUPER_OBJECT {
    constructor(parent){
        this.parent = parent;
        this.index = undefined;
        this.type = "blank";
        this.satIndex = -1;
        this.updateAxis = false;
        this.checkColision = [];
        this.playable = true;
        this.speed = 0.0;
        this.health = 0;
        this.collided = {
            with : undefined,
            happend : false,
        }
    }
    render(con){}
    move(delta){};
    checkKey(controller){}

    notify(message, object){
        this.parent.notify(message,object);
    }

    setSatIndex(object = {satIndex}){
        this.satIndex = object.satIndex;
    }
        
    delete(){
        delete this;
    }


    set stateI(index){
        this.index = index;
    }
}