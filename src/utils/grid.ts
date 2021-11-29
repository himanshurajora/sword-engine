// grid class 

import { Shapes } from "./shapes";
import { Vector } from "./vector";

export class Grid {
    public width: number
    public height: number
    public Shape : Shapes
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.Shape = new Shapes()
    }

    public draw() {
        var x, y;

        for (x = 0; x < window.innerWidth; x += this.width) {
            for (y = 0; y < window.innerHeight; y += this.height) {
                this.Shape.setStrokeStyle("#000000")
                this.Shape.setColor("#00000011")
                this.Shape.drawRectangle(new Vector(x, y), this.width, this.height)
            }
        }
    }

   // draw point on grid using it width and height
    public drawPoint(point: Vector) {
        this.Shape.drawRectangle(new Vector(point.x * this.width, point.y * this.height), this.width, this.height)
    }

    public drawPoints(points: Vector[]) {
        points.forEach(point => {
            this.Shape.drawRectangle(new Vector(point.x * this.width, point.y * this.height), this.width, this.height)
        })
    }

}