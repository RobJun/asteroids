class mat4x4{
    constructor(type){
        this.matricies = new Float32Array(16);
        this.matricies.fill(0,0,15);
        if(type === undefined || type === "Identity" || type === "I"){
            this.matricies[0]= this.matricies[5] = this.matricies[10] = this.matricies[15] = 1.0;
        }
    }

    multiply(mat4){
        /*
            0 1 2 3       0 1 2 3
            4 5 6 7    `  4 5 6 7    
            8 9 1011      8 9 1011
            12131415      12131415        */
            var data= new Float32Array(16);
            for (var row = 0; row < 4; row++)
            {
                for (var col = 0; col < 4; col++)
                {
                    var sum = 0.0;
                    for (var e = 0; e < 4; e++)
                    {
                        sum += this.matricies[e + row * 4] * mat4.matricies[col + e * 4];
                    }
                    data[col + row * 4] = sum;
                }
            }
            this.matricies = data;
            return this;
    }
}

function calculateVector(vector, mat4){
        var NewV= new vec2;
        NewV.x = mat4.matricies[0]*vector.x+ mat4.matricies[1]*vector.y+mat4.matricies[2]+ mat4.matricies[3];
        NewV.y = mat4.matricies[4]*vector.x+ mat4.matricies[5]*vector.y+mat4.matricies[6]+mat4.matricies[7];
        return NewV;
}

function calculateRotationMat(radians){
    var rotate = new mat4x4();
    rotate.matricies[0] = rotate.matricies[5] = Math.cos(radians);
    rotate.matricies[4] = -(rotate.matricies[1] = Math.sin(radians));
   return rotate;
}

function calculateTranslate(trans = {x,y}){
    var mat = new mat4x4();
    mat.matricies[2]= trans.x;
    mat.matricies[6] = trans.y;
    return mat;
}