let mic;
let fft;
let vol;
let bandW;

const micOff = document.querySelector('#btn-off');
const micOn = document.querySelector('#btn-on');

let audioHistory = [];

function setup() {
  createCanvas(800,600);
  //colorMode(HSB);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  getAudioContext().resume();
  fft = new p5.FFT(.94, 1024);
  fft.setInput(mic);
  bandW = width / 1024;
}

function draw() {
  background(0);
  vol = mic.getLevel();
  let spectrum = fft.analyze();
  stroke(255, 0, 200);
  //noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i] / bandW * 1.5;
    let y = map(amp, 0, 580, height, 0);
    fill(height / i, i * vol, i * bandW);
    rect(i / bandW, y, i / bandW, y);
  }
  // console.log(spectrum);






  stroke(0, 255, 0);
  // noStroke();
  fill(0, vol*300, 0);
  ellipse(width / 2, height / 1.5, vol*400, vol*800);
  //audioHistory.push(vol);
  //console.log(audioHistory);
  //console.log(vol);
  translate(width / 2, height / 1.5);
  //noFill();
  fill(0, vol*300, vol*500);
  beginShape();
  for (let i = 0; i < 360; i++) {
    let amp = spectrum[i];
    let r = map(amp, (vol / 20) * (amp / vol), tan((i / 1000) / vol * 500), .04, 2);
    let x = r * cos(i);
    let y = r * sin(i);
    fill(height / i, i * vol, i * bandW);
    //let y = map(audioHistory[i], 0, 1, height/2, 0);
    vertex(x, y);
  }
  endShape();
  
  // if(audioHistory.length > 360) {
  //   audioHistory.splice(0, 1);
  // }
}

micOn.addEventListener('click', micStart);
function micStart() {
  userStartAudio();
}


micOff.addEventListener("click", micStop);
function micStop() {
  mic.stop();
}