var numParticles = 100;

var particles = [];

function Particle() {
    this.lifetime = 0.0;

    this.size = 0;
    this.speed = 0;

    this.posX = 0;
    this.posY = 0;

    this.velX = 0;
    this.velY = 0;

    this.init = particleInit;
}

function particleInit() {
    this.lifetime = 0.0;

    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() + 0.1;

    this.posX = Math.random() * window.innerWidth;
    this.posY = Math.random() * window.innerHeight;

    this.velX = Math.random() * 0.2 - 0.1;
    this.velY = Math.random() * 0.5 + 0.05;
}

function createParticles() {

    for (var i = 0; i < numParticles; i++) {
        particles[i] = new Particle();
        particles[i].init();
    }
}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numParticles; i++) {
        particles[i].lifetime += 0.01;
        if (particles[i].lifetime > 0.2) {
            particles[i].lifetime = 0.2;
        }

        particles[i].posX += particles[i].velX;
        particles[i].posY += particles[i].velY + scrollDelta * -0.5;

        if (particles[i].posY < -10) {
            particles[i].init();
        }
        if (particles[i].posY > canvas.height + 10) {
            particles[i].init();
        }

        ctx.beginPath();

        ctx.arc(particles[i].posX, particles[i].posY, particles[i].size, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = "rgba(255, 255, 255, " + particles[i].lifetime + ")";
        ctx.fill();
    }

    window.requestAnimationFrame(animateParticles);
}

var canvas, ctx;

$(document).ready(function () {
    canvas = document.getElementById("particles-canvas");
    ctx = canvas.getContext("2d");

    if (canvas.getContext) {
        
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
});