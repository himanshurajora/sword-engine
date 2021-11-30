// function to calculate fps
declare const globalThis : {context : CanvasRenderingContext2D}

/**
 * 
 * @param {number} lasttime 
 * @param {number} currenttime 
 * @returns {number} the result of the calculation
 */
export function calculateFPS(lasttime: number, currenttime: number) {
    let fps = 1000 / (currenttime - lasttime)
    return fps
}



// function to show fps
/**
 * 
 * @param {number} fps 
 * @param {string} color
 * draws the fps on the screen 
 */
export function showFPS(fps: number, color: string = "black") {
    globalThis.context.fillStyle = color
    globalThis.context.font = "20px Arial"
    globalThis.context.fillText(`FPS: ${fps}`, 10, 20)
}

