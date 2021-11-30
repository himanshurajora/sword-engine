// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Rectangle, Shapes } from "../../../src/utils/shapes"
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
canvas.style.backgroundColor = "white"
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
document.body.addEventListener("keydown", (e) => {
  keyPress = true
  switch (e.key) {
    case "ArrowUp":
      currentVelocity += 0.1
      break
    case "ArrowDown":
      currentVelocity -= 0.1
      break
    case "ArrowLeft":
      currentVelocityX -= 0.1
      break
    case "ArrowRight":
      currentVelocityX += 0.1
      break
    default:
      break
  }
})

document.body.onkeyup = function (e) {
  keyPress = false
}




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
  console.log(e)
})

var keyPress = false

// ends here


var lasttime = performance.now()

var Shape = new Shapes()



var raindrops: Particle[] = []

const newDrop = () => {
  var velocity = new Vector(0, Math.random() * 4 + 4);

  console.log(`rgb(${velocity.y * 10},${velocity.y * 10},${velocity.y * 10})`)
  var color1 = velocity.y > 6 ? `rgb(100, 100, ${velocity.y * 20})` : `skyblue`
  var dropwidth = velocity.y > 6 ? 2 : 1;
  var drop = new Particle(new Vector(Math.random() * width, Math.random() * height), dropwidth, 1, color1, new Vector(0, Math.random() * 4 + 4), "drop")
  raindrops.push(drop)
}

var currentVelocity = 0
var currentVelocityX = 0
for (var i = 0; i < 1000; i++) {
  newDrop()
}

var mouseAngle = Math.PI / 2
var mousePos = new Vector(0, 0)
// mousePos.setAngle(mouseAngle)
// mousePos.setLength(currentVelocity)
function render() {

  Shape.clear()

  raindrops.forEach(drop => {
    if (drop.position.y > height) {
      drop.position.y = 0
    } else if (drop.position.y < 0) {
      drop.position.y = height
    }

    if (drop.position.x > width) {
      drop.position.x = 0
    } else if (drop.position.x < 0) {
      drop.position.x = width
    }

    drop.position.y += currentVelocity
    drop.position.x += currentVelocityX
    // if(keyPress) {
    //   drop.position.x += currentVelocityX
    // }
    drop.drawLine(mouseAngle)
  })


  // point.rotateAround(0.1, new Vector(310, 310))
  // rect.draw()
  // rect.rotateAroundItsCenter(0.01)
  // rect.position.rotateAround(0.01, new Vector(rect.position.x + rect.width / 2, rect.position.y + rect.height / 2))

  // heading in center "Rain Simulator"
  context.font = "30px Arial"
  context.fillStyle = "black"
  context.fillText("Rain Simulator", width / 2 - 120, 50)


  // print current velocity
  context.font = "20px Arial"
  context.fillStyle = "black"
  context.fillText(`current velocity on Y axis: ${currentVelocity + 1}`, width - 300, 60)
  context.fillText(`current velocity on X axis: ${currentVelocityX}`, width - 300, 40)

  mousePos = new Vector(mousex, mousey)
  mouseAngle = mousePos.angleTo(new Vector(width / 2, height / 2))
  Shape.drawPoint(mousePos, 5)
 

  // print mouse angle 
  context.font = "20px Arial"
  context.fillStyle = "green"
  context.fillText(`Mouse Angle: ${mouseAngle * 180 / Math.PI}`, 10, 50)


  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}


requestAnimationFrame(render)