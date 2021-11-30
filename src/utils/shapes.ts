import { Vector } from "./vector";
// class for various shapes
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }
declare var globalThis : {context : CanvasRenderingContext2D}

/**
 * @class Shape
 */
export class Shapes {
    private context: CanvasRenderingContext2D
    
    constructor() {
        this.context = window.context
        this.context.fillStyle = "trasparent"
        this.context.strokeStyle = "black"
        this.context.lineWidth = 1
        this.context.lineCap = "round"
    }

    /**
     * 
     * @param  {CanvasLineCap} lineCap 
     * set the line cap
     */
    public setLineCap(lineCap: CanvasLineCap) {
        this.context.lineCap = lineCap
    }

    /**
     * 
     * @param {string} color 
     * @param {number} stroke
     * set the stroke color and width 
     */
    public setStrokeStyle(color: string, stroke: number = 1) {
        this.context.strokeStyle = color
        this.context.lineWidth = stroke
    }

    /**
     * 
     * @param {string} color
     * set the stroke color for the context 
     */
    public setFillStyle(color: string) {
        this.context.fillStyle = color
    }

    /**
     * 
     * @param {string} font
     * set the font for the context 
     */
    public setFont(font: string) {
        this.context.font = font
    }

    /**
     * 
     * @param {string} color
     * set the fill color for the context 
     */
    public setColor(color: string) {
        this.context.fillStyle = color
    }

    /**
     * 
     * @param {HTMLImageElement} image 
     * @param {Vector} point 
     * @param {number} width 
     * @param  {number} height 
     * draw an image on the canvas
     */
    public drawImage(image: HTMLImageElement, point: Vector, width: number, height: number) {
        this.context.drawImage(image, point.x, point.y, width, height)
    }

    /**
     * 
     * @param {Vector} point 
     * @param {number} width 
     * draw a point on the canvas
     */
    public drawPoint(point: Vector, width: number) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, width, 0, Math.PI * 2);
        this.context.fill();
    }

    /**
     * 
     * @param {Vector} points array of points
     * draw a polygon on the canvas 
     */
    public drawPolygon(points: Vector[]) {
        this.context.beginPath();

        this.context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(points[i].x, points[i].y);
        }

        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }


    /**
     * @beta
     * @param {Vector} point 
     * @param {number} width 
     * @param {number} height 
     * draw a rectangle on the canvas
     */
    public drawRectangle(point: Vector, width: number, height: number) {
        this.context.beginPath();
        this.context.rect(point.x, point.y, width, height);
        this.context.fill();
        this.context.stroke();
    }

    /**
     * 
     * @param {Vector} point 
     * @param {number} radius 
     * draw a circle on the canvas
     */
    public drawCircle(point: Vector, radius: number) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        this.context.fill();
        this.context.stroke();
    }

    /**
     * 
     * @param {Vector} point 
     * @param {number} width 
     * @param {number} height 
     * draw an ellipse on the canvas
     */

    public drawEllipse(point: Vector, width: number, height: number ) {
        this.context.beginPath();
        this.context.ellipse(point.x, point.y, width, height, 0, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
    }

    /**
     * 
     * @param {Vector} point1 
     * @param {Vector} point2 
     * draw a line between two points on the canvas
     */
    public drawLine(point1: Vector, point2: Vector) {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineTo(point2.x, point2.y)
        this.context.stroke();
    }

    /**
     * clear the canvas
     */
    public clear() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    /**
     * 
     * @param {string} text  the input text
     * @param {Vector} point the position of the text
     */
    public drawText(text: string, point: Vector) {
        this.context.fillText(text, point.x, point.y)
    }
    
}


export class Rectangle{
    public position: Vector
    public width: number
    public height: number
    public color: string
    public velocity: Vector
    public name: string
    public center : Vector
    constructor(position: Vector, width: number, height: number, color: string = "black", velocity: Vector = new Vector(0, 0), name: string = "Rectangle") {
        this.position = position
        this.width = width
        this.height = height
        this.color = color
        this.velocity = velocity
        this.name = name
        this.center = this.getCenter()
    }

    public rotate(angle: number) {
        this.position.rotate(angle)
    }
    
    public rotateAroundPoint(angle: number, point: Vector) {
        this.position.rotateAround(angle, point)
    }

    public rotateAroundItsCenter(angle: number) {
        var shape = new Shapes()
        shape.setColor("red")
        shape.drawPoint(this.center, 5)
        shape.drawPoint(this.position, 5)
        this.position.rotateAround(angle, this.center)
    }

    public getCenter(): Vector {
        return new Vector(this.position.x + this.width/ 2, this.position.y + this.height/ 2)
    }

    public draw(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        globalThis.context.fillStyle = this.color
        globalThis.context.beginPath()
        globalThis.context.rect(this.position.x, this.position.y, this.width, this.height)
        globalThis.context.fill()
        globalThis.context.stroke()
    }
}