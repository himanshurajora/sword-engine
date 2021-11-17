// import {Vector} from './helpers/vectors'

import { angleBetweenVectors, Vector } from "./utils/vector";
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

  
    var points : Vector[] =[]
  
    for(var i = 0; i < 10000; i++) {
      var x = Math.random() * width
      var y = Math.random() * height
      points.push(new Vector(x, y))
    }
    
    var lasttime = performance.now()
    function render() {
      context.clearRect(0, 0, width, height)
      shapes.drawPoint(context, new Vector(mousex, mousey), 2, "black")
      // shapes.drawRectangle(context, new Vector(100, 100), 100, 100, "black", 10, true)
      // shapes.drawPolygon(context, [new Vector(100, 100), new Vector(200, 100), new Vector(200, 200), new Vector(100, 200), new Vector(400, 400)], "black", 1, true)
      // shapes.drawCircle(context, new Vector(200, 200), 100, "black", 1, true)
      // shapes.drawEllipse(context, new Vector(200, 200), 100, 50, "black", 1, true)
      // point1 = rotateVector(point1, Math.PI / 180)
      
      for(var i = 0; i < points.length; i++) {
        shapes.drawPoint(context, points[i], 2, "black")
        points[i] = translateVector(points[i], new Vector(Math.random() < 0.5 ? -0.5 : 0.5, Math.random() < 0.5 ? -0.5 : 0.5))
      }
      
      var currenttime = performance.now()
      var fps = calculateFPS(lasttime, currenttime)
      showFPS(context, parseInt(fps.toString()), "red")
      lasttime = currenttime
      requestAnimationFrame(render)
  }
  render()
}