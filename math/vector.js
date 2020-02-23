class vec2{
    constructor(x,y){
        if(x === undefined){
            x = 0.0;
        }
        if(y === undefined){
            y =0.0;
        }
        this.x = x;
        this.y = y;
    }
    invert(){
        return {x : -this.x, y : -this.y};
    }


    getDistancefromP(vector){
        return Math.sqrt((this.x-vector.x)*(this.x-vector.x)+(this.y-vector.y)*(this.y-vector.y));
    }
}

