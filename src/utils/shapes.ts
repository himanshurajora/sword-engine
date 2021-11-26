import { Vector } from "./vector";

export function drawPoint(ctx : CanvasRenderingContext2D, point : Vector, width: number, color: string = "black") {
    ctx.beginPath();
    ctx.arc(point.x, point.y, width, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawPolygon(ctx: CanvasRenderingContext2D, points: Vector[], color: string, strokeWidth: number, fill: boolean, fillColor : string | CanvasGradient | CanvasPattern = "black") {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
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
    ctx.rect(point.x, point.y, width, height);
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
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
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
    ctx.ellipse(point.x, point.y, width, height, 0, 0, 2 * Math.PI);
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
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.stroke();
}



