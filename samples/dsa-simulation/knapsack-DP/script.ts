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
import shapeutils from "../../../src/utils/shapeutils"
import {Array1D, Array2D} from '../../../src/dsutils/array'

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

var Shape = new Shapes()
var lasttime = performance.now()
var array = [10, 20, 30, 40, 50, 60]
var arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]
var arry2d = new Array2D(arr, 700, 100, 50, 50)

var arrvis = new Array1D(array, 100, 100, 50, 50)

var s = performance.now()
function render() {

  Shape.clear()

  // arrvis.draw()
  arry2d.draw()
  var e = performance.now()
  if(e- s > 1000){
    var val =  Math.random()*1000;
    arrvis.changeValue(1, val);
    console.log(val)
    s = e;
  }




  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  requestAnimationFrame(render)
}

render()