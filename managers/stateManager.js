class StateManager{
    constructor(){
        this.states = new Array();
        this.current = NaN;
        this.controller = undefined;
        this.tick = 0;
        this.sprite = new Image();
        this.background = new Image();
        this.time = {
            lastUpdate : Date.now(),
            delta : 0
        }
        this.copies = new Map();
    }
    
    async loadImages(){
        var x = new Promise((resolve,reject)=>{ 
            this.sprite.src = "./res/sprite.png";
            console.log("e");
            this.sprite.onload = ()=> resolve(this.sprite)
        })
        
        var y = new Promise((resolve,reject)=>{ 
            this.background.src= "./res/background.jpg";    
            this.background.onload = ()=> resolve(this.background)
        })
        return {x,y};
    }



    calculateDelta(){
        var now = Date.now();
        this.time.delta = (now - this.time.lastUpdate)/1000;
        this.time.lastUpdate = now;
    }


    set controls(controller){
        this.controller = controller;
    }
    set addState(state){
        this.states.push(state);
        state.index = this.states.length-1;
        state.sat = this.SAT;
        return this.states.length-1;
    }

    set saveState(index){
        var objects = new Array();
        this.states[index].objects.forEach(e =>{
            var o = Object.assign({},e);
            if("actualPosition" in o){
            o.vertecies = e.vertecies.slice();
            o.actualPosition = e.actualPosition.slice();
            }
            objects.push(Object.setPrototypeOf(o,Object.getPrototypeOf(e)));
        })
        this.copies.set(index,objects);
    }

     restore(index){
        if(this.copies.has(index)){
            this.states[index].objects = this.copies.get(index);
            this.saveState = index;
            return 1;
        }
        return 0;
    }
    

    createObject(){
        var ship;
        ship = this.current.objects.find((element)=> element.type == "ship");
        if(controller.keys[81]){
        this.current.shooting.shootframe++;
        if(this.current.index === 1 && ship != undefined && ship.playable == true && this.current.shooting.shootframe == 30){
                this.current.addObjects(new bullet().setUp(ship.getActPosPair(0),ship.getVertPair(0)))
                this.current.shooting.shootframe=0;
        }
    }

    }
        
    set change(index){
        this.current = this.states[index];
    }
        
        
    render(context){
        this.tick++;
        this.calculateDelta();
        this.createObject();
        this.current.render(context,this.controller,this.time.delta);
    }
}
    
    class State{
        constructor(objects,renderCallback){
            this.SAT = new SATmanager();
            this.index = -1;
            this.objects = objects; 
            this.callback = renderCallback || State.defaultCallback;
            this.shooting = {
                shoot : false,
                shootframe : 29
            }
            if(this.objects !== undefined){
            this.SAT.addSprite(new Shape());
            for(var i = 0;i < this.objects.length;i++){
                if("collisionMap" in this.objects[i])
                this.SAT.addSprite(this.objects[i]);
            }
            }
            console.log(this.SAT);
        }
        
        addObjects(objects){
            this.objects.push(objects);
        }
        render(context,controller,delta){
            this.callback(context,this.objects,controller,delta, this.SAT);
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