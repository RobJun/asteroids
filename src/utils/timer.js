class Timer{
    constructor(parent){
        this.parent = parent;
        this.spawntime = 0;
    }
    render(con){}
    move(delta){};
    checkKey(controller){}

    move(delta){
        this.spawntime += delta;
        this.asteroidSpawn();
    }

    asteroidSpawn(){
        console.log(STATS.spawnedAsteroids, Math.pow(0.940367,STATS.destroyed-36)+3, Math.floor(this.spawntime))
        if(STATS.spawnedAsteroids <= 10 && this.spawntime >=  Math.pow(0.940367,STATS.destroyed-36)+3){
            this.parent.notify("create=asteroid=collision");
            this.spawntime =0;
        }else if(STATS.spawnedAsteroids == 0){
            for(var i = 0; i < 5;i++){
                this.parent.notify("create=asteroid=collision");
            }
        }
    }
}

