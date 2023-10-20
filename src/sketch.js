function setup() {
  // These lines are fitting our canvas
  // where we want in the DOM
  // so that we can manipulate its style
  // easier
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas-parent");
}

function draw() {
  background(220);

  drawCreature(200,200,color(224,221,1),color(224,194,0), 0.5)

  drawEye(100,100)
}

function drawCreature(xOffSet,yOffSet,mainColor,altColor,size){
  push();
    translate(xOffSet,yOffSet);
    strokeWeight(0.5);
    scale(size);
  
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

