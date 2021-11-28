// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Shapes } from "../../../src/utils/shapes"
import { calculateFPS, showFPS } from "../../../src/utils/devdata"
import { Vector } from "../../../src/utils/vector"
import { Particle } from "../../../src/utils/gameobject"
import utils from "../../../src/utils/utils"
import { BezierCurve, BezierCurveForPoints, CubicBezierCurve } from "../../../src/utils/curves"
var canvas = document.getElementById("canvas") as HTMLCanvasElement
var context = globalThis.context = window.context = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.style.cursor = "none"
var height = canvas.height = window.innerHeight
var width = canvas.width = window.innerWidth
canvas.style.backgroundColor = "rgb(255,250,100)"
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

// document.body.onkeydown = function (e) {
//   switch (e.key) {
//     case "Q":
      

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


// quardic bezier curve
var particle1 = new Particle(new Vector(300, 300), 8, 1, "green")
var particle2 = new Particle(new Vector(400, 200), 8, 1, "green")
var particle3 = new Particle(new Vector(500, 300), 8, 1, "green")
var mouseParticle = new Particle(new Vector(mousex, mousey), 10, 1, "red")
var particles = [particle1, particle2, particle3]
var bezier = new BezierCurve(particle1.position, particle2.position, particle3.position)

// cubic bezier curve
var particle4 = new Particle(new Vector(700, 300), 8, 1, "green")
var particle5 = new Particle(new Vector(800, 200), 8, 1, "green")
var particle6 = new Particle(new Vector(900, 300), 8, 1, "green")
var particle7 = new Particle(new Vector(1000, 200), 8, 1, "green")
var particles2 = [particle4, particle5, particle6, particle7]
var cubicbeziere = new CubicBezierCurve(particle4.position, particle5.position, particle6.position, particle7.position)



var grabbedParticle = null

// draw text at the top right corner

Shape.setFont("bold 20px Arial")
function render() {
  
  Shape.clear()
  // Shape.drawText("Press Q for new Quadratic Curve", new Vector(width - 400, 50))
  // Shape.drawText("Press C for new Cubic Curve", new Vector(width - 400, 80))
  bezier.draw()
  cubicbeziere.draw()
  particles.forEach(particle => {
    particle.draw()
  })
  particles2.forEach(particle => {
    particle.draw()
  })



  mouseParticle.position.x = mousex
  mouseParticle.position.y = mousey
  mouseParticle.draw()

  var particle = mouseParticle.colidedWithParticleArray(particles) || mouseParticle.colidedWithParticleArray(particles2)
  if (particle) {
    particle.color = "red"
    if(mouseDown){
      grabbedParticle = particle
    }
  }else{
    particles.forEach(particle => {
      particle.color = "green"
    }
    )
    particles2.forEach(particle => {
      particle.color = "green"
    })
    
  }

  if(grabbedParticle){
    grabbedParticle.position.x = mousex
    grabbedParticle.position.y = mousey
    if(mouseUp){
      grabbedParticle = null
    }
  }



  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)