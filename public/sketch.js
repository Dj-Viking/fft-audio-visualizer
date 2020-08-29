let mic;
let fft;
let vol;
let bandW;

const micOff = document.querySelector('#btn-off');
const micOn = document.querySelector('#btn-on');

let audioHistory = [];

function setup() {
  createCanvas(600,600);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  getAudioContext().resume();
  fft = new p5.FFT(.9, 1024);
  fft.setInput(mic);
}

function draw() {
  background(0);
  vol = mic.getLevel();
  let spectrum = fft.analyze();
  stroke(255, 0, 200);
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 512, height, 0);
    line(i, height, i, y);
  }
  // console.log(spectrum);






  stroke(0, 255, 0);
  fill(0, 255, 0, .5);
  ellipse(300, 300, vol*400, vol*800);
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