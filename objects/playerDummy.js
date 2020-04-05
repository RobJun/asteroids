
class PlayerDummy extends Player{
    constructor(position, simulate){
        super()
        this.tick = 1;
        this.sim = 0;
        this.pos = position || new vec2(0,0);
        this.simulate = simulate;
        

        this.speed = 0.5;
        this.rotSpeed = 2;
        this.playable = false;
        this.controls = {
            shoot : false,
            move : false,
            rotate : 0
        }

        for(var i = 0; i < this.actualPosition.length;i+=2){
            this.actualPosition[i] += this.pos.x;
            this.actualPosition[i+1] += this.pos.y;
        }

    }
    
    
    simKeypress(){
        if(this.tick%60 == 0){
            switch(this.simulate[this.sim]){
                case 0:
                    this.rotate = 0;
                    this.controls.move = false;
                    break;
                case 1:
                    this.rotate = 1;
                    break;
                case 2:
                    this.rotate = -1;
                    break;
                case 3:
                    this.controls.move = 1;
                    break;
            } 
            this.sim++
            this.sim = this.sim%this.simulate.length;
        }
        this.tick++;
    }

    teleport(moveVec){
        for(var i = 0;i < this.actualPosition.length;i+=2){
            var vec = calculateVector({x : this.actualPosition[i], y : this.actualPosition[i+1]}, calculateTranslate(moveVec))
            this.actualPosition[i] = vec.x;
            this.actualPosition[i+1] = vec.y;
        }
    }

    move(delta){
        this.simKeypress();
        this._move(delta);
    }
}