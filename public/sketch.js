let businessImg;
let bigBusinessImg;
let maximusImg;
let thinkingImg;

let cursor;
let bigBusiness;
let businesses;
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

class BigBusinessStar {
  constructor(image) {
    this.x = windowWidth-bigBusinessImg.width-100;
    this.y = windowHeight-bigBusinessImg.height-100;
    this.image = image;
    this.r = 1.2*max(image.width, image.height)
  }

  draw() {
    fill('gold');
    strokeWeight(5);
    let rotateSpeed = millis() / 2000.0;
    let c;
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      rotateSpeed = millis() / 300.0;
      push();
      colorMode(HSB, 100);
      c = color(50+50*sin(millis()/300.0), 75, 100);
      pop();
    }

    push();
    translate(this.x, this.y);
    rotate(rotateSpeed);
    this.drawStar(0, 0, this.r, this.r/2, 9);
    pop();

    push();
    if (typeof c !== 'undefined') {
      tint(c);
    }
    image(this.image, this.x, this.y-16);
    noTint();
    pop();
  }

  // https://p5js.org/examples/form-star.html
  drawStar(x, y, radius1, radius2, npoints) {
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

  windowResized() {
    this.x = windowWidth-bigBusinessImg.width-100;
    this.y = windowHeight-bigBusinessImg.height-100;
  }
}

function preload() {
  businessImg = loadImage('business.png');
  // maximusImg = loadImage('maximus.webp');
  bigBusinessImg = loadImage('bigbusiness.webp');
  // thinkingImg = loadImage('thinking.webp');
}

function setup() {
  imageMode(CENTER);
  noCursor();
  cursor = new Cursor(businessImg);
  createCanvas(windowWidth, windowHeight);
  businesses = [];
  businesses.push(new BouncingImage(businessImg, windowWidth / 2, windowHeight / 2, random(-1, 1), random(-1, 1)));
  bigBusiness = new BigBusinessStar(bigBusinessImg);
}

function draw() {
  background(color('#ECEFF1'));
  for (let i = 0; i < businesses.length; i++) {
    businesses[i].draw();
  }

  // Big Business
  bigBusiness.draw();

  cursor.draw();
}

function mouseClicked() {
  if (dist(mouseX, mouseY, bigBusiness.x, bigBusiness.y) < bigBusiness.r) {
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
