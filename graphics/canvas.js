class GameArea {
    constructor(id,aspectRatio,width, stateMan){
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.aspectRatio = aspectRatio || 3/4;
        this.canvas.width = width || 800;
        this.canvas.height= this.canvas.width*aspectRatio;
        this.stateManager = stateMan;
        this.game = this;
        this.limitFrames = 60;
    }

    clear(context){
        context.clearRect(0,0, this.canvas.width,this.canvas.height);
    }

    updateView(){
        this.clear(this.context);
        this.stateManager.render(this.context);
        setTimeout( ()=>{
        requestAnimationFrame(()=>{
            this.updateView();
        })},1000/this.limitFrames);
    }

    async start(){
        this.stateManager.loadImages();
        this.updateView();
    }
}