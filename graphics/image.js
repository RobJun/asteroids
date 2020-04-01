class GameImage extends _SUPER_OBJECT{
    constructor(image,posSprite,posCenter, width,height,spritewidth,spriteheight){
        super();
        this.type = "image";
        this.image = image;
        this.draw = true;
        this.posImg = posSprite; 

        this.position = posCenter;
        this.radius = this.image.width;
        this.width = width  || 800;
        this.height = height || width;
        this.spritewidth = spritewidth || this.width;
        this.spriteheight = spriteheight || this.height;

    }
    render(con){

    var center = vec2.convertToPixels(this.position);
    var start = {x : center.x-this.width/2, y : center.y-this.height/2};
    con.drawImage(this.image,
                    this.posImg.x,this.posImg.y,
                    this.spritewidth,this.spriteheight,
                    start.x,start.y,
                    this.width,this.height);
    }

}