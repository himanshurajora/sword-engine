var Button = {
    x: null,
    y: null,
    height: null,
    width: null,

    create: function(x,y, height, width){
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.height = height;
        obj.width = width;
        return obj;
    },
    getx: function(){
        return this.x;
    },
    gety: function(){
        return this.y;
    },
    getheight: function(){
        return this.height;
    },
    getwidth: function(){
        return this.width;
    }
}


var b1 = Button.create(10,10


// window.onload = function(){


// var canvas = document.getElementById("canvas"),
// context = canvas.getContext("2d");

// height = canvas.height = window.innerHeight,
// width = canvas.width = window.innerWidth;
// canvas.style.backgroundColor = "rgb(240,240,190)";

// context.translate(0, height/2);
// context.scale(1,-1);

// var x = 0;
// var y = 0;
// var speed = 1;

// render();

// function render(){
//     context.clearRect(0,0,width, height);
//     context.beginPath();
//     context.moveTo(0,0);
//     context.lineTo(x,y);
//     context.stroke();
//     x += speed;
//     y += speed;
    
//     requestAnimationFrame(render);
// }
// }










// canvas.addEventListener("mousemove", function(e){
//     var cRect = canvas.getBoundingClientRect(),
//     canvasX = Math.round(e.clientX - cRect.left),
//     canvasY = Math.round(e.clientY - cRect.top);
//     context.clearRect(0,0,canvas.width,canvas.height);
//     context.fillText("X: "+ canvasX+ ", Y: "+ canvasY, 10,20);
// });