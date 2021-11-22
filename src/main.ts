// import {Vector} from './helpers/vectors'

import { angleBetweenVectors, distanceBetweenVectors, getNewVelocityByAccelation, moveTowardVector, moveVectorByVelocity, VectorAround } from "./utils/vector";

import { rotateVector, translateVector } from "./utils/transformations";
import { calculateFPS, showFPS } from "./utils/devdata";
import {Vector} from './GraphicsEngine/index'

window.onload = function () {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement
  var context = canvas.getContext("2d") as CanvasRenderingContext2D
  canvas.style.cursor = "none"
  var height = canvas.height = window.innerHeight
  var width = canvas.width = window.innerWidth
  canvas.style.backgroundColor = "rgb(240,240,190)"
  canvas.style.cursor = "point"
  canvas.style.display = "block"
  var mousex = 0, mousey = 0
  canvas.addEventListener("mousemove", function (e) {
    var cRect = canvas.getBoundingClientRect()
    mousex = Math.round(e.clientX - cRect.left)
    mousey = Math.round(e.clientY - cRect.top)
    
  })
  
  var lasttime = performance.now()
 
 function render() { 
      context.clearRect(0, 0, width, height)
      shapes.drawPoint(context, new Vector(mousex, mousey), 6)
      shapes.drawPoint(context, new Vector(100, 100), 5, "red")
      shapes.drawPoint(context, new Vector(100, 100), 5, "red")
      shapes.drawPoint(context, new Vector(100, 100), 5, "red")
      shapes.drawPoint(context, new Vector(100, 100), 5, "red")

      var currenttime = performance.now()
      var fps = calculateFPS(lasttime, currenttime)
      showFPS(context, parseInt(fps.toString()), "red")
      lasttime = currenttime
      requestAnimationFrame(render)
  }
  render()
}