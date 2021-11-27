// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "../../../src/utils/shapes"
import { calculateFPS, showFPS } from "../../../src/utils/devdata"
import { Vector } from "../../../src/utils/vector"
import { Particle } from "../../../src/utils/gameobject"
import utils from "../../../src/utils/utils"
var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = globalThis.context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D

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



// ends here


var lasttime = performance.now()

var Shape = new Shapes()


var initialVelocity = new Vector(0, 0)
initialVelocity.setLength(1)
initialVelocity.setAngle(-Math.PI / 2)

var moonInitialVelocity = new Vector(0, 0)
moonInitialVelocity.setLength(5)
moonInitialVelocity.setAngle(-Math.PI / 2)
// the render function
var sun = new Particle(new Vector(width/2, height/2), 30, 500, "yellow", new Vector(0, 0), "Sun");
var earth = new Particle(new Vector(400, 400), 10, 1000, "green", initialVelocity, "Earth");
var moon = new Particle(new Vector(360, 430), 5, 1000, "white", moonInitialVelocity, "Moon");

var earthPoints  : Vector[]= []
var moonPoints : Vector[] = []
function render() {

  Shape.clear()

  sun.draw()
  earth.draw()
  moon.draw()

  moonPoints.push(new Vector(moon.position.x, moon.position.y))
  earthPoints.push(new Vector(earth.position.x, earth.position.y))

  earthPoints.forEach(p => {
    Shape.drawPoint(p, 1)
  })
  moonPoints.forEach(p => {
    Shape.drawPoint(p, 1)
  })

  if(moonPoints.length > 100){
    moonPoints.shift()
  }
  if(earthPoints.length > 100){
    earthPoints.shift()
  }
  

  earth.gravitateTo(sun)
  moon.gravitateTo(earth)

  Shape.drawPoint(new Vector(mousex, mousey), 5)
  
  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)