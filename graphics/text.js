class GameText{
    constructor(string, vector2 = {x,y}, properties = { font, size, color, align}){
        this.text = string;
        this.vec = vector2;
        this.font = properties.font || "Arial";
        this.size = properties.size || "10px";
        this.color = properties.color || "white";
        this.align = properties.align || "center";
    }   
    set sFont(font){
        this.font = font;
    }

    set sSize(size){
        this.size = size;
    }
    set sColor(color){
        this.color = color;
    }


    render(con){
        con.save();
        if(typeof this.size === Number){
            this.size += "px";
        }
        con.textAlign = this.align;
        con.font = `${this.size} '${this.font}'`;
        con.fillStyle = this.color;
        var vector = vec2.convertToPixels(this.vec);
        con.fillText(this.text, vector.x, vector.y);
        con.restore();
    }
}