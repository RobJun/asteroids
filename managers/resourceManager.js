class ResourceManager{
    constructor(){
        this.imageURL = new Map();
        this.soundURL = new Map();

        this.images = new Map();
        this.sounds = new Map();
    }

    addResource(...resourceURLs){
        let images = this.imageURL;
        let sounds = this.soundURL;
        resourceURLs.forEach(e =>{
            var split = e.replace(/(.{1,}\/(.*)\/)|(http.)|(\.\/)/g,"").split(".");
            if(/(jpg)|(png)|(gif)/i.test(split[split.length - 1])){
                images.set(split[0],e);
            }else if(/(mp3)/i.test(split[split.length - 1])){
                sounds.set(split[0],e);
            }else{
                console.log(split[split.length - 1] + " not supported format");
            }
        })
    }
    
    async loadResources(){
        this.loadSounds();
        await this.loadImages();
    }

    loadSounds(){
        let sounds = this.sounds;
        this.soundURL.forEach((v,k)=>{
            sounds.set(k,new Audio(v));
        })
    }

    async loadImages(){
        var promises = new Array();
        var rM = this;
        this.imageURL.forEach((v,k)=>{
            promises.push(rM.loadImage(k))
        });
        return Promise.all(promises)
    }
    async loadImage(key){
        let images = this.images;
        let url = this.imageURL;
        return new Promise((resolve,reject)=>{ 
            const img = new Image();

            img.src = url.get(key);
            img.onload = ()=> { 
                images.set(key,img);
                resolve(img);
            }
            img.onerror = (err) => { reject(err);  }
        })
    }
}