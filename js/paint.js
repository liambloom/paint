"use strict";

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let brushSize = 5;
let prev;

canvasInit();

function canvasInit() {
    const img = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.putImageData(img, 0, 0);
    ctx.lineWidth = brushSize;
}

function point(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
}

function down(x, y) {
    point(x, y);
    prev = [x, y];
}

function move(x, y) {
    ctx.beginPath();
    ctx.moveTo(...prev);
    ctx.lineTo(x, y);
    ctx.stroke();
    point(x, y);
    prev = [x, y];
}

c.addEventListener("mousedown", event => {
    if (event.buttons === 1)
        down(event.clientX, event.clientY);
});

c.addEventListener("mousemove", event => {
    if (event.buttons === 1)
        move(event.clientX, event.clientY);
});

c.addEventListener("touchstart", event => {
    const touches = event.targetTouches[0];
    down(touches.clientX, touches.clientY);
});

c.addEventListener("touchmove", event => {
    const touches = event.targetTouches[0];
    move(touches.clientX, touches.clientY);
});

document.body.addEventListener("scroll", event => {
    throw new Error();
});

window.addEventListener("resize", canvasInit);