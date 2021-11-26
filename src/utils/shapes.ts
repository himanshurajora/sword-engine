import { Vector } from "./vector";
// class for various shapes
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

export class Shapes {
    private context: CanvasRenderingContext2D
    
    constructor() {
        this.context = window.context
        this.context.fillStyle = "trasparent"
        this.context.strokeStyle = "black"
        this.context.lineWidth = 1
        this.context.lineCap = "round"
    }

    public setLineCap(lineCap: CanvasLineCap) {
        this.context.lineCap = lineCap
    }
    public setStrokeStyle(stroke: number, color: string) {
        this.context.strokeStyle = color
        this.context.lineWidth = stroke
    }

    public setFillStyle(color: string) {
        this.context.fillStyle = color
    }

    public setFont(font: string) {
        this.context.font = font
    }

    public setColor(color: string) {
        this.context.fillStyle = color
    }
    public drawImage(image: HTMLImageElement, point: Vector, width: number, height: number) {
        this.context.drawImage(image, point.x, point.y, width, height)
    }
    public drawPoint(point: Vector, width: number) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, width, 0, Math.PI * 2);
        this.context.fill();
    }

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


    public drawRectangle(point: Vector, width: number, height: number) {
        this.context.beginPath();
        this.context.rect(point.x, point.y, width, height);
        this.context.fill();
        this.context.stroke();
    }

    public drawCircle(point: Vector, radius: number) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        this.context.fill();
        this.context.stroke();
    }

    public drawEllipse(point: Vector, width: number, height: number ) {
        this.context.beginPath();
        this.context.ellipse(point.x, point.y, width, height, 0, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
    }

    public drawLine(point1: Vector, point2: Vector) {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineTo(point2.x, point2.y)
        this.context.stroke();
    }

    public clear() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    public drawText(text: string, point: Vector) {
        this.context.fillText(text, point.x, point.y)
    }
    
}