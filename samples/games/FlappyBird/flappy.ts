import { Rectangle } from "../../../src/utils/shapes"
import { Vector } from "../../../src/utils/vector"

export class Pipe extends Rectangle{
    public gap: number
    constructor(position: Vector, width: number, height: number, gap: number, velocity: Vector = new Vector(0, 0), name: string = "Pipe") {
        // if(position.y > globalThis.context.canvas.height){
        //     position.y = position.y + globalThis.context.canvas.height/4
        // }

        super(position, width, height, "black", velocity, name)
        this.gap = gap
    }

    public update(){
        this.position.x -= this.velocity.x
        if(this.position.x < -this.width){
            this.color = "green"
            if(Math.max(this.position.y, this.height) - Math.min(this.position.y, this.height) > globalThis.context.canvas.height){
                this.position.y = Math.random() * globalThis.context.canvas.height/2 + globalThis.context.canvas.height/2
            }else{
                this.position.y = Math.random() * globalThis.context.canvas.height/2 + globalThis.context.canvas.height/2
            }
            this.position.x = globalThis.context.canvas.width
        }
        // this.color = "green"
        globalThis.context.fillStyle = this.color
        globalThis.context.fillRect(this.position.x, this.position.y, this.width, this.height)
        globalThis.context.fillRect(this.position.x, this.position.y - this.height - this.gap, this.width, this.height)
    }
}