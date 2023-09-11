let canvas;
let ctx;
let stars = [];
let factor = 113;
let speedSliders;
let width = 2000;
let height = 2950;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createVector(x, y, z) {
  return { x: x, y: y, z: z, pz: z };
}

function setup() {
  canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  // Create a slider, but for the sake of simplicity, this will be a basic range input
  speedSliders = document.createElement("input");
  speedSliders.type = "range";
  speedSliders.min = 0;
  speedSliders.max = 20;
  speedSliders.value = 3;
  speedSliders.step = 0.1;
  document.body.appendChild(speedSliders);

  for (let i = 0; i < 1000; i++) {
    stars.push(
      createVector(
        random(-width * factor, width * factor),
        random(-height * factor, height * factor),
        random(10, 400)
      )
    );
  }

  // Continuously draw
  requestAnimationFrame(draw);
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);

  for (let star of stars) {
    let x = star.x / star.z;
    let y = star.y / star.z;
    let px = star.x / star.pz;
    let py = star.y / star.pz;
    let d = ((star.z - 0) * (1 - 1)) / (400 - 0) + 1;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, d, 0, Math.PI * 0.3);
    ctx.fill();

    ctx.strokeStyle = "#505050";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(px, py);
    ctx.stroke();

    star.pz = star.z;
    star.z -= parseFloat(speedSliders.value);
    if (star.z < 10) {
      star.x = random(-width * factor, width * factor);
      star.y = random(-height * factor, height * factor);
      star.z = 400;
      star.pz = 400;
    }
  }

  ctx.translate(-width / 2, -height / 2);

  // Continuously draw
  requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", setup);
