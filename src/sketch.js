//Control Panel
let densityX = 20; // # of objects in each row
let densityY = 20; // # of objects in each column
let maxSpread = 5; // 0=uniform grid; controls the chaos
let defSize = 10; // Default Size in diameter
let sizeVariance = 40; // Chaotic size change
let static = true; // true=single RNG; false = RNG every frame

//Logs for corresponding RNG variables that we don't want changed every frame
let randomLogX = [];
let randomLogY = [];
let randomLogS = [];

let animationFrame = 0;
let animationPug = -400;
let animationEye = 0;
let Animate = false;

let headX = 100;
let headY = 300;
function setup() {
  // These lines are fitting our canvas
  // where we want in the DOM
  // so that we can manipulate its style
  // easier
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas-parent");
  randomLogger();
}

function randomLogger() {
  for (x = 0; x < densityX; x++) {
    for (y = 0; y < densityY; y++) {
      randomLogX[randomLogX.length] = random(-maxSpread, maxSpread);
      randomLogY[randomLogY.length] = random(-maxSpread, maxSpread);
      randomLogS[randomLogS.length] = random(-sizeVariance, sizeVariance);
    }
  }
}

function draw() {
  background(255);
  drawHead(headX, headY);
  drawBackground(200, 200, 0, 1, color(0), -0.03); // 2 backgrounds for
  drawBackground(200, 200, 0, 1, color(0), 0.1); //   spiral illusion
  if (Animate == false) {
    drawCreature(400, 300, color(224, 221, 1), color(224, 194, 0), -0.5);

    drawEye(-100, 100);
    //[Insert a Stationary Creature Function Here]
  } else {
    animationPug += 2;
    let animX = 0.00125 * animationPug ** 2 + 200;
    if (animationPug > 0) {
      animationEye += 1;
      drawCreature(animX, 300, color(224, 221, 1), color(224, 194, 0), 0.5);
      //[Insert Variable Animation Here]
    } else {
      drawCreature(animX, 300, color(224, 221, 1), color(224, 194, 0), -0.5);
    }
    drawEye(animationEye - 100, 100);
    //[Insert Function with Animated Parameters Here]
  }

  animationFrame++;
}

function drawBackground(tX, tY, rot, size, clr, anim) {
  push();
  // Last parameter "anim" allows for each background to have unique animations as it is the amplitude of the sinusoidal
  let animTrans = anim * sin(animationFrame / 200);
  noStroke();
  translate(width / 2, height / 2);
  scale(size + animTrans);
  rotate(rot + animTrans);
  fill(clr);

  let seed = 0; //Index defining the RNG of the current object
  for (x = 0; x < densityX; x++) {
    for (y = 0; y < densityY; y++) {
      let xCord = (width / densityX) * x - width / 2; //Makes equal rows
      let yCord = (height / densityY) * y - height / 2; // Makes equal columns

      if (static == true) {
        // Uses saved RNG values
        circle(
          xCord + randomLogX[seed],
          yCord + randomLogY[seed],
          defSize + randomLogS[seed]
        );
      } else {
        //Uses new RNG values every frame
        circle(
          xCord + random(-maxSpread, maxSpread),
          yCord + random(-maxSpread, maxSpread),
          defSize + randomLogS[seed]
        );
      }
      seed++;
    }
  }
  pop();
}

function drawCreature(xOffSet, yOffSet, mainColor, altColor, size) {
  push();
  translate(xOffSet, yOffSet);
  strokeWeight(0.5);
  scale(size, 0.5);

  //Body Components
  fill(altColor); // Light Peach Color
  ellipse(-300, 80, 20, 220); // Backleg #1
  ellipse(-225, 80, 20, 190); // Backleg #2

  //Frontleg #1
  push();
  translate(-80, 120); // Extra translation to offset rotation
  rotate(-35); //        around the origin
  ellipse(0, 0, 20, 150);
  pop(); // Push/Pop() to avoid transformation of other shapes

  //Frontleg #2
  push();
  translate(5, 120);
  rotate(35); // Same as other leg with opposing rotation
  ellipse(0, 0, 20, 150);
  pop();

  fill(mainColor); // Deeper peach color
  quad(50, 0, -300, -20, -300, 100, 30, 120); // BodyFrame

  //All Head Components
  fill(altColor); // Identical peach color
  circle(-15, -25, 180); // Headbase

  fill(100); // Dark Grey
  ellipse(0, 10, 120, 80); // Lower Snout

  fill(150); // Lighter Grey
  ellipse(0, 0, 150, 75); // Upper Snout

  fill(50); // Black
  triangle(0, -10, 10, 10, -10, 10); // Nose
  ellipse(30, -60, 30, 20); // Right Eye
  ellipse(-50, -60, 30, 20); // Left Eye

  fill(150); // Lighter Grey
  triangle(20, -95, 90, -60, 60, -100); // Right Ear
  triangle(-40, -95, -110, -50, -80, -100); // Left Ear

  //Line Details
  line(10, -90, 65, -65); // Upper Right Diagnal
  line(-25, -90, -80, -65); // Upper Left Diagnal
  line(10, -75, 10, -55); // Right Vertical
  line(-25, -75, -25, -55); // Left Vertical
  line(10, -55, 60, -30); // Lower Right Diagnal
  line(-25, -55, -80, -30); // Lower Left Diagnal

  //Tail
  fill(250, 220, 70); // Deeper Goldish Color
  ellipse(-300, -20, 50, 15); // Tail Base
  ellipse(-305, -25, 40, 10); // Tail Middle
  ellipse(-310, -28, 20, 5); // Tail Top
  pop();
}

function drawEye(x, y) {
  push();
  translate(x, y);

  //EyeBall
  fill(250);
  circle(0, 0, 200);

  //Iris
  fill(60, 20, 0);
  circle(0, 0, 100);
  fill(0);
  for (i = 0.5; i < PI * 2; i += PI / 2) {
    irisDetails(i);
  }
  for (i = 0; i < PI * 2; i += PI / 12) {
    irisLongLines(i / 2);
  }

  //Pupil
  fill(0);
  circle(0, 0, 50);

  //Vein #1
  stroke(255, 0, 0, 100);
  for (i = 0; i < PI * 2; i += PI / 4) {
    drawVein(i, 1);
  }

  function irisDetails(rot) {
    rotate(rot);
    triangle(0, 25, -3, 50, 3, 50);
  }

  function irisLongLines(rot) {
    rotate(rot);
    line(0, 25, 0, 50);
  }

  function drawVein(rot, size) {
    rotate(rot);
    scale(size);
    line(80, -10, 100, 0);
    line(80, -25, 95, -25);
    line(80, -10, 80, -25);
    line(80, -10, 70, -5);
    line(70, -5, 60, -15);
    line(80, -10, 60, -35);
    line(60, -35, 45, -30);
    line(60, -35, 70, -38);
    line(70, -38, 75, -42);
    line(75, -42, 90, -42);
  }
  pop();
}
function drawHead(x, y) {
  push();
  fill(204, 122, 122); //Skin Color
  translate(x, y);
  noStroke();

  //-----------Ears----------
  ellipse(60, 0, 20, 40);
  ellipse(-60, 0, 20, 40);

  //-----------Head----------
  ellipse(0, 0, 120, 160);

  //-----------Hair----------
  //Hair by ear
  push();
  fill(55, 29, 16);
  triangle(35, -35, 55, -35, 59, -10);
  triangle(-55, -35, -35, -35, -59, -10);
  pop();
  //Top part of hair
  push();
  stroke(55, 29, 16);
  strokeWeight(20);
  arc(0, -35, 90, 80, PI, 0);
  pop();

  //----------Lips---------
  push();
  fill(150, 0, 0);
  ellipse(0, 45, 50, 13);
  ellipse(0, 50, 50, 10);
  triangle(-22, 42, -22, 52, -30, 47.5);
  triangle(22, 42, 22, 52, 30, 47.5);
  stroke(0, 40);
  strokeWeight(1.5);
  line(-28, 47.5, 28, 47.5);
  pop();

  //---------------Nose--------
  push();
  stroke(0);
  strokeWeight(1.5);
  //Middle of nose
  arc(0, 27, 17, 10, 0, PI);
  //Left of Nose
  arc(-10, 25, 8, 10, PI / 2, (3 * PI) / 2);
  //Right of Nose
  arc(10, 25, 8, 10, -PI / 2, PI / 2);
  noFill();
  //Right Nose Bridge
  beginShape();
  curveVertex(7, 11);
  curveVertex(7, 11);
  curveVertex(7.5, 5);
  curveVertex(10, -1);
  curveVertex(10, -1);
  endShape();
  //Left Nose Bridge
  beginShape();
  curveVertex(-7, 11);
  curveVertex(-7, 11);
  curveVertex(-7.5, 5);
  curveVertex(-10, -1);
  curveVertex(-10, -1);
  endShape();
  pop();

  //-------------Eyes---------
  push();
  fill(250);
  //Right Eye
  ellipse(25, -10, 25, 12);
  //Left Eye
  ellipse(-25, -10, 25, 12);
  //Pupils
  push();
  fill(0);
  stroke(55, 29, 16, 200);
  strokeWeight(6);
  ellipse(25, -10, 8, 8);
  ellipse(-25, -10, 8, 8);
  pop();
  pop();

  //---------Eyebrows--------
  push();
  stroke(55, 29, 16);
  strokeWeight(4);
  //Right Eyebrow
  beginShape();
  curveVertex(11, -16);
  curveVertex(11, -16);
  curveVertex(26, -21);
  curveVertex(37, -19);
  curveVertex(37, -19);
  endShape();
  //Left Eyebrow
  beginShape();
  curveVertex(-11, -16);
  curveVertex(-11, -16);
  curveVertex(-26, -21);
  curveVertex(-37, -19);
  curveVertex(-37, -19);
  endShape();
  pop();
  pop();
}

function mousePressed() {
  if (mouseX > 375) {
    Animate = true;
  }
}
