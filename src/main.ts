// import {Vector} from './helpers/vectors'

import { Vector } from "./utils/vector";
import {drawFilledPolygon} from "./utils/shapes"
// function to draw polygon using given vertices




window.onload = function () {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement
  var context = canvas.getContext("2d") as CanvasRenderingContext2D
  
  var height = canvas.height = window.innerHeight
  var width = canvas.width = window.innerWidth
  canvas.style.backgroundColor = "rgb(240,240,190)"
  canvas.style.cursor = "point"
  var mousex = 0, mousey = 0
  canvas.addEventListener("mousemove", function (e) {
      var cRect = canvas.getBoundingClientRect()
      mousex = Math.round(e.clientX - cRect.left)
      mousey = Math.round(e.clientY - cRect.top)

  })

  render()

  function render() {
      context.clearRect(0, 0, width, height)
      drawFilledPolygon(context, [{ x: mousex, y: mousey }, { x: mousex + 10, y: mousey }, { x: mousex + 10, y: mousey + 10 }, { x: mousex, y: mousey + 10 }], "rgb(255,0,0)")
      requestAnimationFrame(render)
  }
}