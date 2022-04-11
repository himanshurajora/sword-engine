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

document.body.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      click--;
      break;
    case "ArrowRight":
      click++;
      break;
    case "ArrowUp":
      W++;
      future()
      break;
    case "ArrowDown":
      W--;
      future()
      break;
    default:
      break;
  }

})

var Shape = new Shapes()
var lasttime = performance.now()


var list = [
  { weight: 3, value: 2 },
  { weight: 4, value: 3 },
  { weight: 5, value: 4 },
  { weight: 6, value: 1 },
  { weight: 7, value: 5 },
];
// var list = [{weight : 1, value: 2}, {weight: 2, value: 3}]
var weights = list.map(x => x.weight)
var values = list.map(x => x.value)
// weights.unshift(0)
// values.unshift(0)
var W = 8
var click = 0
var s = performance.now()
var K = knapsack(list, W, click);
var answer = 0
var arr = new Array2D(K, 200, 100, 50, 50)
var warr = new Array1D(weights, 50, arr.y + arr.height * 1.5 + arr.padding * 15, 30, 50, "Vertical", "wt")
var varr = new Array1D(values, 100, arr.y + arr.height * 1.5 + arr.padding * 15, 30, 50, "Vertical", "p")
var message = "Knapsack Problem"


var Capacity = W
var Kt = knapsack(list, Capacity, Infinity)
var selectedItems = []


function render() {


  var e = performance.now()
  if (e - s >= 200) {
    Shape.clear()
    shapeutils.drawText(message, new Vector(arr.x, arr.y + arr.height - 50))
    arr.array = knapsack(list, W, click)
    arr.draw()
    warr.draw()
    varr.draw()
    // Draw The Solution
    shapeutils.drawText(`The Solution Should Be: ${answer}`, new Vector(arr.x, arr.height))
    shapeutils.drawText(`Selected Items: ${selectedItems.map((data) => `wt - ${data.weight} || p - ${data.value}`)}`, new Vector(arr.x, height - 150))
    
    
        // Instrucitons
        shapeutils.setColor("Green")
        shapeutils.drawText("Instructions:", new Vector(width / 2, height - 100))
        shapeutils.setColor("blue")
        shapeutils.drawText("Use the Up ⬆️ and Down ⬇️ arrow key to change the capacity of bag", Vector.createInstance(width / 2, height - 70))
        shapeutils.drawText("Use the Left ⬅️ and Right ➡️ to move to the next step", Vector.createInstance(width / 2, height - 40))
        s = e
  }
  
  
  // var currenttime = performance.now()
  // var fps = calculateFPS(lasttime, currenttime)
  // showFPS(parseInt(fps.toString()), "red")
  // lasttime = currenttime
  shapeutils.drawPoint(new Vector(mousex, mousey), 3)
  requestAnimationFrame(render)
}

function drawComparisonText(a, b) {
  var text = "Max of " + a + " and " + b + " is " + Math.max(a, b)
  shapeutils.setFillStyle("black")
  shapeutils.drawText(text, new Vector(30, 30))
}
future()
render()

function knapsack(items: Array<{ weight: number, value: number }>, capacity: number, step: number) {
  var currentstep = 0
  var n = items.length
  var w = capacity
  var K = utils.get2dArray(n + 1, w + 1) as any
  for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= w; j++) {
      currentstep++
      if (currentstep <= step) {
        if (i == 0 || j == 0) {
          K[i][j] = 0
          message = "Base Case : No Items or No Capacity"
        } else if (items[i - 1].weight <= j) {
          K[i][j] = Math.max(items[i - 1].value + K[i - 1][j - items[i - 1].weight], K[i - 1][j])
          var a = items[i - 1].value + K[i - 1][j - items[i - 1].weight]
          var b = K[i - 1][j]
          message = `the capacity ${j} can be fill with item ${i} which has weight ${items[i - 1].weight} and value ${items[i - 1].value}. The max value of ${a} and ${b} is ${Math.max(a, b)} so it is filled
          `
        } else {
          K[i][j] = K[i - 1][j]
          message = `the capacity ${j} is less item ${i}'s weight that is: ${items[i - 1].weight}`
        }
      } else {
        break;
      }
    }
  }
  return K;
}


function future() {
  Kt = knapsack(list, W, Infinity)
  answer = Kt[list.length][W]
  console.log(answer)
  selectedItems = []
  Capacity = W
  for (var i = list.length; i > 0; i--) {
    if (Kt[i][Capacity] != Kt[i - 1][Capacity]) {
      selectedItems.push(list[i - 1])
      Capacity -= list[i - 1].weight
    }
  }
  message = "0|1 Knapsack Problem"
}