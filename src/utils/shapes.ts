export function drawFilledPolygon(ctx: CanvasRenderingContext2D, points: Vector[], color: string) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.closePath()
    // ctx.fill()
    ctx.stroke()
}
