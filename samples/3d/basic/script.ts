// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "../../../src/utils/shapes"
import { calculateFPS, showFPS } from "../../../src/utils/devdata"
import { Vector } from "../../../src/utils/vector"
import { Particle } from "../../../src/utils/gameobject"
import utils from "../../../src/utils/utils"
import {Cube} from '../../../src/3dutils/Cube'
import {Vector3d} from '../../../src/3dutils/Vector3d'
var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = globalThis.context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D
import {matMul} from "../../../src/3dutils/Matrix"

canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "black"
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


document.body.addEventListener("keydown", function (e) {
  switch (e.key) {
    
  }
})



// ends here



var lasttime = performance.now()

var Shape = new Shapes()

var points : Vector3d[] = [];
points[0] = new Vector3d(-100, 100, 0)
points[1] = new Vector3d(100, 100, 0)
points[2] = new Vector3d(-100, -100, 0)
points[3] = new Vector3d(100, -100, 0)




function render() {
  Shape.clear()
  context.translate(width/2, height/2)
    
  
  points.forEach(p => {
        Shape.drawPoint(new Vector(p.x, p.y), 3)
    })
    
    
    context.translate(-width/2, -height/2)
    Shape.drawPoint(new Vector(mousex, mousey), 5)

  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)