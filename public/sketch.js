let businessImg;
let businesses;
let x;
let y;
let xdir;
let ydir;
let maxBusiness = 500;

class BouncingImage {
  constructor(image, x, y, xdir, ydir) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.xdir = xdir;
    this.ydir = ydir;
  }

  draw() {
    image(this.image, this.x, this.y);
  }

  step() {
    this.x += 1*this.xdir;
    this.y += 1*this.ydir;
    if (this.x > (windowWidth-this.image.width) || this.x < 0) {
      this.xdir *= -1;
    }
    if (this.y > (windowHeight-this.image.height) || this.y < 0) {
      this.ydir *= -1;
    }
  }
}

function preload() {
  businessImg = loadImage('business.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  businesses = [];
  x = windowWidth / 2;
  y = windowHeight / 2;
  xdir = random(-1, 1);
  ydir = random(-1, 1);
  businesses.push(new BouncingImage(businessImg, x, y, xdir, ydir));
}

function draw() {
  background(color('#ECEFF1'));
  for (let i = 0; i < businesses.length; i++) {
    businesses[i].step();
    businesses[i].draw();
  }
}

function mouseClicked() {
  if (businesses.length >= maxBusiness) {
    return;
  }
  xdir = random(-1, 1);
  ydir = random(-1, 1);
  businesses.push(new BouncingImage(businessImg, mouseX, mouseY, xdir, ydir));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  x = constrain(x, 0, windowWidth-business.width);
  y = constrain(y, 0, windowHeight-business.height);
}
