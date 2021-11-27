// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "./src/utils/shapes"
import { calculateFPS, showFPS } from "./src/utils/devdata"
import { Vector } from "./src/utils/vector"
import { Particle } from "./src/utils/gameobject"
import utils from "./src/utils/utils"

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

var initialVelocity = new Vector(0, 0)
// initialVelocity.setLength(10)
// initialVelocity.setAngle(-Math.PI / 2)
var particle = new Particle(new Vector(500, 400), 5, 1, "black", initialVelocity, "Particle");
var sun = new Particle(new Vector(width / 2, height / 2), 5, 15000, "yellow", new Vector(0, 0), "Sun");

particle.hasDefaultGravity = true

var particles: Particle[] = []
var mypos = new Particle(new Vector(mousex, mousey), 5, 1, "black", new Vector(0, 0), "Particle");





var initialVelocity = new Vector(0, 0)
initialVelocity.setLength(5)
initialVelocity.setAngle(-Math.PI / 4)

var sun = new Particle(new Vector(width / 2, height / 2), 5, 40000, "yellow", new Vector(0, 0), "Sun");
var planet = new Particle(new Vector(400, 300), 3, 1000, "green", initialVelocity, "Planet");

var points: Vector[] = [planet.position]
// planet.hasDefaultGravity = true
// the render function
function render() {
  
  Shape.clear()
  
  Shape.drawPoint(new Vector(mousex, mousey), 5)
  
  // mypos.draw()
  // mypos = new Particle(new Vector(mousex, mousey), 5, 20000, "black", new Vector(0, 0), "Particle");
  
  
  // Shape.drawCircle(particle.position, particle.width)
  


  
  Shape.setColor("blue")
  for (var i = 0; i < points.length; i++) {
    Shape.drawPoint(points[i], 1)
  }
  // console.log(points)
  points.push(new Vector(planet.position.x, planet.position.y))
  
  // if (points.length > 100) {
  //   points.shift()
  // }
  // Shape.drawPolygon(points)
  
  // if(points.length > 20){
  //   points.shift()
  // }


  sun.draw()
  planet.draw()
  
  planet.gravitateTo(sun)
  // sun.gravitateTo(planet)
  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)