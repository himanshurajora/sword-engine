// import {Vector} from './helpers/vectors'
declare const window: Window & typeof globalThis & { context: CanvasRenderingContext2D }

import { Rectangle, Shapes } from "../../../src/utils/shapes"
import { calculateFPS, showFPS } from "../../../src/utils/devdata"
import { Vector } from "../../../src/utils/vector"
import { Particle } from "../../../src/utils/gameobject"
import utils from "../../../src/utils/utils"
import { Pipe } from "./flappy"
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

var gameStarted = false

document.body.addEventListener("keydown", function (e) {
  switch (e.key) {
    case ' ':
      flappyBird.velocity.y = -jumpPower
      break
    case 'Enter':
      if(!gameStarted){
        gameStarted = true
        render()
      }
      break
    default:
      break
  }
})



// ends here


var lasttime = performance.now()

var Shape = new Shapes()




var Pipes : Pipe[] = []

for (let i = 0; i < 8; i+=2) {
  let newpipe = new Pipe(new Vector(i * 200 + 700, Math.random()*height/2 + height/2), 50, Math.random() * height+ height/2, 300, new Vector(3,0), "Pipe")
  let newpipe2 = new Pipe(new Vector(newpipe.position.x, newpipe.position.y - newpipe.height - newpipe.gap), 50, newpipe.height, 300, new Vector(3,0), "Pipe")
  newpipe2.color = "green"
  newpipe.color = "green"
  Pipes.push(newpipe)
}


var flappyBird = new Particle(new Vector(500, height / 2), 20, 10, "red", new Vector(0, 0), "flappyBird")
flappyBird.hasDefaultGravity = true
flappyBird.terminalVelocity = 10
flappyBird.gvalue = 0.2
var jumpPower = 7

// write text press space to start
Shape.setFont("30px Arial")
Shape.setColor("rgb(140, 10, 40)")
Shape.drawText("Press Enter Key to Start", new Vector(600, height / 2))

function render() {

  Shape.clear()

  // draw sunGravity text
  Pipes.forEach(pipe => {
    pipe.update()
  })

  var colided = flappyBird.colidedWithRectArray(Pipes)
  if(colided[0]){
    colided[1].color = "red"
    colided[1].update()
    Shape.setFont("30px Arial")
    Shape.setColor("rgb(140, 10, 40)")
    Shape.drawText("Game Over", new Vector(600, height / 2))
    gameStarted = false
    colided[1].position.x -= 100
    return
  }

  flappyBird.draw()
  

  if (flappyBird.position.y > height || flappyBird.position.y < 0) {
    // end the game and come out of the function
    
    return
  }


  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}

