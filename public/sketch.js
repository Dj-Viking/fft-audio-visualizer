let mic;
let vol;
const micOff = document.querySelector('#btn-off');
const micOn = document.querySelector('#btn-on');

function setup() {
  createCanvas(400,400);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  vol = mic.getLevel();
  ellipse(200, 200, 400, vol*800);
  
  console.log(vol);
}

micOn.addEventListener('click', micStart);
function micStart() {
  userStartAudio();
}


micOff.addEventListener("click", micStop);
function micStop() {
  mic.stop();
}