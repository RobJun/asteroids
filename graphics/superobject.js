class _SUPER_OBJECT {
    constructor(){
        this.type = "blank";
        this.satIndex = -1;
        this.updateAxis = false;
        this.playable = false;
        this.checkColision = [];

        this.speed = 0.0;
        this.health = 0;
    }
    render(con){}
    move(){};
    setSatIndex(object = {satIndex}){
        this.satIndex = object.satIndex;
    }
        
    delete(){
        delete this;
    }
}