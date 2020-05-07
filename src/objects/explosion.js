class explosion extends GameImage{
    constructor(parent,image,object){
        super(parent,image,new vec2(0,0),object.center,new vec2(AREA.image*object.scaleVec.x/2),new vec2(165),true,[0.1]);
        this.Dtime= 0;
        this.type = "explosion"
    }

    _move(delta){
        this.Dtime+= delta;
        if(this.Dtime >= 0.7){
            this.notify("delete",this);
        }
    }
}