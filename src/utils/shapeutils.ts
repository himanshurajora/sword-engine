// declare var window: Window & typeof globalThis & { context: CanvasRenderingContext2D }
// declare var globalThis : {context : CanvasRenderingContext2D}

declare global {
    var context : CanvasRenderingContext2D
}

import { Vector } from "./vector";
const shapeutils = {
    /**
     * @function setLineCap
     * @param  {CanvasLineCap} lineCap 
     * set the line cap
     * @memberof Shapes
     */
      setLineCap : (lineCap: CanvasLineCap) => {
        globalThis.context.lineCap = lineCap
      },

    /**
     * @function setStrokeStyle
     * @param {string} color 
     * @param {number} stroke
     * set the stroke color and width
     * @memberof Shapes 
     */
     setStrokeStyle : (color: string, stroke: number = 1) => {
        globalThis.context.strokeStyle = color
        globalThis.context.lineWidth = stroke
    },

    /**
     * @function setFillStyle
     * @param {string} color
     * set the stroke color for the context 
     * @memberof Shapes
     */
     setFillStyle : (color: string) => {
        globalThis.context.fillStyle = color
    },

    /**
     * @function setFont
     * @param {string} font
     * set the font for the context
     * @memberof Shapes 
     */
     setFont : (font: string) => {
        globalThis.context.font = font
    },

    /**
     * @function setColor
     * @param {string} color
     * set the fill color for the context 
     * @memberof Shapes
     */
     setColor: (color: string) => {
        globalThis.context.fillStyle = color
    },

    /**
     * @function drawImage
     * @param {HTMLImageElement} image 
     * @param {Vector} point 
     * @param {number} width 
     * @param  {number} height 
     * draw an image on the canvas
     * @memberof Shapes
     */
     drawImage: (image: HTMLImageElement, point: Vector, width: number, height: number) => {
        globalThis.context.drawImage(image, point.x, point.y, width, height)
    },

    /**
     * @function drawPoint
     * @param {Vector} point 
     * @param {number} width 
     * draw a point on the canvas
     * @memberof Shapes
     */
     drawPoint : (point: Vector, width: number) => {
        globalThis.context.beginPath();
        globalThis.context.arc(point.x, point.y, width, 0, Math.PI * 2);
        globalThis.context.fill();
    },

    /**
     * @function drawPolygon
     * @param {Vector} points array of points
     * draw a polygon on the canvas 
     * @memberof Shapes
     */
     drawPolygon : (points: Vector[]) => {
        globalThis.context.beginPath();

        globalThis.context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            globalThis.context.lineTo(points[i].x, points[i].y);
        }

        globalThis.context.closePath();
        globalThis.context.fill();
        globalThis.context.stroke();
    },


    /**
     * @function drawRectangle
     * @beta
     * @param {Vector} point 
     * @param {number} width 
     * @param {number} height 
     * draw a rectangle on the canvas
     * @memberof Shapes
     */
     drawRectangle : (point: Vector, width: number, height: number) => {
        globalThis.context.beginPath();
        globalThis.context.rect(point.x, point.y, width, height);
        globalThis.context.fill();
        globalThis.context.stroke();
    },

    /**
     * @function drawCircle
     * @param {Vector} point 
     * @param {number} radius 
     * draw a circle on the canvas
     * @memberof Shapes
     */
     drawCircle : (point: Vector, radius: number) => {
        globalThis.context.beginPath();
        globalThis.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        globalThis.context.fill();
        globalThis.context.stroke();
    },

    /**
     * @function drawEllipse
     * @param {Vector} point 
     * @param {number} width 
     * @param {number} height 
     * draw an ellipse on the canvas
     * @memberof Shapes
     */

     drawEllipse : (point: Vector, width: number, height: number ) => {
        globalThis.context.beginPath();
        globalThis.context.ellipse(point.x, point.y, width, height, 0, 0, 2 * Math.PI);
        globalThis.context.fill();
        globalThis.context.stroke();
    },

    /**
     * @function drawLine
     * @param {Vector} point1 
     * @param {Vector} point2 
     * draw a line between two points on the canvas
     * @memberof Shapes
     */
     drawLine : (point1: Vector, point2: Vector) => {
        globalThis.context.beginPath();
        globalThis.context.moveTo(point1.x, point1.y);
        globalThis.context.lineTo(point2.x, point2.y)
        globalThis.context.stroke();
    },

    /**
     * @function clear
     * clear the canvas
     * @memberof Shapes
     */
     clear : () => {
        globalThis.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },

    /**
     * @function drawText
     * @param {string} text  the input text
     * @param {Vector} point the position of the text
     * draw a text on the canvas
     * @memberof Shapes
     */
     drawText : (text: string, point: Vector) => {
        globalThis.context.fillText(text, point.x, point.y)
    },

    setTextAlign : (textAlign: CanvasTextAlign) => {
        globalThis.context.textAlign = textAlign
    },
    

    measureText : (text: string) => {
        return globalThis.context.measureText(text)
    }
}


export default shapeutils