class SoundManager {
    constructor(soundMap){
      this.sounds = soundMap;  
      this.muted = true;
    }

    soundProperties(sound,properties){
        for(var k in properties) this.sounds.get(sound)[k]=properties[k]
    }



    set soundMap(map){
        this.sounds = map; 
    }

    play(sound){
        if(!this.muted){
            var ssound = this.sounds.get(sound);
            ssound.play();
            this.wait(_ => ssound.ended === true)
                .then(ssound.load());
        }
    } 


    async playAsync(sound){
        await this.wait(_ => stateManager.soundMan.muted === false)
        this.sounds.get(sound).play();
        this.stopAsync(sound);
    }

    async stopAsync(sound){
        await this.wait(_ =>  stateManager.soundMan.muted === true)
        this.sounds.get(sound).pause();
        this.playAsync(sound);
    }


    async wait(muted){
        var pro = resolve=>{
            if(muted()) {resolve()}
            else setTimeout(() => pro(resolve), 500);
        }
        return new Promise(pro);
    }
    
    

    mute(){
        this.muted = !this.muted;
    }
}