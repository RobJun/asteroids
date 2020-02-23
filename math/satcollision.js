class SAT{
    constructor(){
        this.axis = new Array;
        this.unIndex = new Array;
    }

    addSprite(object = {vertecies,satIndex}){
        var Axis = new Array();
        for(var i = 0; i < object.vertecies.length/2-1; i++){
                var vec = new vec2();
                vec.y = (object.vertecies[2*(i+1)]-object.vertecies[2*i]);
                vec.x = -(object.vertecies[2*(i+1)+1]-object.vertecies[2*i+1]);
                Axis.push(vec.unitVector());
        }
        {
        var vec = new vec2();
        vec.y = object.vertecies[0]-object.vertecies[object.vertecies.length-2];
        vec.x = -(object.vertecies[1]-object.vertecies[object.vertecies.length-1]);
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

        this.axis.push(Axis.slice());
        this.unIndex.push(UniqAxis.slice());

        object.satIndex = this.axis.length-1;        
    }

    updateAxis(object = {vertecies,satIndex}){
        if(object.satIndex == -1) return "error not in collision detection";
        var axis = this.axis[satIndex];
        this.unIndex[satIndex].forEach(element => {
            axis[element].y = (object.vertecies[2*(element+1)]-object.vertecies[2*element]);
            axis[element].x = -(object.vertecies[2*(element+1)+1]-object.vertecies[2*element+1]);
            axis[element].unitVector();
        });

    }
    checkForCollision(object1 = {actualPosition, satIndex},object2 = {actualPosition, satIndex}){
        
    }

    deleteAxis(object = {satIndex}){

    }
}