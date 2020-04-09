class State{
    constructor(SM,objects,renderCallback){
        this.SM = SM;
        this.SAT = new SATmanager();
        this.index = -1;
        this.objects = objects; 
        this.callback = renderCallback || State.defaultCallback;
    }


    addCollision(){
        if(this.objects !== undefined){
        for(var i = 0;i < this.objects.length;i++){
            if("collisionMap" in this.objects[i])
            this.SAT.addSprite(this.objects[i]);
        }
    }
    }

    setIndexes(){
        this.objects.forEach((e,i)=>{
            e.stateI = i;
        })
    }
    
    addObjects(objects){
        this.objects.push(objects);
    }
    render(context,controller,delta){
        this.callback(context,this.objects,controller,delta, this.SAT);
    }

    notify(message, object){
        var m = message.split("=");
        if(m[0] === "damaged"){
           this.SM.soundMan.play = "damageShip"; 
           if(this.objects[this.objects.length-1].type === "health"){
                this.objects[this.objects.length-1].updateSize(new vec2(parseInt(m[1]),0));
           }else if(this.objects[this.objects.length-2].type === "health"){
                this.objects[this.objects.length-1].updateSize(new vec2(parseInt(m[1]),0));
           }
        } else if(m[0] === "destroyed"){
            this.SM.soundMan.play = "explosion";
            var index = object.index;
            var type = object.type;
            var center = object.center;
            this.objects.splice(index,1, new GameImage(this,this.SM.resourceMan.images.get("sprite"),new vec2(128,768),center,64,64,128,128,false));
            setTimeout((state)=>{
                state.objects.splice(index,1);
            },2000,this);
            if(type === "ship"){
                setTimeout((manager)=>{
                    manager.change = 3;
                    manager.current.reason = object.collided.with;
                    manager.restore(1);
                },2000,this.SM);
            }
        }else if(m[0] === "create"){

        }
    }
    

static defaultCallback(context,objects,controller, delta,sat){
   objects.forEach((element,index) => {
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
        element.checkKey(controller);
        element.move(delta);
        element.render(context);
    });
}
}