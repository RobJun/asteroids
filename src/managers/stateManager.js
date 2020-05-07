class StateManager{
    constructor(){
        this.states = new Array();
        this.current = NaN;
        this.controller = undefined;
        this.resourceMan = new ResourceManager();
        this.soundMan = new SoundManager();
        this.tick = 0;
        this.time = {
            lastUpdate : Date.now(),
            delta : 0
        }

        this.pressed = false;

        this.resourceMan.addResource("./res/background.jpg",
                                     "./res/sprite.png",
                                     "./res/sounds/mainTitle.wav",
                                     "./res/sounds/explosion.wav",
                                     "./res/sounds/shoot.wav",
                                     "./res/sounds/damageShip.mp3",
                                     "./res/vybuch.png"
                                      );
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
        if(typeof this.states[index] !== 'undefined'){
            this.states.splice(index,1,new GameState(this));
        }
    }

    notify(message,object){
        var m = message.split("=");
        if(m[0] == "pause"){
            if(m[1] === "on"){
            var s = new Paused(this);
                s.prev = this.current;
                this.current = s
            }else if(m[1] === "off"){
                this.current = this.current.prev;
            }
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
            new OverState(this),
        ]
        this.soundMan.soundProperties("mainTitle",{loop : true})
        this.soundMan.playAsync("mainTitle");
        this.soundMan.soundProperties("mainTitle",{volume : 0.1});
        this.soundMan.soundProperties("explosion",{volume : 0.1});
        this.soundMan.soundProperties("shoot",{volume : 0.1});
        this.soundMan.soundProperties("damageShip",{volume : 0.1});
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
        if(this.controller.keys[88] && !this.pressed){
            this.states[0].objects[2].objects[2].action(this.states[0].objects[2].objects[2]);
            this.pressed = true;
        }else if(!this.controller.keys[88]){
            this.pressed = false;
        }

        this.current.render(context,this.controller,this.time.delta);
    }
}