class GameImage extends _SUPER_OBJECT{
    constructor(parent,key,posSprite,posCenter, proportions,sprite,animate,onTicks){
        super(parent);
        this.tick = 1;

        this.onTicks = onTicks || [60];
        this.onTicksCurrent = 0;
        this.animate = animate || false;
        this.type = "image";
        this.image = key;
        this.draw = true;
        this.posImg = posSprite; 

        this.position = posCenter;
        this.radius = proportions.x;
        this.width = proportions.x;
        this.height = proportions.y;
        this.spritewidth = sprite.x;
        this.spriteheight = sprite.y;

    }


    updateImageLeft(){
        this.posImg.x = (this.posImg.x+this.spritewidth)%this.image.width;
    }

    render(con){
    if(this.animate && this.tick%this.onTicks[this.onTicksCurrent] == 0){
        this.onTicksCurrent = (++this.onTicksCurrent)%this.onTicks.length;
        this.updateImageLeft();
    }
    this.tick++;
    var center = vec2.convertToPixels(this.position);
    var start = {x : center.x-this.width/2, y : center.y-this.height/2};
    con.drawImage(this.image,
                    this.posImg.x,this.posImg.y,
                    this.spritewidth,this.spriteheight,
                    start.x,start.y,
                    this.width,this.height);
    }

}