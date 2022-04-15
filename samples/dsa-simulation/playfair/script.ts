// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Rectangle, Shapes } from "../../../src/utils/shapes"
import { calculateFPS, showFPS } from "../../../src/utils/devdata"
import { Vector } from "../../../src/utils/vector"
import { Particle } from "../../../src/utils/gameobject"
import utils from "../../../src/utils/utils"
import { Grid } from '../../../src/utils/grid'
var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = globalThis.context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D
import shapeutils from "../../../src/utils/shapeutils"
import { Array1D, Array2D } from '../../../src/dsutils/array'
import * as esprima from 'esprima'
import { Variable } from '../../../src/dsutils/variable'
import { makePlayfairMatrix, cipher } from './playfair'
canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "white"
canvas.style.cursor = "point"
canvas.style.display = "block"
document.body.style.scrollBehavior = "none"
// mouse events and states
var mousex = 0, mousey = 0

var mouseMove = false
var mouseStopTimer = setTimeout(() => { mouseMove = false }, 20)
canvas.addEventListener("mousemove", function (e) {
  var cRect = canvas.getBoundingClientRect()
  mousex = Math.round(e.clientX - cRect.left)
  mousey = Math.round(e.clientY - cRect.top)
  mouseMove = true
  clearTimeout(mouseStopTimer)
  mouseStopTimer = setTimeout(() => { mouseMove = false }, 20)

})



var Shape = new Shapes()



var text = (document.getElementById("text") as HTMLInputElement)
var key = (document.getElementById("key") as HTMLInputElement)
var output = document.getElementById("output") as HTMLHeadingElement
text.onkeyup = (e: KeyboardEvent) => {
  var textData = (e.target as HTMLInputElement).value
  matrix = makePlayfairMatrix(key.value || "himanshu", textData || "some data")
  output.textContent = cipher(matrix, textData)
}

key.onkeyup = (e: KeyboardEvent) => {
  var keyData = (e.target as HTMLInputElement).value
  matrix = makePlayfairMatrix(keyData || "himanshu", text.value || "some data")
  output.textContent = cipher(matrix, text.value)
}

var times = 0
var temp = new Variable(Vector.createInstance(width / 2 - 50, height / 2 - 100), "temp", 0)
var matrix = makePlayfairMatrix(key.value || "himanshu", text.value || "some data")
output.textContent = cipher(matrix, text.value)
var iw = 100
var jw= 100
var prev=performance.now(), now
function render() {
  Shape.clear()
  
  shapeutils.drawPoint(new Vector(mousex, mousey), 3)
  shapeutils.setFont("30px Arial")
  for(var i = 0; i < matrix.length; i++){
    for(var j = 0; j < matrix[0].length; j++){
      shapeutils.drawText(matrix[j][i], new Vector(i * iw + 100, j * jw + 100))
    }
  }


  requestAnimationFrame(render)
}

render()


