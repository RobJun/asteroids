class PauseCon extends _SUPER_OBJECT{
    constructor(parent,type){
        super(parent);
        this.type=type;

    }

    checkKey(controller){
        if(this.type == 0 && !controller.out){
            this.notify("pause=off",this)
            
        }else if(this.type == 1 && controller.out){
            this.notify("pause=on",this)
        }
    }
}