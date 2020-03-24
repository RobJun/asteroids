class StateManager{
    constructor(){
        this.states = new Array();
        this.current = NaN;
        this.controller = undefined;
        this.tick = 0;
        this.SAT = new SATmanager();
    }

    set controls(controller){
        this.controller = controller;
    }
    set addState(state){
        this.states.push(state);
        state.index = this.states.length-1;
        return this.states.length-1;
    }

    createObject(){
        var ship;
        ship = this.current.objects.find((element)=> element.type == "ship");
        if(controller.keys[81]){
        this.current.shooting.shootframe++;
        console.log( this.current.shooting.shootframe);
        if(this.current.index === 1 && ship != undefined && this.current.shooting.shootframe == 30){
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
            this.createObject();
            this.current.render(context,this.controller);
        }
    }
    
    class State{
        constructor(objects,renderCallback){
            this.index = -1;
            this.objects = objects; 
            this.callback = renderCallback || State.defaultCallback;
            this.shooting = {
                shoot : false,
                shootframe : 29
            }
        }
        
        addObjects(objects){
            this.objects.push(objects);
        }
        render(context,controller){
            this.callback(context,this.objects,controller);
        }
        

    static defaultCallback(context,objects,controller){
       objects.forEach(element => {
            element.checkKey(controller);
            element.move();
            element.render(context);
        });
    }
}