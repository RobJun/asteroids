class State{
    constructor(SM,objects,renderCallback){
        this.SM = SM;
        this.SAT = new SATmanager();
        this.index = -1;
        this.objects = objects; 
        this.callback = renderCallback || State.defaultCallback;

        this.score = 0;
    }


    addCollision(){
        if(this.objects !== undefined){
        for(var i = 0;i < this.objects.length;i++){
            if("collisionMap" in this.objects[i] || this.objects[i].type === "group")
                this.objects[i].setCollision(this.SAT);
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
           this.objects[5].objects[0].updateSize(new vec2(parseInt(m[1],0)));
        } else if(m[0] === "destroyed"){
            this.SM.soundMan.play = "explosion";
            
            let arr = this;
            var i = 0;
            for(; i < object.index.length-1;i++){
                arr =  arr.objects[object.index[i]];
            }
            var index = object.index[i];
            var type = object.type;
            var center = object.center;
            arr.objects.splice(index,1, new GameImage(this,this.SM.resourceMan.images.get("sprite"),new vec2(128,768),center,64,64,128,128,false));
            setTimeout((state)=>{
                arr.splice(index,1);
            },2000,this);
            if(type === "ship"){
                var score = object.stats.score;
                var acc = object.stats.acc;
                var des = object.stats.destroyed;
                setTimeout((manager)=>{
                    manager.change = 3;
                    manager.current.reason = object.collided.with;
                    manager.current.objects[6].objects[0].text = `${score}`;
                    manager.current.objects[6].objects[1].text = `${acc}%`;
                    manager.current.objects[6].objects[2].text = `${des}`;
                    manager.restore(1);
                },2000,this.SM);
            }
        }else if(m[0] === "create"){

        }else if(m[0] === "scoreUpdate"){
            this.objects[5].objects[1].updateText = object.stats.score;
        }
    }
    

static defaultCallback(context,objects,controller, delta,sat){
   objects.forEach((element,index) => {
       if(element.type === "group"){
                element.checkWithin(sat);
                for(var i = index+1; i < objects.length; i++){
                    element.checkWith(sat,objects[i].objects);
                }
       }
        element.checkKey(controller);
        element.move(delta);
        element.render(context);
    });
}
}