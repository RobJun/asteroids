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
        return new vec2(-this.x,-this.y);
    }


    getDistancefromP(vector){
        return Math.sqrt((this.x-vector.x)*(this.x-vector.x)+(this.y-vector.y)*(this.y-vector.y));
    }

    magnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    dotProd(vector){
        return (this.x*vector.x + this.y*vector.y);
    }

    unitVector(){
        return new vec2(this.x/this.magnitude(), this.y/this.magnitude());
    }
}

