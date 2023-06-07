//Glitter rain animation for Trio Tain

//moon
let a = 0;
let h1 = 0;


//star knot
let x = 0;
let y = 0;
let r = 200;
let c = 0;
let i = 0.01;
let k = 10;
let MIN = 0;
let MAX_1 = 400;
let inside = 0;
let outside = 255;
let deg = 0;
let alp = 0;
let grow = 0.005;

//glitter sky

let drips = [];
let MAX_2 = 100;

//CCapture
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  workersPath: 'js/',
  framerate: 10
});


function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(10);
  angleMode(RADIANS);
  
  
  for (var j = 0; j < 500; j++) {
		drips[j] = new Drip(random(width), random(height), random(5), random(90), random(180,360));
	}
}

function draw() {
  // background(0, 30);
  if (frameCount==1) capturer.start(); // start the animation capture
  background(0, 10);

  // moon();
  // starKnot();

  //glitter rain
  for (let i = 0; i < drips.length; i++) {
    drips[i].move();
    drips[i].edges();
		drips[i].show();
  }

  capturer.capture(document.getElementById('defaultCanvas0'));  
  if (frameCount==7200){
    save_record();
  }
  print(frameCount);
}

class Drip {
  constructor(x, y, r, sat, h){
    this.x = x;
    this.y = y;
    this.r = r;
    this.sat = sat;
    this.h = h;
    this.k = 0.5;
  }

  move() {
		// this.x = this.x + random(-0.5, 0.5);
		this.y = this.y + random(10);
	}

  edges(){
    if (this.x < 0){
      this.x = width;
    } else if (this.x > width){
      this.x = 0;
    }

    if (this.y < 0){
      this.y = height;
    } else if (this.y > height){
      this.y = 0;
      
    }

  }

	show() {
		noStroke();
    // stroke(0, 50);
    //fill(this.h, 100, random(100), 70);
    fill(this.h, this.sat, 100, random(100));
    // fill(255, 50);
		ellipse(this.x, this.y, random(this.r));
    this.sat+=this.k;

    if (this.sat <= MIN || this.sat >= MAX_2){
      this.k *= -1;
    }
	}
}

function star(){
  //circle star
  //fill(inside);
  noFill();
  // fill(255, random(10))
  stroke(180, 100, 100);
  alp+=0.01;

  beginShape();
  vertex(x-r+c, y);
  bezierVertex(x-r, y-110, x-110, y-r, x, y-r+c);
  bezierVertex(x+90, y-r, x+r, y-110, x+r-c, y);
  bezierVertex(x+r, y+90, x+90, y+r, x, y+r-c);
  bezierVertex(x-110, y+r, x-r, y+90, x-r+c, y);
  endShape();
  c += i;

  if (c <= MIN || c >= MAX_1){
    i *= -1;
    // inside = 255;
    // outside = 0;
    // x = random(width);
    // y = random(height);
  }

}


// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

function moon(){
  //moon
  let bg_color = color(0);
  let light_color = color(h1,80,20);
  let d2 = width/2;

  noStroke();
  ellipseMode(CENTER);
  a -= grow;      
  a %= -Math.PI*2;
  let phasex = width/2
  let phasey = height / 2;

  //stroke(255,0,255);
  line(phasex, 0, phasex, height);

  let color1 = color(360, 100, 100, 0); //red
  let color2 = color(0,25,25,0); //gray
  let color3 = color(0,25,25,0); //blue
  let color4 = color(0,25,25,0); //green

  if (-Math.PI/2 < a && a < 0) {
    color3 = light_color;
    color4 = light_color;
    color1 = light_color;
    color2 = bg_color;
  } else if (-Math.PI < a && a < -Math.PI/2) {
    color1 = light_color;
    color3 = bg_color;
    color4 = bg_color;
    color2 = bg_color;
  } else if (-3*Math.PI/2 < a && a < -Math.PI) {
    color4 = bg_color;
    color2 = light_color;
    color1 = bg_color;
    color3 = bg_color;
    
  } else if (-2*Math.PI < a && a < -3*Math.PI/2) {
    color4 = color(0,255,0,0);
    color3 = light_color;
    color1 = bg_color;
    color2 = light_color;
    
  }

  fill(color1);
  //let widthMoonPhase = map(Math.sin(a), -1, 1, -d2, d2);
  arc(phasex, phasey, d2, d2, PI/2, 3 * PI/2);
  fill(color2);
  arc(phasex, phasey, d2, d2, 3 * PI/2, PI/2);

  let heightPhase = d2;
  let widthPhase = map(Math.cos(a), 0, 1, 0, d2);

  fill(color3);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, PI/2, 3 * PI/2);
  fill(color4);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, 3 * PI/2, PI/2);
  h1 += 0.001;

  if (h1 >= 360){
    h1 = 0;
  }
}

function starKnot(){
  fill(255);
  noStroke();
  circle(width/2, height/2, random(4));
  strokeWeight(random(1))
  push();
  translate(width/2, height/2);
  rotate(deg);
  //1
  star();
  //2
  push();
  scale(random(0.48, 0.5));
  star();
  pop();
  //3
  push();
  scale(random(1.48, 1.5));
  star();
  pop();
  //4
  push();
  scale(2);
  star();
  pop();
  //5
  push();
  scale(2.25);
  star();
  pop();
  pop();
  deg += grow;
}

function save_record() {
  capturer.save();
}
