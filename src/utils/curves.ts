// three point bezier curve class

import { Shapes } from "./shapes";
import { Vector } from "./vector";

/**
 * @class BezierCurve
 * @description A three point bezier curve class
 * @param {Vector} p0 - first point
 * @param {Vector} p1 - second point
 * @param {Vector} p2 - third point
 */

export class BezierCurve {
    public p0: Vector
    public p1: Vector
    public p2: Vector

    constructor(p0: Vector, p1: Vector, p2: Vector) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
    }
    /**
     * @function getPoint
     * @param {number} t the time value between 0 and 1
     * @returns {Vector} the point at the time value
     * @memberof BezierCurve
     */
    public getPoint(t: number): Vector {
        const x = (1 - t) * (1 - t) * this.p0.x + 2 * t * (1 - t) * this.p1.x + t * t * this.p2.x;
        const y = (1 - t) * (1 - t) * this.p0.y + 2 * t * (1 - t) * this.p1.y + t * t * this.p2.y;
        return new Vector(x, y);
    }

    /**
     * @function draw
     * @description The function that draws the bezier curve on the canvas in every frame
     * @memberof BezierCurve
     */
    public draw() {
        var Shape = new Shapes();

        Shape.drawLine(this.p0, this.p1);
        Shape.drawLine(this.p1, this.p2);
        for (let t = 0; t <= 1; t += 0.001) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}


// Cubic Bezier Curve class
/**
 * @class CubicBezierCurve
 * @description A cubic bezier curve class
 * @param {Vector} p0 - first point
 * @param {Vector} p1 - second point
 * @param {Vector} p2 - third point
 * @param {Vector} p3 - fourth point
 * 
 */
export class CubicBezierCurve {
    public p0: Vector
    public p1: Vector
    public p2: Vector
    public p3: Vector

    constructor(p0: Vector, p1: Vector, p2: Vector, p3: Vector) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    /**
     * @function getPoint
     * @param {number} t the time value between 0 and 1
     * @returns {Vector} the point at the time value
     * @memberof CubicBezierCurve
     */
    public getPoint(t: number): Vector {
        const x = (1 - t) * (1 - t) * (1 - t) * this.p0.x + 3 * t * (1 - t) * (1 - t) * this.p1.x + 3 * t * t * (1 - t) * this.p2.x + t * t * t * this.p3.x;
        const y = (1 - t) * (1 - t) * (1 - t) * this.p0.y + 3 * t * (1 - t) * (1 - t) * this.p1.y + 3 * t * t * (1 - t) * this.p2.y + t * t * t * this.p3.y;
        return new Vector(x, y);
    }

    /**
     * @function draw
     * The function that draws the bezier curve on the canvas in every frame
     * @memberof CubicBezierCurve
     */
    public draw() {
        var Shape = new Shapes();

        Shape.drawLine(this.p0, this.p1);
        Shape.drawLine(this.p1, this.p2);
        Shape.drawLine(this.p2, this.p3);


        for (let t = 0; t <= 1; t += 0.001) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}

// beziere curve for any number of points
/**
 * @deprecated
 * @class BezierCurveForPoints
 * @description A bezier curve class
 * @param {Vector[]} points - an array of points
 * 
 */
export class BezierCurveForPoints {
    public points: Vector[]
    constructor(points: Vector[]) {
        this.points = points;
    }
    /**
     * @function getPoint
     * @param {number} t the time value between 0 and 1
     * @returns {Vector}
     * @memberof BezierCurveForPoints
     */
    public getPoint(t: number): Vector {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.points.length; i++) {
            x += this.points[i].x * Math.pow((1 - t), this.points.length - 1 - i) * Math.pow(t, i);
            y += this.points[i].y * Math.pow((1 - t), this.points.length - 1 - i) * Math.pow(t, i);
        }
        return new Vector(x, y);
    }

    /**
     * @function draw
     * The function that draws the bezier curve on the canvas in every frame
     * @memberof BezierCurveForPoints
     */
    public draw() {
        var Shape = new Shapes();
        var increament = this.points[0].distanceTo(this.points[this.points.length - 1]) / 40000;
        for (let t = 0; t <= 1; t += increament) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}