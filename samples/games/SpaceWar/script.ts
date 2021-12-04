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

document.body.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      spaceShip.velocity.x = -2
      break
    case "ArrowRight":
      spaceShip.velocity.x = 2
      break
    case " ":
      bullets.push(new Particle(new Vector((spaceShip.position.x + spaceShip.width / 2), spaceShip.position.y), 3, 0, "yellow", new Vector(0, -3)))
      break

    default:
      break
  }
})

var gameStarted = false

document.body.addEventListener("keydown", function (e) {
  console.log(e.key)

})



// ends here


var lasttime = performance.now()

var Shape = new Shapes()



// write text press space to start

// grid.draw()


var startTime = performance.now()

var spaceShip = new Rectangle(new Vector(500, height-100), 80, 60, "red", new Vector(0, 0));
var bullets: Particle[] = []

var enemyShips: Rectangle[] = []

for (let i = 1; i <= 3; i++) {
  enemyShips.push(new Rectangle(new Vector(i * 200, 300), 100, 100, "blue"))
}

function render() {

  Shape.clear()

  spaceShip.draw()
  bullets.forEach(bullet => {
    const data = bullet.colidedWithRectArray(enemyShips)
    if (data[0]) {
      data[1].position.y = -100;
      data[1].position.x = -100;
      var heightz = Math.random() * height;
      enemyShips.push(new Rectangle(new Vector(Math.random() * width, heightz > spaceShip.position.y ? heightz - 500 : heightz), 100, 100, utils.getRandomColor()))
    }
    bullet.draw()
  })

  enemyShips.forEach(ship => {
    ship.draw()
  })

  // draw sunGravity text

  var currentTime = performance.now()





  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}

render()