let mic;
let vol;


const micOff = document.querySelector('#btn-off');
const micOn = document.querySelector('#btn-on');

function setup() {
  createCanvas(400,400);
  background(200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  vol = mic.getLevel();
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