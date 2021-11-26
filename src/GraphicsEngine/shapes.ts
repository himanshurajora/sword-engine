import { Vector } from "PhysicsEngine/vector"

export function setLineCap(lineCap: CanvasLineCap) {
    globalThis.context.lineCap = lineCap
}
export function setStrokeStyle(stroke: number, color: string) {
    globalThis.context.strokeStyle = color
    globalThis.context.lineWidth = stroke
}

export function setFillStyle(color: string) {
    globalThis.context.fillStyle = color
}

export function setFont(font: string) {
    globalThis.context.font = font
}

export function setColor(color: string) {
    globalThis.context.fillStyle = color
}
export function drawImage(image: HTMLImageElement, point: Vector, width: number, height: number) {
    globalThis.context.drawImage(image, point.getX(), point.getY(), width, height)
}
export function drawPoint(point: Vector, width: number) {
    globalThis.context.beginPath();
    globalThis.context.arc(point.getX(), point.getY(), width, 0, Math.PI * 2);
    globalThis.context.fill();
}

export function drawPolygon(points: Vector[]) {
    globalThis.context.beginPath();

    globalThis.context.moveTo(points[0].getX(), points[0].getY());
    for (let i = 1; i < points.length; i++) {
        globalThis.context.lineTo(points[i].getX(), points[i].getY());
    }

    globalThis.context.closePath();
    globalThis.context.fill();
    globalThis.context.stroke();
}


export function drawRectangle(point: Vector, width: number, height: number) {
    globalThis.context.beginPath();
    globalThis.context.rect(point.getX(), point.getY(), width, height);
    globalThis.context.fill();
    globalThis.context.stroke();
}

export function drawCircle(point: Vector, radius: number) {
    globalThis.context.beginPath();
    globalThis.context.arc(point.getX(), point.getY(), radius, 0, Math.PI * 2);
    globalThis.context.fill();
    globalThis.context.stroke();
}

export function drawEllipse(point: Vector, width: number, height: number) {
    globalThis.context.beginPath();
    globalThis.context.ellipse(point.getX(), point.getY(), width, height, 0, 0, 2 * Math.PI);
    globalThis.context.fill();
    globalThis.context.stroke();
}

export function drawLine(point1: Vector, point2: Vector) {
    globalThis.context.beginPath();
    globalThis.context.moveTo(point1.getX(), point1.getY());
    globalThis.context.lineTo(point2.getX(), point2.getY())
    globalThis.context.stroke();
}

export function clear() {
    globalThis.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

export function drawText(text: string, point: Vector) {
    globalThis.context.fillText(text, point.getX(), point.getY())
}
