class GameImage {
    constructor(imageUrl,posCenter, width,height){
        this.image = new Image();
        this.image.src = imageUrl;
        this.image.onload = function(e){
            this.finished = true;
        }

        this.position = posCenter;
        this.radius = this.image.width;
        this.width = width
        this.height = height || width;

    }
    render(con){
        if(this.image.finished){
    var center = vec2.convertToPixels(this.position);
    var start = {x : center.x-this.width/2, y : center.y-this.height/2};
    var end =  {x : center.x+this.width/2, y : center.y+this.height/2};
    con.drawImage(this.image,start.x,start.y,end.x,end.y);
        }
    }
}