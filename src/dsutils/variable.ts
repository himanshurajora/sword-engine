import shapeutils from "../utils/shapeutils"
import utils from "../utils/utils"
import { Vector } from "../utils/vector"

export interface global {
    context : CanvasRenderingContext2D
}

export class Variable {
    public position
    public name 
    public type
    public value
    public isConst
    constructor(position : Vector, name : string, type : string, value : number, isConst : string) {
        this.position = position;
        this.name = name;
        this.type = type;
        this.value = value;
        this.isConst = isConst;
    }

    public draw() {
        shapeutils.setFillStyle(utils.getRandomLightColor());
        shapeutils.drawRectangle(this.position, shapeutils.measureText(this.name + " : " + this.value.toString()).width, 50);
        globalThis.context.font = "20px Arial";
        globalThis.context.fillStyle = utils.getRadomDarkColor();
        globalThis.context.fillText(this.value.toString(), 10, 20);
    }
}