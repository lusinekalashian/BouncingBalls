"use strict";
class Circle {
    constructor(x, y, radius, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy;
        this.color = getRandomColor();
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
    update() {
        const gravity = 0.2;
        this.dy += gravity;
        this.y += this.dy;
    }
    bounce(canvasHeight) {
        if (this.y + this.radius > canvasHeight) {
            this.y = canvasHeight - this.radius;
            this.dy *= -0.8;
        }
    }
}
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const canvas = document.getElementById("gravityCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const circles = [];
function spawnCircle(event) {
    const circle = new Circle(event.clientX, 0, 20, 0);
    circles.push(circle);
}
canvas.addEventListener("click", spawnCircle);
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        circle.update();
        circle.bounce(canvas.height);
        circle.draw(ctx);
        circle.color = getRandomColor();
    });
}
animate();
