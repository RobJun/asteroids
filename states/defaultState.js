class State{
    constructor(SM,objects,renderCallback){
        this.SM = SM;
        this.SAT = new SATmanager();
        this.index = -1;
        this.objects = objects; 
        this.callback = renderCallback || State.defaultCallback;
        this.Reloadtick = 0;
        this.collision = true;
        this.interval = setInterval(_ => {},99999999999);
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

    realoadAxis(){
        this.SAT.axis = [];
        this.addCollision();
    }
    
    addObjects(objects){
        this.objects.push(objects);
    }
    render(context,controller,delta){
        this.Reloadtick++
        if(this.Reloadtick === 10000){
            this.realoadAxis();
            this.Reloadtick= 0;
        }
        this.callback(context,this.objects,controller,delta, this.SAT, this.collision);
    }

    notify(message, object){
        var m = message.split("=");
        if(m[0] === "damaged"){
           this.SM.soundMan.play = "damageShip";
           this.objects[6].objects[0].updateSize(new vec2(-parseInt(m[1]),0));
        } else if(m[0] === "destroyed"){
            this._destroyed(m,object);
        }else if(m[0] === "create"){
            this._create(m,object);
        }else if(m[0] === "scoreUpdate"){
            this.objects[6].objects[1].updateText = STATS.score;
        }else if(m[0] ==="delete"){
            let arr = this;
            var i = 0;
            for(; i < object.index.length-1;i++){
                arr =  arr.objects[object.index[i]];
            }
            arr.shiftFrom(object.index[i]);
        }else if(m[0] === "start"){
            clearInterval(this.interval);
            this.interval = setInterval(spawnAsteroids,parseInt(m[1]),this);
        }
    }


    _destroyed(m,object){
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
        var scale = object.scaleVec.x;
        arr.shiftFrom(index);
        if(type === "asteroid"){
            STATS.score+= score* STATS.multiplier;
            STATS.destroyed++
            if(scale -0.5 > 0.5){
                this.notify(`create=asteroid=position=${JSON.stringify(center.add(0.1))}=scale=${scale  - 0.5}=collision`)
                this.notify(`create=asteroid=position=${JSON.stringify(center.add(-0.1))}=scale=${scale  - 0.5}=collision`)
            }
            if(!Math.floor(Math.random()*4)){
                console.log(1);
                this.notify("create=powerup");
            }
            this.notify("scoreUpdate");
        } else if(type === "ship"){
            setTimeout((manager)=>{
                manager.change = 3;
                manager.current.reason = object.collided.with;
                manager.current.objects[6].objects[0].text = `${STATS.score}`;
                manager.current.objects[6].objects[1].text = `${STATS.accuracy}%`;
                manager.current.objects[6].objects[2].text = `${STATS.destroyed}`;
                manager.restore(1);
                
            },2000,this.SM);
        }
        var count = this.objects[4].objects.push(new GameImage(this,this.SM.resourceMan.images.get("vybuch"),new vec2(0,0),center,new vec2(AREA.image*scale/2),new vec2(169),true,[0.1]));
                setTimeout((state)=>{
                        state.objects.shift();
                    },700,this.objects[4]);  
    }


    _create(m,object){
        var t = this;
        if(m[1] === "asteroid"){
            var scale = undefined;
            if(m.includes("scale")){
                scale = m[m.indexOf("scale")+1];
            }
            var posit = undefined;
            var vector, dir;
            if(m.includes("position")){
                posit = JSON.parse(m[m.indexOf("position")+1]);
                vector = new vec2(posit.x,posit.y);
                dir = new vec2(((Math.random()*3) -1)/2,((Math.random()*3) -1)/2);
            }else{
            var pos = Math.floor(Math.random()*2);
            var pos2 = Math.random() * 3 -1;
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
            }
            dir = dir.multiply(1/(Math.random()*10+1));


            var aster = new asteroid(t,new vec2(scale || Math.floor(Math.random()*2)+1)).setUp( vector,dir, -0.3);
            if(m.includes("collision"))
                    this.SAT.addSprite(aster);
            else
                aster.setSatIndex(this.objects[1].objects[this.objects[1].objects.length-1]);
            this.objects[1].addObject(aster);


        }else if(m[1] === "bullet"){
            this.SM.soundMan.play = "shoot";
            for(var i = 0; i < object.controls.bullet;i++){
                if(i == 2) i++;
            var bullet = new Bullet(t).setUp(object.getActPosPair(i),object.getVertPair(0).multiply(50));
            bullet.satIndex = 1;
            this.objects[3].addObject(bullet);
            }
            
        }else if(m[1]==="powerup"){
            var vector = new vec2();
            if(m.includes("position")){
                posit = JSON.parse(m[m.indexOf("position")+1]);
                vector = new vec2(posit.x,posit.y);
            }else{

                var operatorX = Math.floor(Math.random()*2)-1;
                var operatorY =  Math.floor(Math.random()*2)-1;
                vector = new vec2(Math.random()*0.9*operatorX,Math.random()*0.9*operatorY)
            }
            var power = new PowerUp(t,this.SM.resourceMan.images.get("sprite"), vector,new vec2(AREA.image));
            this.objects[5].addObject(power);
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