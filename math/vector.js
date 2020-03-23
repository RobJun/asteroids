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


    static convertToPixels(vector){
        return new vec2((AREA.width*vector.x+AREA.width)/2,(-AREA.height*vector.y+AREA.height)/2);
    }
}

class vec3 extends vec2{ 
    //used for load order

    constructor(x,y,z){
        if(x === Object){
            this.x = x.x;
            this.y = x.y;
        }
        this.z = z || y;
    }
    get vector2(){
        return new vec2(this.x,this.y);
    }
}