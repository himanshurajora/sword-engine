// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "./src/utils/shapes"
import { calculateFPS, showFPS } from "./src/utils/devdata"
import { Vector } from "./src/utils/vector"
import { Particle } from "./src/utils/gameobject"
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
var sun = new Particle(new Vector(width/2, height/2), 5, 15000, "yellow", new Vector(0, 0), "Sun");

particle.hasDefaultGravity = true

var particles : Particle[] = []

for(var i = 0; i < 100; i++){
    var p = new Particle(new Vector(Math.random() * width, Math.random() * height), Math.random() * 5, Math.random() * 10, "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")", new Vector(0, 0), "Particle");
    p.hasDefaultGravity = true
    particles.push(p)
}

// the render function
function render() {


  Shape.clear()
  
  Shape.drawPoint(new Vector(mousex, mousey), 5)
  
  Shape.drawCircle(particle.position, particle.width)
  
  for(var i = 0; i < particles.length; i++){
    particles[i].draw()
    if(particles[i].position.y > height){
        particles.splice(i, 1)
        var p = new Particle(new Vector(Math.random() * width, 0), Math.random() * 5, Math.random() * 10, "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")", new Vector(0, 0), "Particle");
        p.hasDefaultGravity = true
        particles.push(p)
        
      }
  }
 
  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)