
export class Cube{

    public x : number
    public y : number
    public z : number
    public width : number
    public height : number
    public depth : number

    constructor(x : number, y : number, z : number, width : number, height : number, depth : number){
        this.x = x
        this.y = y
        this.z = z
        this.width = width
        this.height = height
        this.depth = depth
    }

    public toString(){
        return "x: " + this.x + " y: " + this.y + " z: " + this.z + " width: " + this.width + " height: " + this.height + " depth: " + this.depth
    }

}