
class PlayerDummy extends Player{
    constructor(parent,position, simulate){
        super(parent)
        this.tick = 1;
        this.sim = 0;
        this.pos = position || new vec2(0,0);
        this.simulate = simulate;
        this.time = 0;

        this.speed = 0.5;
        this.rotSpeed = 2;
        this.playable = false;


        for(var i = 0; i < this.actualPosition.length;i+=2){
            this.actualPosition[i] += this.pos.x;
            this.actualPosition[i+1] += this.pos.y;
        }

    }
    
    
    simKeypress(){
        if(this.time >= 1){
            switch(this.simulate[this.sim]){
                case 0:
                    this.controls.rotate = 0;
                    this.controls.move = false;
                    this.controls.shoot = false;
                    break;
                case 1:
                    this.controls.rotate = 1;
                    break;
                case 2:
                    this.controls.rotate = -1;
                    break;
                case 3:
                    this.controls.move = true;
                    break;
                case 4:
                    this.controls.shoot = true;
                    break;
            } 
            this.sim++
            this.sim = this.sim%this.simulate.length;
            this.time=0;
        }
    }

    teleport(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    }

    move(delta){
        this.simKeypress(delta);
        this.time += delta;
        this._move(delta);
    }
}