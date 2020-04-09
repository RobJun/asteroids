class PowerUp extends GameImage{
    constructor(parent,key,posSprite,posCenter, width,height,spritewidth,spriteheight,animate,onTicks){
        super(parent,key,posSprite,posCenter, width,height,spritewidth,spriteheight,animate,onTicks);
        this.tick = 0;
        this.maxTime = 800;
        this.startDis = this.maxTime/2;
        this.dSpeed = 60;
    }

    move(delta){
        console.log(this.tick);

        if(this.tick < this.maxTime && this.tick >= this.maxTime/4 && this.tick %this.dSpeed== 0){
            this.tick++;
            this.draw = !this.draw;
        }else if (this.tick <= this.maxTime){
            this.tick++;
        }else{
            this.delete();
            return false;
        }

        return true;
    }
}