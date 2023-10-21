//Control Panel
let densityX = 10 // # of objects in each row
let densityY = 10 // # of objects in each column
let maxSpread = 30 // 0=uniform grid; controls the chaos
let defSize = 2 // Default Size in diameter
let sizeVariance = 1 // Chaotic size change
let static = true // true=single RNG; false = RNG every frame

//Logs for corresponding RNG variables that we don't want changed every frame
let randomLogX = [];
let randomLogY = [];
let randomLogS = [];

let animationFrame = 0
let animationPug = -400
let animationEye = 0
let Animate = false

function setup() {
  // These lines are fitting our canvas
  // where we want in the DOM
  // so that we can manipulate its style
  // easier
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas-parent");
  randomLogger()
}

function randomLogger() {
  for (x=0; x<densityX; x++) {
    for (y=0;y<densityY; y++) {
      randomLogX[randomLogX.length] = random(-maxSpread,maxSpread)
      randomLogY[randomLogY.length] = random(-maxSpread,maxSpread)
      randomLogS[randomLogS.length] = random(-sizeVariance,sizeVariance)
    }
  }
}

function draw() {
  background(0);
  drawBackground(200,200,0,1,color(255),-0.03)// 2 backgrounds for
  drawBackground(200,200,0,1,color(255),0.1)//   spiral illusion
  if (Animate == false) {
    drawCreature(400,200,color(224,221,1),color(224,194,0), 0.5)

    drawEye(-100,100)
  } else {
    animationPug += 2
    if (animationPug > 0) {
      animationEye += 1
    }
    let animX = 0.00125*animationPug**2+200
    drawCreature(animX,200,color(224,221,1),color(224,194,0), 0.5)

    drawEye(animationEye-100,100)
  }

  animationFrame++
}

function drawBackground(tX,tY,rot,size,clr,anim){
  push();
  // Last parameter "anim" allows for each background to have unique animations as it is the amplitude of the sinusoidal
  let animTrans = anim*sin(animationFrame/200)
  noStroke()
  translate(width/2,height/2)
  scale(size+animTrans)
  rotate(rot+animTrans)
  fill(clr)
  
  let seed = 0 //Index defining the RNG of the current object
  for (x=0; x<densityX; x++) {
    for (y=0;y<densityY; y++) {
      let xCord = width/densityX*x-width/2 //Makes equal rows
      let yCord = height/densityY*y-height/2 // Makes equal columns
      
      if (static == true) { // Uses saved RNG values
        circle(xCord+randomLogX[seed],
             yCord+randomLogY[seed], defSize+randomLogS[seed])
      } else { //Uses new RNG values every frame
        circle(xCord+random(-maxSpread,maxSpread),
             yCord+random(-maxSpread,maxSpread),
              defSize+randomLogS[seed])
      }
      seed++
    }
  }
  pop();
}

function drawCreature(xOffSet,yOffSet,mainColor,altColor,size){
  push();
    translate(xOffSet,yOffSet);
    strokeWeight(0.5);
    scale(-size,size);
  
    //Body Components
    fill(altColor); // Light Peach Color
    ellipse(-300,80,20,220); // Backleg #1
    ellipse(-225,80,20,190); // Backleg #2
  
    //Frontleg #1
    push();
      translate(-80,120); // Extra translation to offset rotation
      rotate(-35); //        around the origin
      ellipse(0,0,20,150);
    pop(); // Push/Pop() to avoid transformation of other shapes
  
    //Frontleg #2
    push();
      translate(5,120);
      rotate(35); // Same as other leg with opposing rotation
      ellipse(0,0,20,150);
    pop();
  
    fill(mainColor); // Deeper peach color
    quad(50,0,-300,-20,-300,100,30,120); // BodyFrame
  
  
    //All Head Components
    fill(altColor); // Identical peach color
    circle(-15,-25, 180); // Headbase
  
    fill(100); // Dark Grey
    ellipse(0,10,120,80); // Lower Snout 

    fill(150); // Lighter Grey
    ellipse(0,0,150,75); // Upper Snout
  
    fill(50); // Black
    triangle(0,-10,10,10,-10,10); // Nose
    ellipse(30,-60,30,20); // Right Eye
    ellipse(-50,-60,30,20); // Left Eye
  
    fill(150); // Lighter Grey
    triangle(20,-95, 90, -60, 60, -100); // Right Ear
    triangle(-40,-95,-110,-50,-80,-100); // Left Ear 
  
    //Line Details
    line(10,-90,65,-65); // Upper Right Diagnal
    line(-25,-90,-80,-65); // Upper Left Diagnal
    line(10,-75,10,-55); // Right Vertical
    line(-25,-75,-25,-55); // Left Vertical
    line(10,-55,60,-30); // Lower Right Diagnal
    line(-25,-55,-80,-30); // Lower Left Diagnal
  
    //Tail
    fill(250, 220, 70); // Deeper Goldish Color
    ellipse(-300,-20,50,15); // Tail Base
    ellipse(-305,-25,40,10); // Tail Middle
    ellipse(-310,-28,20,5); // Tail Top
  pop();
}

function drawEye(x,y){
  push();
    translate(x,y)
    
  //EyeBall
    fill(250)
    circle(0,0,200)
  
  //Iris
    fill(60,20,0)
    circle(0,0,100)
    fill(0)
    for(i=0.5;i<PI*2;i+=PI/2) {
      irisDetails(i)
    }
    for(i=0;i<PI*2;i+=PI/12) {
      irisLongLines(i/2)
    }
  
  //Pupil
    fill(0)
    circle(0,0,50)
  
  //Vein #1
    stroke(255,0,0,100)
    for(i=0;i<PI*2;i+=PI/4){
      drawVein(i,1)
    }

    function irisDetails(rot){
      rotate(rot)
      triangle(0,25,-3,50,3,50)
    }
    
    function irisLongLines(rot){
      rotate(rot)
      line(0,25,0,50)
    }
    
    function drawVein(rot,size) {
      rotate(rot);
      scale(size);
      line(80,-10,100,0)
        line(80,-25,95,-25)
        line(80,-10,80,-25)
        line(80,-10,70,-5)
        line(70,-5,60,-15)
        line(80,-10,60,-35)
        line(60,-35,45,-30)
        line(60,-35,70,-38)
        line(70,-38,75,-42)
        line(75,-42,90,-42)
    }
  pop();
}

function mousePressed(){
  if (mouseX > 375){
    Animate = true
  }
}