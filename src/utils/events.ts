// This is the file for global envents
import { Vector } from "./vector";


/**
 * @deprecated
 * @class MouseEvents
 */
export class MouseEvents {
    canvas: HTMLCanvasElement
    mousePosition(e: MouseEvent): Vector {
        let cRect = this.canvas.getBoundingClientRect()
        return new Vector(e.clientX - cRect.left, e.clientY - cRect.top)
    }
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    onMouseMove(callback: (e: MouseEvent) => void) {
        this.canvas.addEventListener("mousemove", callback)
    }

    onMouseDown(callback: (e: MouseEvent) => void) {
        this.canvas.addEventListener("mousedown", callback)
    }
}






