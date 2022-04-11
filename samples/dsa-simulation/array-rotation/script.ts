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
import {Variable} from '../../../src/dsutils/variable'

canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "white"
canvas.style.cursor = "point"
canvas.style.display = "block"
document.body.style.scrollBehavior = "none"
// mouse events and states
var mousex = 0, mousey = 0
var mouseDblClick = false
var mouseScroll = 0
var mouseDown = false
var mouseUp = false
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

document.body.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      leftRotate(arraySim.array, times--)
      break
    case "ArrowRight":
      leftRotate(arraySim.array, times++)
  }

})

var Shape = new Shapes()


var times = 0
var temp = new Variable(Vector.createInstance(width/2 - 50, height/2 - 100), "temp", 0)
var array = [1, 2, 3, 4, 5]
var arraySim = new Array1D(array, width/2 - 40 * array.length, height/2 - 200, undefined, undefined, "Horizontal", "Input Array")
function render() {
  Shape.clear()


  temp.draw()
  arraySim.draw()
  // var currenttime = performance.now()
  // var fps = calculateFPS(lasttime, currenttime)
  // showFPS(parseInt(fps.toString()), "red")
  // lasttime = currenttime

  // Instructions 
  shapeutils.setFillStyle("green")
  shapeutils.drawText("Left Arrow ⬅️ to increase the times of rotation", Vector.createInstance(width / 2 - 200, height/2 + 50))
  shapeutils.drawText("Right Arrow ➡️ to decrease the times of rotation", Vector.createInstance(width / 2 - 200, height/2 + 80))
  shapeutils.drawPoint(new Vector(mousex, mousey), 3)
  requestAnimationFrame(render)
}

render()


function leftRotate(array: number[], times: number) {
  var t = array.pop()
  temp.value = times
  array.unshift(t)
  arraySim.array = array
}


