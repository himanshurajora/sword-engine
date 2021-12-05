import utils from "../utils/utils";

declare const globalThis: { context: CanvasRenderingContext2D }
import shapeutils from "../utils/shapeutils";
import { Vector } from "../utils/vector";
// import { Shapes } from "../utils/shapes";
// array cell class

/**
 * @class ArrayCell
 * @discription an class for representing each cell in the array
 * it contains the code to draw and chenge the cell's state
 * @param {number} x - the x coordinate of the cell
 * @param {number} y - the y coordinate of the cell
 * @param {number} width - the width of the cell
 * @param {number} height - the height of the cell
 * @param {number} value - the value of the cell
 * @param {number} padding - the padding of the cell
 * 
 * @author Himanshu Jangid
 * 
 * 
 */
class ArrayCell {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public value: number;
    public padding: number
    public color: string
    public textColor: string
    public textWidth: number
    constructor(x: number, y: number, width: number, height: number, value: number, padding: number, color: string, textColor: string) {
        this.x = x
        this.y = y
        this.height = height
        this.value = value
        this.padding = padding
        this.color = color
        this.textWidth = shapeutils.measureText(value.toString()).width
        this.width = width + this.textWidth + this.padding
        this.textColor = textColor
    }

    public draw() {
        shapeutils.setFillStyle(this.color)
        // shapeutils.setFont(this.textColor)
        shapeutils.drawRectangle(new Vector(this.x, this.y), this.width, this.height)
        shapeutils.setFillStyle(this.textColor)
        shapeutils.setFont("20px Arial")
        shapeutils.drawText(this.value.toString(), new Vector(this.x + (this.width - this.textWidth - this.padding * 6), this.y + this.height / 2 + this.padding))
        // console.log("length is  " , this.value.toString().length)
        // globalThis.context.fillRect(this.x, this.y,  this.width, this.height)
        // globalThis.context.fillStyle = this.textColor
        // globalThis.context.font = "20px Arial"
        // globalThis.context.fillText(this.value.toString(), this.x  + this.padding, this.y + this.height/2 + this.padding)
    }

    public changeValue(value: number) {
        shapeutils.setFillStyle("red")
        shapeutils.setFont("22px Arial")
        shapeutils.drawText(value.toString(), new Vector(this.x + (this.width - this.textWidth - this.padding * 6), this.y + this.height / 2 + this.padding))
    }

    public getValue(): number {
        return this.value
    }

}


// 1d array visulaization class
/**
 * @class Array1D
 * @discripition this is an array visualization class for 1d array
 * it can be used to visualize the array in a canvas
 * @param {number[]} array - the array to be visualized
 * @param {number} x - x coordinate position of the array
 * @param {number} y - y coordinate position of the array
 * @param {number} width - width of each cell
 * @param {number} height - height of each cell
 * @param {number} padding - padding of the cell
 * 
 * @example
 * let array = [1,2,3,4,5,6,7,8,9,10]
 * let array1d = new Array1D(array,10,10,10,10,10)
 * 
 * 
 * 
 * @author Himanshu Jangid
 * 
 */
export class Array1D {
    public array: number[]
    public width: number
    public height: number
    public x: number
    public y: number
    public padding: number
    public fillColor: string = utils.getRadomDarkColor()
    public fontColor: string = utils.getRandomLightColor()

    constructor(array: number[], x: number, y: number, width: number, height: number, padding: number = 4) {
        this.array = array
        this.width = width
        this.height = height
        this.x = x
        this.y = y

        console.log(this.fillColor, this.fontColor)

        this.padding = padding
    }

    public draw() {
        var cells: ArrayCell[] = []
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i - 1]) {
                var cell = new ArrayCell(cells[i - 1].x + cells[i - 1].width + this.padding, this.y, this.width, this.height, this.array[i], this.padding, this.fillColor, this.fontColor)
                cell.draw()
                cells.push(cell)
            } else {
                var cell = new ArrayCell(this.x, this.y, this.width, this.height, this.array[i], this.padding, this.fillColor, this.fontColor)
                cell.draw()
                cells.push(cell)
            }
        }
    }

    public changeValue(index: number, value: number) {
        this.array[index] = value
    }
}


// 2d array visualization class
/**
 * @class Array2D
 * @discription this is an array visualization class for 2d array
 * it can be used to visualize the array in a canvas
 * @param {number[][]} array - the array to be visualized
 * @param {number} x - x coordinate position of the array
 * @param {number} y - y coordinate position of the array
 * @param {number} width - width of each cell
 * @param {number} height - height of each cell
 * @param {number} padding - padding of the cell
 * 
 * @example
 * let array = [
 * [1,2,3,4],
 * [5,6,7,8],
 * [9,10,11,12]
 * ]
 * let array2d = new Array2D(array,10,10,10,10,10)
 * 
 * @author Himanshu Jangid
 *
 *  
 */

export class Array2D {
    public array: number[][]
    public width: number
    public height: number
    public x: number
    public y: number
    public padding: number
    public fillColor: string = utils.getRadomDarkColor()
    public fontColor: string = utils.getRandomLightColor()

    constructor(array: number[][], x: number, y: number, width: number, height: number, padding: number = 4) {
        this.array = array
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.padding = padding
    }

    public draw() {
        this.array.forEach((row, i) => {
            this.drawRow(row, i)
        })
    }

    public drawRow(row: number[], index : number) {
        var cells: ArrayCell[] = []
        for (var i = 0; i < row.length; i++) {
            if (row[i - 1]) {
                var cell = new ArrayCell(cells[i - 1].x + cells[i - 1].width + this.padding, this.y  * (index+1) , this.width, this.height, row[i], this.padding, this.fillColor, this.fontColor)
                cell.draw()
                cells.push(cell)
            } else {
                var cell = new ArrayCell(this.x, this.y * (index + 1), this.width, this.height, row[i], this.padding, this.fillColor, this.fontColor)
                cell.draw()
                cells.push(cell)
            }
        }
    }


    public changeValue(row: number, col: number, value: number) {
        this.array[row][col] = value
    }
}
