let mic;
let fft;
let vol;
const micOff = document.querySelector('#btn-off');
const micOn = document.querySelector('#btn-on');

let audioHistory = [];

function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  userStartAudio();
}

function draw() {
  background(0);
  vol = mic.getLevel();
  let spectrum = fft.analyze();
  //console.log(spectrum);
  stroke(0, 255, 0);
  fill(0, 255, 0);
  ellipse(200, 200, vol*400, vol*800);
  audioHistory.push(vol);
  //console.log(audioHistory);
  //console.log(vol);
  stroke(0, 255, 0);
  translate(width /2, height /2);
  noFill();
  beginShape();
  for (let i = 0; i < 360; i++) {
    let r = map(audioHistory[i], 0, 1, 10, 400);
    let x = r * cos(i);
    let y = r * sin(i);
    //let y = map(audioHistory[i], 0, 1, height/2, 0);
    vertex(x, y);
  }
  endShape();
  
  if(audioHistory.length > 360) {
    audioHistory.splice(0, 1);
  }
}

micOn.addEventListener('click', micStart);
function micStart() {
  userStartAudio();
}


micOff.addEventListener("click", micStop);
function micStop() {
  mic.stop();
}