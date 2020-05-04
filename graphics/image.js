class GameImage extends _SUPER_OBJECT{
    constructor(parent,key,posSprite,posCenter, proportions,sprite,animate,onTicks,offset){
        super(parent);
        this.time =0;
        this.offset = offset || 0;
        this.onTicks = onTicks || [1];
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


        var radius = this.width / (AREA.width*2);
        this.actualPosition = [
            posCenter.x+radius, posCenter.y+radius,
            posCenter.x+radius, posCenter.y-radius,
            posCenter.x-radius, posCenter.y-radius,
            posCenter.x-radius, posCenter.y+radius
        ]
        this.collisionMap  = this.actualPosition;
    }

    onCollision(object){};

    setCollision(sat){
        sat.addSprite(this);
    }

    updateImageLeft(){
        this.posImg.x = (this.posImg.x+this.spritewidth)%this.image.width;
    }
    move(delta){
        if(this.animate){
        if(this.time >= this.onTicks[this.onTicksCurrent]+this.offset){
            this.onTicksCurrent = (++this.onTicksCurrent)%this.onTicks.length;
            this.updateImageLeft();
            this.time=0;
            this.offset=0;
        }
        this.time+=delta;
        }
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