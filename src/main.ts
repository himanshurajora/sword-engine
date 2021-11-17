// import {Vector} from './helpers/vectors'

import { Vector } from "./utils/vector";
// function to draw polygon using given vertices
import * as shapes from "./utils/shapes";



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

  render()

  function render() {
      context.clearRect(0, 0, width, height)
      shapes.drawPoint(context, new Vector(mousex, mousey), 2, "black")
      // shapes.drawRectangle(context, new Vector(100, 100), 100, 100, "black", 10, true)
      shapes.drawPolygon(context, [new Vector(100, 100), new Vector(200, 100), new Vector(200, 200), new Vector(100, 200), new Vector(400, 400)], "black", 1, true)
      requestAnimationFrame(render)
  }
}