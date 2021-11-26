// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "./src/utils/shapes"
import { calculateFPS, showFPS } from "./src/utils/devdata"
import { Vector } from "./src/utils/vector"
var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = globalThis.context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "rgb(240,240,190)"
canvas.style.cursor = "point"
canvas.style.display = "block"

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


canvas.addEventListener("mousedown", function (e) {
  mouseDown = true
  mouseUp = false
})


canvas.addEventListener("mouseup", function (e) {
  mouseUp = true
  mouseDown = false
})

canvas.addEventListener("dblclick", function (e) {
  mouseDblClick = true
})

canvas.addEventListener("wheel", function (e) {
  mouseScroll = e.deltaY
})



// ends here


var lasttime = performance.now()

var Shape = new Shapes()

function render() {

  Shape.clear()
  Shape.setColor("black")

  if (mouseDown) {
    Shape.setColor("red")
  }
  Shape.drawPoint(new Vector(mousex, mousey), 2)

  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)