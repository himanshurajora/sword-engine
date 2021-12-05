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
import { Array1D, Array2D } from '../../../src/dsutils/array'
import * as esprima from 'esprima'

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


var program = `
const a = 10;
const b = 20;
`

var result = esprima.parseScript(program, {loc : true})
console.log(result)
function render() {

  Shape.clear()



  arr.draw()


  var currenttime = performance.now()
  var fps = calculateFPS(lasttime, currenttime)
  showFPS(parseInt(fps.toString()), "red")
  lasttime = currenttime
  shapeutils.drawPoint(new Vector(mousex, mousey), 3)
}


var arr = new Array2D([[]], 100, 100, 50, 50)
// knapsack algorithm with dynamic programming


function knapsack(items: Array<{ weight: number, value: number }>, capacity: number, step : number) {
  var n = items.length
  var w = capacity
  var K = utils.get2dArray(n + 1, w + 1)

  arr.array = K

  for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= w; j++) {
      if (i == 0 || j == 0) {
        K[i][j] = 0 
        arr.changeValue(i, j, 0)
      } else if (items[i - 1].weight <= j) {
        K[i][j] = Math.max(items[i - 1].value + K[i - 1][j - items[i - 1].weight], K[i - 1][j])
        arr.changeValue(i, j, K[i][j])
      } else {
        K[i][j] = K[i - 1][j]
        arr.changeValue(i, j, K[i][j])
      }
    }
  }


  console.log(K[n][w])
  return K;
}

// var K = knapsack([{ weight: 1, value: 10 }, { weight: 2, value: 20 }, { weight: 3, value: 30 }, { weight: 4, value: 40 }], 5)




