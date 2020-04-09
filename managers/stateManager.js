class StateManager{
    constructor(){
        this.states = new Array();
        this.current = NaN;
        this.controller = undefined;
        this.resourceMan = new ResourceManager();
        this.soundMan = new SoundManager();
        this.tick = 0;
        this.sound = true;
        this.time = {
            lastUpdate : Date.now(),
            delta : 0
        }
        this.copies = new Map();

        this.resourceMan.addResource("./res/background.jpg");
        this.resourceMan.addResource("./res/sprite.png");
        this.resourceMan.addResource("./res/sounds/mainTitle.wav");
        this.resourceMan.addResource("./res/sounds/explosion.wav");
        this.resourceMan.addResource("./res/sounds/shoot.wav");
        this.resourceMan.addResource("./res/sounds/damageShip.mp3");
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

     restore(index){
        var t =this;
        if(typeof this.states[index] !== 'undefined'){
            this.states.splice(index,1,new GameState(t));
        }
    }


    async init(){
        await this.resourceMan.loadResources();
        this.soundMan.soundMap = this.resourceMan.sounds;
        var states = [
            //Hlavne Menu
            new MenuState(this),
            //hra
            new GameState(this),
            //ovladanie
            new ControlState(this),
            //game over
            new OverState(this)
        ]
        this.soundMan.soundProperties("mainTitle",{loop : true})
        this.soundMan.playAsync("mainTitle");
        let t = this;
        states.forEach(e =>{
            t.addState = e;
        })
        this.change = 0;
    }
    
        
    set change(index){
        this.current = this.states[index];
    }
        
        
    render(context){
        this.tick++;
        this.calculateDelta();
        this.current.render(context,this.controller,this.time.delta);
    }
}