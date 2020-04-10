class Score extends GameText{
    constructor(parent,score){
        super(parent,"score: 0", new vec2(0.0,0.9),{font : "Orbitron",size : 30});
        this.score = score;
        this.add = 0;
    }

    set updateText(text){
        this.text = `score: ${text}`;
    }
}