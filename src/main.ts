// import {Vector} from './helpers/vectors'

import { angleBetweenVectors, distanceBetweenVectors, getNewVelocityByAccelation, moveTowardVector, moveVectorByVelocity, Vector, VectorAround } from "./utils/vector";
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
  var point2 = new Vector(mousex, mousey)

  console.log("angle is ; ", angleBetweenVectors(point1, new Vector(3, 3)))

  var points = [] as Vector[]


  for(var i = 0; i < 1000; i++){
    points.push(new Vector(Math.random() * width, Math.random() * height))
  }

  var velocity = new Vector(1, 1)
  
  function render() {
      
      requestAnimationFrame(render)
    }
    render()
  }