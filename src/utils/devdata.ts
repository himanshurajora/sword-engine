// function to calculate fps
declare const globalThis : {context : CanvasRenderingContext2D}
export function calculateFPS(lasttime: number, currenttime: number) {
    let fps = 1000 / (currenttime - lasttime)
    return fps
}



// function to show fps
export function showFPS(fps: number, color: string = "black") {
    globalThis.context.fillStyle = color
    globalThis.context.font = "20px Arial"
    globalThis.context.fillText(`FPS: ${fps}`, 10, 20)
}

