// draw a point at the given coordinates
export function point(context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string | CanvasGradient | CanvasPattern = "black") {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
}

// draw a line from (x1, y1) to (x2, y2)
export function line(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string | CanvasGradient | CanvasPattern = "black", width: number = 2, dashed: boolean = false, dashLength: number = 5, dashGap: number = 5) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    if (dashed) {
        context.setLineDash([dashLength, dashGap]);
    }
}

// draw a rectangle with top-left corner at (x, y)
export function rect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, stroke: string = "black", strokeWidth: number = 2, fill: boolean = false, color: string | CanvasGradient | CanvasPattern = "black") {
    context.strokeStyle = stroke;
    context.fillStyle = color;
    context.lineWidth = strokeWidth;
    context.beginPath();
    context.rect(x, y, width, height);
    if (fill) {
        context.fill();
    }
    context.stroke();
}

// draw a circle with center at (x, y) and given radius
export function drawCircle(context: CanvasRenderingContext2D, point: Vector, radius: number, stroke: string = "black", strokeWidth: number = 2, fill: boolean = false, color: string | CanvasGradient | CanvasPattern = "black") {
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    if (fill) {
        context.fillStyle = color;
        context.fill();
    }
    context.lineWidth = strokeWidth;
    context.strokeStyle = stroke;
    context.stroke();
}


// draw an ellipse with center at (x, y) and given radius
export function ellipse(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, stroke: string = "black", strokeWidth: number = 2, fill: boolean = false, color: string | CanvasGradient | CanvasPattern = "black") {
    context.beginPath();
    context.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
    if (fill) {
        context.fillStyle = color;
        context.fill();
    }
    context.lineWidth = strokeWidth;
    context.strokeStyle = stroke;
    context.stroke();
}

// draw a polygon with given points
export function polygon(context: CanvasRenderingContext2D, points: Vector[], stroke: string = "black", strokeWidth: number = 2, fill: boolean = false, color: string | CanvasGradient | CanvasPattern = "black") {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    if (fill) {
        context.fillStyle = color;
        context.fill();
    }
    context.lineWidth = strokeWidth;
    context.strokeStyle = stroke;
    context.stroke();
}




