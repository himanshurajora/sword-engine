window.onload = function(){


var canvas = document.getElementById("canvas"),
 context = canvas.getContext("2d");
height = canvas.height = 600,
width = canvas.width = 1000;
canvas.style.backgroundColor = "#808080";
canvas.addEventListener("mousemove", function(e){
    var cRect = canvas.getBoundingClientRect(),
    canvasX = Math.round(e.clientX - cRect.left),
    canvasY = Math.round(e.clientY - cRect.top);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillText("X: "+ canvasX+ ", Y: "+ canvasY, 10,20);

});
// context.beginPath();
// context.moveTo(100,100);
// context.lineTo(200,200);
// context.stroke();


}
