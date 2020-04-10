class State{
    constructor(SM,objects,renderCallback){
        this.SM = SM;
        this.SAT = new SATmanager();
        this.index = -1;
        this.objects = objects; 
        this.callback = renderCallback || State.defaultCallback;

        this.score = 0;
        this.collision = true;
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
        this.callback(context,this.objects,controller,delta, this.SAT, this.collision);
    }

    notify(message, object){
        var m = message.split("=");
        if(m[0] === "damaged"){
           this.SM.soundMan.play = "damageShip";
           this.objects[5].objects[0].updateSize(new vec2(-parseInt(m[1]),0));
        } else if(m[0] === "destroyed"){
            this.SM.soundMan.play = "explosion";
            let arr = this;
            var i = 0;
            for(; i < object.index.length-1;i++){
                arr =  arr.objects[object.index[i]];
            }
            var score = object.score || 0;
            var index = object.index[i];
            var type = object.type;
            var center = object.center;
            arr.shiftFrom(index);
            var count = arr.objects.push(new GameImage(this,this.SM.resourceMan.images.get("sprite"),new vec2(128,768),center,new vec2(AREA.image),new vec2(128),false));
            setTimeout((state)=>{
                arr.objects.splice(count-1,1);
            },2000,this);


            if(type === "asteroid"){
                this.objects[2].objects[0].stats.score+= score;
                this.notify("scoreUpdate", this.objects[2].objects[0]);
            } else if(type === "ship"){
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
            var t = this;
                if(m[1] === "asteroid"){
                    var scale = undefined;
                    if(m.includes("scale")){
                        scale = m[m.indexOf("scale")+1];
                    }
                    var pos = Math.floor(Math.random()*2);
                    var pos2 = Math.random() * 3 -1;
                    var vector, dir;
                    if(pos == 0) pos-=1;
                    var dirO = -Math.random()*pos;
                    var dir1 = (Math.random()*3) -1;
                    if(Math.floor(Math.random()*2) == 0){
                        dir = new vec2(dirO, dir1)
                        vector = new vec2(pos,pos2);
                    }else{
                        vector = new vec2(pos2,pos);
                        dir = new vec2(dir1,dirO);
                    }
                    dir = dir.multiply(1/(Math.random()*10+1));


                    var aster = new asteroid(t,new vec2(scale || Math.random()*2+1)).setUp( vector,dir, -0.3);
                    if(m.includes("collision"))
                            this.SAT.addSprite(aster);
                    else
                        aster.setSatIndex(this.objects[1].objects[this.objects[1].objects.length-1]);
                    this.objects[1].objects.push(aster);


                }else if(m[1] === "bullet"){
                    this.SM.soundMan.play = "shoot";
                    var bullet = new Bullet(t).setUp(object.getActPosPair(0),object.getVertPair(0).multiply(50));
                    bullet.satIndex = 1;
                    this.objects[3].addObject(bullet);
                    
                }
        }else if(m[0] === "scoreUpdate"){
            this.objects[5].objects[1].updateText = object.stats.score;
        }else if(m[0] ==="delete"){
            let arr = this;
            var i = 0;
            for(; i < object.index.length-1;i++){
                arr =  arr.objects[object.index[i]];
            }
            arr.shiftFrom(object.index[i]);
        }
    }
    

static defaultCallback(context,objects,controller, delta,sat, collision){
   objects.forEach((element,index) => {
       if(element.type === "group" && collision){
                element.checkWithin(sat);
                for(var i = index+1; i < objects.length; i++){
                    if(objects[i].type === "group")
                        element.checkWith(sat,objects[i].objects);
                }
       }
        element.checkKey(controller);
        element.move(delta);
        element.render(context);
    });
}
}