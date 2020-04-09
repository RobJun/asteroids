class SoundManager {
    constructor(soundMap){
      this.sounds = soundMap;  
      this.muted = true;
    }

    soundProperties(sound,properties){
        for(var k in properties) this.sounds.get(sound)[k]=properties[k];
    }



    set soundMap(map){
        this.sounds = map; 
    }

    set play(sound){
        if(!this.muted){
            this.sounds.get(sound).play();
        }
    } 


    async playAsync(sound){
        await wait(_ => stateManager.soundMan.muted === false)
        this.sounds.get(sound).play();
        this.stopAsync(sound);
    }

    async stopAsync(sound){
        await wait(_ =>  stateManager.soundMan.muted === true)
        this.sounds.get(sound).pause();
        this.playAsync(sound);
    }

    
    

    mute(){
        this.muted = !this.muted;
    }
}