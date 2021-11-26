// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }
declare function setup(): void
declare function render(): void

import { calculateFPS, showFPS } from "./utils/devdata";
import { Vector } from './GraphicsEngine/index'
import { Shapes } from "./GraphicsEngine/shapes";

var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "rgb(240,240,190)"
canvas.style.cursor = "point"
canvas.style.display = "block"
var mousex = 0, mousey = 0
canvas.addEventListener("mousemove", function (e) {
  var cRect = canvas.getBoundingClientRect()
  mousex = Math.round(e.clientX - cRect.left)
  mousey = Math.round(e.clientY - cRect.top)

})

var lasttime = performance.now()

var Shape = new Shapes()
// function render() {

//   Shape.clear()

//   Shape.drawPoint(new Vector(mousex, mousey), 5)
//   Shape.setStrokeStyle(5, "red")
//   Shape.setLineCap("round")
//   Shape.drawLine(new Vector(mousex, mousey), new Vector(mousex + 100, mousey + 100))

//   var currenttime = performance.now()
//   var fps = calculateFPS(lasttime, currenttime)
//   showFPS(context, parseInt(fps.toString()), "red")
//   lasttime = currenttime
//   requestAnimationFrame(render)
// }

// }

setup()
requestAnimationFrame(render)