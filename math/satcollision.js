class SAT{
    constructor(){
        this.axis = new Array;
        this.axisColor = new Array;
        this.draw = 0;
    }

    addSprite(object = {collisionMap,satIndex}){
        var Axis = new Array();
        for(var i = 0; i < object.collisionMap.length/2-1; i++){
                var vec = new vec2();
                vec.y = (object.collisionMap[2*(i+1)]-object.collisionMap[2*i]);
                vec.x = -(object.collisionMap[2*(i+1)+1]-object.collisionMap[2*i+1]);
                Axis.push(vec.unitVector());
        }
        {
        var vec = new vec2();
        vec.y = object.collisionMap[0]-object.collisionMap[object.collisionMap.length-2];
        vec.x = -(object.collisionMap[1]-object.collisionMap[object.collisionMap.length-1]);
        Axis.push(vec.unitVector());
        }

        var UniqAxis= new Array();
        for(var i = 0, j = 0; i< Axis.length;i++){
            var uniq = 1;
            for(var j = 0;j < UniqAxis.length;j++){
                if(Math.abs(Axis[i].x) == Math.abs(Axis[UniqAxis[j]].x) 
                && Math.abs(Axis[i].y) == Math.abs(Axis[UniqAxis[j]].y)){
                        uniq = 0;
                }
            }
            (uniq) ? UniqAxis.push(i) : uniq = 1;
        }    
        
     /*   var filtered = Axis.filter((el,index) => {
            return (UniqAxis.includes(index)) ? true : false;
        })*/

        this.axis.push(Axis.slice());

        object.satIndex = this.axis.length-1;     
        return object.satIndex;   
    }

    updateAxis(object = {collisionMap,satIndex}){
        if(object.satIndex == -1) return "error not in collision detection";
        var axis = this.axis[object.satIndex];

        for(var ind = 0, element = axis[ind]; ind < axis.length-2;ind++){
            element.y = (object.collisionMap[2*(ind+1)]-object.collisionMap[2*ind]);
            element.x = -(object.collisionMap[2*(ind+1)+1]-object.collisionMap[2*ind+1]);
            element = element.unitVector();
        };
        axis[axis.length-1].x = (object.collisionMap[0]-object.collisionMap[object.collisionMap.length-2]);
        axis[axis.length-1].y = (object.collisionMap[1]-object.collisionMap[object.collisionMap.length-1]);
        axis[axis.length-1] = axis[axis.length-1].unitVector();

    }
    checkForCollision(object1 = {actualPosition},object2 = {actualPosition},drawAxis,context){
        var obj2Max, obj2Min;
        var obj1Max, obj1Min;
        var collision = 0;
        var numberAx = 0;
        this.axis.forEach((element, k) => {
            element.forEach((vector, j) => {
                //obj2Max = obj2Min = obj1Max =  obj1Min = NaN;
                numberAx++;
                for(var i = 0; i < object1.actualPosition.length-1;i+=2){
                    
            var projFloat = (vector.dotProd({x : object1.actualPosition[i], y : object1.actualPosition[i+1]})/vector.magnitude());
            if(i == 0){
                obj1Max = projFloat;
                obj1Min = projFloat;
            }else{
                if(projFloat > obj1Max){
                    obj1Max = projFloat;
                }else if(projFloat < obj1Min){
                    obj1Min = projFloat;
                }
                }
             }
             for(var i = 0; i < object2.actualPosition.length-1;i+=2){
                 var projFloat = (vector.dotProd({x : object2.actualPosition[i], y : object2.actualPosition[i+1]})/vector.magnitude());
                 if(i == 0){
                     obj2Max = projFloat;
                     obj2Min = projFloat;
                    }else{
                        if(projFloat > obj2Max){
                            obj2Max = projFloat;
                            
                        }else if(projFloat < obj2Min){
                            obj2Min = projFloat;
                        }
                    }
                }
                if(this.draw && drawAxis){
                var vect = new vec2(vector.x*obj1Min, vector.y*obj1Min);
                var axisV = convertToPixels(vect.x,vect.y);
                context.beginPath();
                context.moveTo(axisV.x, axisV.y);
                vect = new vec2(vector.x*obj1Max, vector.y*obj1Max);
                axisV = convertToPixels(vect.x,vect.y);
                context.lineTo(axisV.x,axisV.y);
                context.closePath();
                context.strokeStyle= "yellow";
                context.stroke();

                vect = new vec2(vector.x*obj2Min, vector.y*obj2Min);
                axisV = convertToPixels(vect.x,vect.y);
                context.beginPath();
                context.moveTo(axisV.x, axisV.y);
                vect = new vec2(vector.x*obj2Max, vector.y*obj2Max);
                axisV = convertToPixels(vect.x,vect.y);
                context.lineTo(axisV.x,axisV.y);
                context.closePath();
                context.strokeStyle= "green";
                context.stroke();
                }

                if((obj2Max - obj1Min) * (obj1Max - obj2Min) >= 0) 
                {collision++}
            }) 
        });
        if(collision == numberAx){
            return true;
        }
        return false;
    }

    deleteAxis(object = {satIndex}){

    }

    drawAxis(context){
        this.draw = 1;
        this.axis.forEach(el =>{
            el.forEach(ele =>{
                context.beginPath();
        var axisV = convertToPixels(-ele.x,-ele.y);
        context.moveTo(axisV.x, axisV.y);
         axisV = convertToPixels(ele.x,ele.y);
        context.lineTo(axisV.x,axisV.y);
        context.closePath();
        context.strokeStyle= "#FF000044";
        context.stroke();
            })
        })
    }
}