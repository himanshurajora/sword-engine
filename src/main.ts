// import {Vector} from './helpers/vectors'

import { angleBetweenVectors, distanceBetweenVectors, moveTowardVector, Vector, VectorAround } from "./utils/vector";
// function to draw polygon using given vertices
import * as shapes from "./utils/shapes";
import { rotateVector, translateVector } from "./utils/transformations";
import { calculateFPS, showFPS } from "./utils/devdata";

var point1 = new Vector(100, 100);


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
  var point1 = new Vector(100, 100)
  var point2 = new VectorAround(10, 10, point1)

  console.log("angle is ; ",angleBetweenVectors(point1, new Vector(3, 3)))
  
    function render() {
      context.clearRect(0, 0, width, height)

      shapes.drawPoint(context, new Vector(mousex, mousey),1, "red")

      shapes.drawPoint(context, point1,2,"red")
      shapes.drawPoint(context, point2,2,"red")

      point2.setAngle(point2.getAngle() + 0.01)

      var currenttime = performance.now()
      var fps = calculateFPS(lasttime, currenttime)
      showFPS(context, parseInt(fps.toString()), "red")
      lasttime = currenttime
      requestAnimationFrame(render)
  }
  render()
}