class GameArea {
    constructor(id,aspectRatio,width, stateMan){
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.aspectRatio = aspectRatio || 3/4;
        this.canvas.width = width || 800;
        this.canvas.height= this.canvas.width*aspectRatio;
        this.stateManager = stateMan;
        this.game = this;
    }

    clear(context){
        context.clearRect(0,0, this.canvas.width,this.canvas.height);
    }

    updateView(){
        this.clear(this.context);
        this.stateManager.render(this.context);
        requestAnimationFrame(()=>{
            this.updateView();
        })
    }

    async start(){
        await this.stateManager.init();
        this.updateView();
    }
}