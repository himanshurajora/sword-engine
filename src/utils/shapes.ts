import { Vector } from "../GraphicsEngine/index";

export function drawPoint(ctx : CanvasRenderingContext2D, point : Vector, width: number, color: string = "black") {
    ctx.beginPath();
    ctx.arc(point.getX(), point.getY(), width, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawPolygon(ctx: CanvasRenderingContext2D, points: Vector[], color: string, strokeWidth: number, fill: boolean, fillColor : string | CanvasGradient | CanvasPattern = "black") {
    ctx.beginPath();
    ctx.moveTo(points[0].getX(), points[0].getY());
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].getX(), points[i].getY());
    }
    ctx.closePath();
    if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}


export function drawRectangle(ctx: CanvasRenderingContext2D, point: Vector, width: number, height: number, color: string, stroke: number = 1, fill: boolean = false, fillColor: string | CanvasGradient | CanvasPattern = "black") {
    ctx.beginPath();
    ctx.rect(point.getX(), point.getY(), width, height);
    if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function drawCircle(ctx: CanvasRenderingContext2D, point: Vector, radius: number, color: string, stroke: number = 1, fill: boolean = false, fillColor: string | CanvasGradient | CanvasPattern = "black") {
    ctx.beginPath();
    ctx.arc(point.getX(), point.getY(), radius, 0, Math.PI * 2);
    if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function drawEllipse(ctx: CanvasRenderingContext2D, point: Vector, width: number, height: number, color: string, stroke: number = 1, fill: boolean = false, fillColor: string | CanvasGradient | CanvasPattern = "black") {
    ctx.beginPath();
    ctx.ellipse(point.getX(), point.getY(), width, height, 0, 0, 2 * Math.PI);
    if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function drawLine(ctx: CanvasRenderingContext2D, point1: Vector, point2: Vector, color: string, stroke: number = 1) {
    ctx.beginPath();
    ctx.moveTo(point1.getX(), point1.getY());
    ctx.lineTo(point2.getX(), point2.getY());
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
}



