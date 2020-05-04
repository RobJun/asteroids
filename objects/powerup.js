class PowerUp extends GameImage{
    constructor(parent,key,posCenter){
        
        var pos = new vec2(Math.floor(Math.random()*2)*128,632+Math.floor(Math.random()*2)*128);
        while(pos.x == 128 && pos.y ==760){
            pos = new vec2(Math.floor(Math.random()*2)*128,632+Math.floor(Math.random()*2)*128);
        }
        super(parent,key,pos,posCenter, new vec2(AREA.image),new vec2(128),undefined,undefined);
        this.dSpeed = 60;
        this.time = 0;
        this.startDis = this.maxTime/2;
        this.maxTime = 5;
        this.type="powerup";
        if(pos.x/128 === 1){
            this.item = 1;
        }else if((pos.y-632)/128 ===1){
            this.item = 2;
        }else{
            this.item=0;
        }
    }

    onCollision(object){
        if(object.type === "ship"){
            this.notify("delete",this);
        }
    }

    move(delta){
        this.time += delta;
        if(this.time >= this.maxTime){
            this.notify("delete",this);
        }
        return true;
    }
}