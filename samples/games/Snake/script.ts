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

var gameStarted = false

document.body.addEventListener("keydown", function (e) {
  console.log(e.key)
  switch (e.key) {
    case 'ArrowUp':
      if (snakeVelocity.y != increase) {
        snakeVelocity.y = -increase
      }
      snakeVelocity.x = 0
      console.log("up")
      break
    case 'ArrowDown':
      if (snakeVelocity.y != -increase) {
        snakeVelocity.y = increase
      }
      snakeVelocity.x = 0
      break
    case 'ArrowLeft':
      if (snakeVelocity.x != increase) {
        snakeVelocity.x = -increase
      }

      snakeVelocity.y = 0
      break
    case 'ArrowRight':
      if (snakeVelocity.x != -increase) {
        snakeVelocity.x = increase
      }
      snakeVelocity.y = 0
      break
    case 'Enter':
      break
    default:
      break
  }
})



// ends here


var lasttime = performance.now()

var Shape = new Shapes()

var grid = new Grid(20, 20)

var snakeVelocity = new Vector(0, 0)
var increase = 1

// write text press space to start

// grid.draw()


var startTime = performance.now()


var snakeHead = new Vector(0, 0);
// console.log(x)
var food = new Vector(Math.floor(Math.random() * grid.width) + 10, Math.floor(Math.random() * grid.height) + 10)
var eaten = 0;
var points: Vector[] = []
var interval = 100
points.push(snakeHead)
console.log(snakeVelocity)
function render() {

  Shape.clear()


  // draw sunGravity text

  var currentTime = performance.now()


  grid.drawPoints(points)

  Shape.setColor("#000")
  grid.drawPoint(food)


  // for(var i = 1; i < points.length; i++){
  //   if(points[i].x == snakeHead.x && points[i].y == snakeHead.y){
  //     console.log("game over")
  //     break;
  //   }
  // }

  if (snakeHead.x == food.x && snakeHead.y == food.y) {
    eaten += 1
    food = new Vector(Math.floor(Math.random() * grid.width) + 10, Math.floor(Math.random() * grid.height) + 10)
    points.forEach(point => {
      if (point.x == food.x && point.y == food.y) {
        food = new Vector(Math.floor(Math.random() * grid.width) + 10, Math.floor(Math.random() * grid.height) + 10)
      }
    })
    points.push(new Vector(points[points.length - 1].x + snakeVelocity.x, points[points.length - 1].y + snakeVelocity.y))
  }

  for(let i = 2; i < points.length; i++){
    if(points[i].x == snakeHead.x && points[i].y == snakeHead.y){
      console.log("game over")
      break;
    }
  }




  if (currentTime - startTime > interval) {

    if(eaten > 10){
      interval = 40
    }

    if (snakeHead.x > width / grid.width) {
      snakeHead.x = 0
    }
    if (snakeHead.x < 0) {
      snakeHead.x = Math.floor(width / grid.width)
    }
    if (snakeHead.y > height / grid.height) {
      snakeHead.y = 0
    }
    if (snakeHead.y < 0) {
      snakeHead.y = Math.floor(height / grid.height)
    }


    snakeHead.add(snakeVelocity)
    if(eaten > 0){
      for (var i = points.length - 1; i > 0; i--) {
        points[i].x = points[i - 1].x
        points[i].y = points[i - 1].y
      }
    }
    startTime = currentTime
  }




  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}

render()