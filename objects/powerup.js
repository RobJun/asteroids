class PowerUp extends GameImage{
    constructor(parent,key,posCenter){
        
        var pos = new vec2(Math.floor(Math.random()*2)*128,632+Math.floor(Math.random()*2)*128);
        while(pos.x == 128 && pos.y ==760){
            pos = new vec2(Math.floor(Math.random()*2)*128,632+Math.floor(Math.random()*2)*128);
        }
        super(parent,key,pos,posCenter, new vec2(AREA.image),new vec2(128),undefined,undefined);
        this.dSpeed = 60;
        this.tick = 0;
        this.startDis = this.maxTime/2;
        this.maxTime = 800;
        this.type="powerup";
        this.item=pos.x/128 + pos.y/128- 632;
    }

    onCollision(object){
        if(object.type === "ship"){
            console.log("aaaaa");
            this.notify("delete",this);
        }
    }

    move(delta){

        return true;
    }
}