let business;
let x;
let y;
let xdir;
let ydir;
let xstep;
let ystep;

function preload() {
  business = loadImage('business.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = windowWidth / 2;
  y = windowHeight / 2;
  xdir = random(-1, 1);
  ydir = random(-1, 1);
  xstep = random(-5, 5);
  ystep = random(-5, 5);
  image(business, x, y);
}

function draw() {
  background(color('#ECEFF1'));
  image(business, x, y);
  x += 1*xdir;
  y += 1*ydir;
  if (x > (windowWidth-business.width) || x < 0) {
    xdir *= -1;
  }
  if (y > (windowHeight-business.height) || y < 0) {
    ydir *= -1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  x = constrain(x, 0, windowWidth-business.width);
  y = constrain(y, 0, windowHeight-business.height);
}
