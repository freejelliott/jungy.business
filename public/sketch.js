let businessImg;
let bigBusinessImg;
let maximusImg;
let thinkingImg;

let bigBusinessPos;
let cursor;
let businesses;
let x;
let y;
let xdir;
let ydir;
let maxBusiness = 500;

class Cursor {
  constructor(image) {
    this.image = image;
  }

  draw() {
    push();
    translate(mouseX, mouseY);
    scale(0.85+0.15*sin(millis() / 400.0));
    rotate(millis() / 1000.0);
    tint(255, 126);
    image(this.image, 0, 0);
    noTint();
    pop();
  }
}

class BouncingImage {
  constructor(image, x, y, xdir, ydir) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.xdir = xdir;
    this.ydir = ydir;
  }

  draw() {
    this.x += 1*this.xdir;
    this.y += 1*this.ydir;
    if (this.x > (windowWidth-this.image.width) || this.x < 0) {
      this.xdir *= -1;
    }
    if (this.y > (windowHeight-this.image.height) || this.y < 0) {
      this.ydir *= -1;
    }
    image(this.image, this.x, this.y);
  }

  windowResized() {
    this.x = constrain(this.x, 0, windowWidth-this.image.width);
    this.y = constrain(this.y, 0, windowHeight-this.image.height);
  }
}

function preload() {
  businessImg = loadImage('business.png');
  // maximusImg = loadImage('maximus.webp');
  bigBusinessImg = loadImage('bigbusiness.webp');
  // thinkingImg = loadImage('thinking.webp');
}

function setup() {
  bigBusinessPos = createVector(windowWidth-bigBusinessImg.width-100, windowHeight-bigBusinessImg.height-100);
  imageMode(CENTER);
  noCursor();
  cursor = new Cursor(businessImg);
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
    businesses[i].draw();
  }

  // Big Business
  fill('gold');
  strokeWeight(5);
  r = 1.2*max(bigBusinessImg.width, bigBusinessImg.height);
  let rotateSpeed = millis() / 2000.0;
  let c;
  if (dist(mouseX, mouseY, bigBusinessPos.x, bigBusinessPos.y) < r) {
    rotateSpeed = millis() / 300.0;
    colorMode(HSB, 100);
    c = color(50+50*sin(millis()/300.0), 75, 100);
    colorMode(RGB, 100);
  }

  push();
  translate(bigBusinessPos.x, bigBusinessPos.y);
  rotate(rotateSpeed);
  star(0, 0, r, r/2, 9);
  pop();

  push();
  if (typeof c !== 'undefined') {
    tint(c);
  }
  image(bigBusinessImg, bigBusinessPos.x, bigBusinessPos.y-16);
  noTint();
  pop();

  cursor.draw();
}

function mouseClicked() {
  if (dist(mouseX, mouseY, bigBusinessPos.x, bigBusinessPos.y) < r) {
    window.open("https://medal.tv/games/valorant/clips/1iHiUG3zgwlZGy/YuGPGjsCxEHi?invite=cr-MSxUcDUsNjQxODAwMTUs");
  }

  if (businesses.length >= maxBusiness) {
    return;
  }
  xdir = random(-1, 1);
  ydir = random(-1, 1);
  businesses.push(new BouncingImage(businessImg, mouseX, mouseY, xdir, ydir));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < businesses.length; i++) {
    businesses[i].windowResized();
  }
}

// https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
