window.onload = function () {
    globalThis.setup();
    function render(){
        globalThis.draw();
        requestAnimationFrame(render);
    }
    render();
};

