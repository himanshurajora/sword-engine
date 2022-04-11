import shapeutils from "../utils/shapeutils"
import utils from "../utils/utils"
import { Vector } from "../utils/vector"

export interface global {
    context : CanvasRenderingContext2D
}

export class Variable {
    public position
    public name 
    public value
    public color
    constructor(position : Vector, name : string, value : number) {
        this.position = position;
        this.name = name;
        this.value = value;
        this.color = utils.getRandomLightColor();
        console.log(this)
    
    }

    public draw() {
        shapeutils.setFillStyle(this.color)
        globalThis.context.font = "20px Arial";
        shapeutils.drawRectangle(this.position, shapeutils.measureText("     " + this.value.toString()).width, 50);
        globalThis.context.fillStyle = "red"
        globalThis.context.fillText(this.value.toString(), this.position.x + shapeutils.measureText("  ").width, this.position.y + 30 );
    }
}