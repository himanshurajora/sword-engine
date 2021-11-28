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


document.body.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      sunMass += 100
      imaginarySun.setMass(sunMass)
      break
    case "ArrowDown":
      sunMass -= 100
      imaginarySun.setMass(sunMass)
      break
    default:
      break
  }
})



// ends here


var lasttime = performance.now()

var Shape = new Shapes()

var sunMass = 10000

var initialVelocity = new Vector(0, 0)
initialVelocity.setLength(1)
initialVelocity.setAngle(-Math.PI / 2)

var moonInitialVelocity = new Vector(0, 0)
moonInitialVelocity.setLength(5)
moonInitialVelocity.setAngle(-Math.PI / 2)
// the render function
var sun = new Particle(new Vector(width / 2, height / 2), 30, 500, "yellow", new Vector(0, 0), "Sun");
var imaginarySun = new Particle(new Vector(width / 2, height / 2), 30, sunMass, "yellow", new Vector(0, 0), "ImaginarySun");
var earth = new Particle(new Vector(400, 400), 10, 1000, "green", initialVelocity, "Earth");
var moon = new Particle(new Vector(360, 430), 5, 1000, "white", moonInitialVelocity, "Moon");

var earthPoints: Vector[] = []
var moonPoints: Vector[] = []

var startPos = null
var endPos = null
var length = 0
var angle = 0

type Planet = {
  planet: Particle,
  points: Vector[]
}

var planets = [sun, earth, moon]
var extraPlanets: Planet[] = []
function render() {

  Shape.clear()

  // draw sunGravity text
  Shape.drawText(`sunMass: ${sunMass}`, new Vector(width - 200, 50))

  if (mouseDown && startPos == null) {
    startPos = new Vector(mousex, mousey)
    console.log(startPos)
  }

  if (mouseUp && startPos != null) {
    endPos = new Vector(mousex, mousey)
    console.log(endPos)
    Shape.setColor("red")
    Shape.drawLine(startPos, endPos)
    length = startPos.distanceTo(endPos) / 50
    angle = startPos.angleTo(endPos)

    if (length < 1) {
      length = 6
      angle = -Math.PI / 2
    }


    var initialVelocity = new Vector(0, 0)
    initialVelocity.setLength(length)
    initialVelocity.setAngle(angle)

    var pl = new Particle(startPos, 10, 100, "green", initialVelocity, "Planet");
    extraPlanets.push({ planet: pl, points: [] })

    startPos = null
    endPos = null

  }

  if (mouseDown && startPos != null) {
    endPos = new Vector(mousex, mousey)
    Shape.setStrokeStyle("red")
    Shape.drawLine(startPos, endPos)
  }





  planets.forEach(planet => {
    planet.draw()
  })

  extraPlanets.forEach(planet => {
    planet.points.push(new Vector(planet.planet.position.x, planet.planet.position.y))
    planet.planet.draw()
    planet.planet.gravitateTo(imaginarySun)
    // planet.planet.gravitateTo(earth)
    
    extraPlanets.forEach(otherPlanet => {
      if (planet.planet != otherPlanet.planet) {
        planet.planet.gravitateTo(otherPlanet.planet)
      }
    })

    // planet.planet.gravitateTo(moon)
    planet.points.forEach(point => {
      Shape.setStrokeStyle("red")
      Shape.drawPoint(point, 1)
    })

    if (planet.points.length > 50) {
      planet.points.shift()
    }

  })



  moonPoints.push(new Vector(moon.position.x, moon.position.y))
  earthPoints.push(new Vector(earth.position.x, earth.position.y))

  Shape.setColor("white")

  earthPoints.forEach(p => {
    Shape.drawPoint(p, 1)
  })
  moonPoints.forEach(p => {
    Shape.drawPoint(p, 1)
  })

  if (moonPoints.length > 100) {
    moonPoints.shift()
  }
  if (earthPoints.length > 100) {
    earthPoints.shift()
  }


  earth.gravitateTo(sun)
  moon.gravitateTo(earth)
  moon.gravitateTo(sun)

  Shape.drawPoint(new Vector(mousex, mousey), 5)

  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)