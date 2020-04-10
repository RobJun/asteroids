class RenderGroup {
    constructor(parent, objects){
        this.type = "group";
        this.parent = parent;
        this.objects = objects || new Array();
        this.index = new Array;
    }

    notify(message,object){
                this.parent.notify(message, object);
    }


    setCollision(sat){
        if(this.objects !== undefined){
        for(var i = 0;i < this.objects.length;i++){
            if("collisionMap" in this.objects[i])
                this.objects[i].setCollision(sat);
        }
    }
    }

    
    set stateI(index){
        this.index.push(index);
        this.objects.forEach((e,i) => {
            e.index = new Array()
            e.index.push(index, i)});
    }
    
    addObject(object){
        object.index = this.index.slice();
        object.index.push(this.objects.length);
        this.objects.push(object);
    }
    
    
    shiftFrom(index){
            for(var i = index+1; i < this.objects.length; i++){
                this.objects[i].index[this.objects[i].index.length-1] = i-1;
            }
            this.objects.splice(index,1)
        }
    
    
    checkWithin(sat){
        var objects = this.objects;
        this.objects.forEach((element,index) => {
            if("collisionMap" in element){
                 for(var i = index+1; i < objects.length; i++){
                     if("collisionMap" in objects[i]){
                            if(sat.checkForCollision(element,objects[i])){
                                 element.collided.with = objects[i];
                                 element.collided.happend = true;
                                 objects[i].collided.with = element;
                                 objects[i].collided.happend = true;
                             }
                     }
                 }
             }
        });
    }

    checkWith(sat,group){
        this.objects.forEach((element) => {
            if("collisionMap" in element){
                group.forEach(e => {
                    if("collisionMap" in e){
                        if(sat.checkForCollision(element,e)){
                            element.collided.with = e;
                            element.collided.happend = true;
                            e.collided.with = element;
                            e.collided.happend = true;
                        }
                    }
                })
             }
        });
    }

    checkKey(controller){
        this.objects.forEach(e => e.checkKey(controller));
    }

    move(delta){
        this.objects.forEach(e => e.move(delta));
    }

    render(context){
        this.objects.forEach(e => e.render(context));
    }
}