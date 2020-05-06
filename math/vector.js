class vec2{
    constructor(x,y){
        if(x === undefined){
            x = 0.0;
        }
        if(y === undefined){
            y = x;
        }
        this.x = x;
        this.y = y;
    }

    invert(){
        return new vec2(-this.x,-this.y);
    }

    multiply(x){
        return new vec2(this.x*x,this.y*x);
    }

    add(x){
        return new vec2(this.x+x,this.y+x);
    }

    copy(x){
        this.x = x.x;
        this.y = x.y;
        return this;
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

    static convertToPixels(vector){
        return new vec2((AREA.width*vector.x+AREA.width)/2,(-AREA.height*vector.y+AREA.height)/2);
    }

    static convertToCoords(vector){
        return new vec2((2*vector.x-AREA.width)/AREA.width,-(2*vector.y-AREA.height)/AREA.height);
    }
}