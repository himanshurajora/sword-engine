// grid class 

import { Shapes } from "./shapes";
import { Vector } from "./vector";

/**
 * Grid class
 * @class Grid
 * @classdesc Grid class
 * @param {number} width - width of the grid
 * @param {number} height - height of the grid
 * the class to create a virtual grid on the canvas with the given width and height for each cell
 */
export class Grid {
    public width: number
    public height: number
    public Shape : Shapes
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.Shape = new Shapes()
    }

    /**
     * @function draw
     * draw the grid on the canvas on the canvas in every frame
     * @memberof Grid
     */
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
   /**
    * @function drawPoint
    * @param {Vector} point
    * draw a point on the grid according to the grid's cordinates not the canvas cordinates 
    * @memberof Grid
    */
    public drawPoint(point: Vector) {
        this.Shape.drawRectangle(new Vector(point.x * this.width, point.y * this.height), this.width, this.height)
    }

    /**
     * @function drawPoints
     * @param {Vector[]} points 
     * draw a list of points on the grid according to the grid's cordinates not the canvas cordinates
     * @memberof Grid
     */
    public drawPoints(points: Vector[]) {
        points.forEach(point => {
            this.Shape.drawRectangle(new Vector(point.x * this.width, point.y * this.height), this.width, this.height)
        })
    }

}