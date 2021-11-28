// three point bezier curve class

import { Shapes } from "./shapes";
import { Vector } from "./vector";

export class BezierCurve {
    public p0: Vector
    public p1: Vector
    public p2: Vector
    constructor(p0: Vector, p1: Vector, p2: Vector) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
    }
    public getPoint(t: number): Vector {
        const x = (1 - t) * (1 - t) * this.p0.x + 2 * t * (1 - t) * this.p1.x + t * t * this.p2.x;
        const y = (1 - t) * (1 - t) * this.p0.y + 2 * t * (1 - t) * this.p1.y + t * t * this.p2.y;
        return new Vector(x, y);
    }
    public draw() {
        var Shape = new Shapes();
        
        Shape.drawLine(this.p0, this.p1);
        Shape.drawLine(this.p1, this.p2);
        
        var increament = this.p0.distanceTo(this.p2)/40000;

        for(let t = 0; t <= 1; t += increament) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}

// Cubic Bezier Curve class
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
    public getPoint(t: number): Vector {
        const x = (1 - t) * (1 - t) * (1 - t) * this.p0.x + 3 * t * (1 - t) * (1 - t) * this.p1.x + 3 * t * t * (1 - t) * this.p2.x + t * t * t * this.p3.x;
        const y = (1 - t) * (1 - t) * (1 - t) * this.p0.y + 3 * t * (1 - t) * (1 - t) * this.p1.y + 3 * t * t * (1 - t) * this.p2.y + t * t * t * this.p3.y;
        return new Vector(x, y);
    }
    public draw() {
        var Shape = new Shapes();
        
        Shape.drawLine(this.p0, this.p1);
        Shape.drawLine(this.p1, this.p2);
        Shape.drawLine(this.p2, this.p3);
        
        var increament = this.p0.distanceTo(this.p3)/40000;

        for(let t = 0; t <= 1; t += increament) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}

// beziere curve for any number of points
export class BezierCurveForPoints {
    public points: Vector[]
    constructor(points: Vector[]) {
        this.points = points;
    }
    public getPoint(t: number): Vector {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.points.length; i++) {
            x += this.points[i].x * Math.pow((1 - t), this.points.length - 1 - i) * Math.pow(t, i);
            y += this.points[i].y * Math.pow((1 - t), this.points.length - 1 - i) * Math.pow(t, i);
        }
        return new Vector(x, y);
    }
    public draw() {
        var Shape = new Shapes();
        var increament = this.points[0].distanceTo(this.points[this.points.length - 1]) / 40000;
        for (let t = 0; t <= 1; t += increament) {
            Shape.drawPoint(this.getPoint(t), 1);
        }
    }
}