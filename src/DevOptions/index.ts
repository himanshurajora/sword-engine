// function to calculate fps
export function calculateFPS(lasttime: number, currenttime: number) {
    let fps = 1000 / (currenttime - lasttime)
    return fps
}



// function to show fps
export function showFPS(context: CanvasRenderingContext2D, fps: number, color: string = "black") {
    context.fillStyle = color
    context.font = "20px Arial"
    context.fillText(`FPS: ${fps}`, 10, 20)
}

