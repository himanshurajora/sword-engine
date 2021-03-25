// var Button = {
//     x: null,
//     y: null,
//     height: null,
//     width: null,
//     normal: "grey",
//     active: "green",
//     hover: "red",

//     create: function (x, y, height, width) {
//         var obj = Object.create(this);
//         obj.x = x;
//         obj.y = y;
//         obj.height = height;
//         obj.width = width;
//         return obj;
//     },
//     getx: function () {
//         return this.x;
//     },
//     gety: function () {
//         return this.y;
//     },
//     getheight: function () {
//         return this.height;
//     },
//     getwidth: function () {
//         return this.width;
//     }
// }

class Button {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.normal = "grey";
        this.hover = "red";
        this.active = "green";
    }
    setx(x) {
        this.x = x;
    }
    sety(y) {
        this.y = y;
    }
    setwidth(width) {
        this.width = width;
    }
    setheight(height) {
        this.height = height;
    }
    loop(context, mx, my) {

        context.fillRect(this.x, this.y, this.width, this.height);
        if (mx < this.x + this.width && mx > this.x && my < this.y + this.height && my > this.y) {
            context.fillStyle = this.hover;
            console.log(my, this.y);
        } else {
            context.fillStyle = this.normal;
        }
    }
}

var b1 = new Button(10, 10, 60, 150);
var b2 = new Button(10,80, 60,150);
var b3 = new Button(10,150, 60,150);

window.onload = function () {


    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");

    height = canvas.height = window.innerHeight,
        width = canvas.width = window.innerWidth;
    canvas.style.backgroundColor = "rgb(240,240,190)";
    var mousex = 0, mousey=0;
    canvas.addEventListener("mousemove", function (e) {
        var cRect = canvas.getBoundingClientRect();
        mousex = Math.round(e.clientX - cRect.left);
        mousey = Math.round(e.clientY - cRect.top);

    });

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        b1.loop(context, mousex, mousey);
        b2.loop(context, mousex, mousey);
        b3.loop(context, mousex, mousey);
        requestAnimationFrame(render);
    }
}