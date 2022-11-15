let table;

let left;
let right;
let mode = 0;
let modeText = "Average";
let easing = 0.1;

let _val = [];
let _easeValNow = [];
let _easeValFut = [];

function preload(){
  table = loadTable('future_cities_data.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    textAlign(CENTER);
    strokeWeight(0);
    fill(0,0,255);

    // BUTTONS
    left = createButton('←');
    left.position(10, 10);
    left.mousePressed(goLeft);
    right = createButton('→');
    right.position(60, 10);
    right.mousePressed(goRight);
    left.style('background-color', 0);
    left.style('border-color', 'white');
    left.style('color', 'white');
    left.style('height', '40px');
    left.style('width', '40px');
    left.style('font-size', '20px');
    right.style('background-color', 0);
    right.style('border-color', 'white');
    right.style('color', 'white');
    right.style('height', '40px');
    right.style('width', '40px');
    right.style('font-size', '20px');

    // CHANGE VALUES TO BE INTEGERS, AS EASING WOULD NOT WORK OTHERWISE
    for(let j = 0; j<6;j++){
        _val[j] = [];
      for(let i = 1; i<20;i++){
        if(j==0){
          _val[j][i] = Math.round((table.get(i,9))*10);
        }else if(j==1){
          _val[j][i] = Math.round((table.get(i,10))*10);
        }else if(j==2){
          _val[j][i] = Math.round((table.get(i,19))*10);
        }else if(j==3){
          _val[j][i] = Math.round((table.get(i,20))*10);
        }else if(j==4){
          _val[j][i] = Math.round((table.get(i,15))*10);
        }else if(j==5){
          _val[j][i] = Math.round((table.get(i,16))*10);
        }
        _easeValNow[i] = _val[0][i];
        _easeValFut[i] = _val[0][i];
      }
    }
}
  
function draw() {
    background(0);

      // LEGEND
      push();
        textAlign(RIGHT);
        fill(36,0,255,100);
        circle(width-150,30,40);
        fill(0,224,255,100);
        circle(width-60,30,40);
        fill(255);
        textSize(20);
        text("today",width-100,38);
        text("2050",width-20,38);
      pop();

      // CREATE BUBBLES
      for(let i = 1; i<20;i++){
      // BUBBLES OF TODAY
      fill(0,224,255,100);
      _easeValNow[i] += (_val[mode][i] - _easeValNow[i]) * easing;
      circle(width/2,100*i,_easeValNow[i]);

      // BUBBLES OF 2050
      fill(36,0,255,100);
      _easeValFut[i] += (_val[mode+1][i] - _easeValFut[i]) * easing;
      circle(width/2,100*i,_easeValFut[i]);
      }

    // TEXT OF MODE
    fill(255);
    findMode();
    textSize(20);
    textAlign(LEFT);
    text(modeText,120,38);
    textAlign(CENTER);

    // SHOW VALUES FUNCTIONALITY
    if ((mouseX<120) && (mouseY>height-120)){
      for(let i = 1; i<20;i++){
        textSize(50);
        if(mode==0){
          text(Math.round(table.get(i,11) * 100) / 100,width/2,100*i);
        }else if(mode==2){
          text(Math.round(table.get(i,21) * 100) / 100,width/2,100*i);
        }else{
          text(Math.round(table.get(i,17) * 100) / 100,width/2,100*i);
        }
      }  
    }else{
      fill(255)
      for(let i = 1; i<20;i++){
        textSize(50);
        text(table.get(i,0),width/2,100*i);
      }
      textSize(20);
      text("→ Show difference",100,height-30);
    }
}

// LEFT ARROW BUTTON
function goLeft(){
  if(mode==0){
    mode = 4;
  }else{
    mode = mode - 2;
  }
}

// RIGHT ARROW BUTTON
function goRight(){
  if(mode==4){
    mode = 0;
  }else{
    mode = mode + 2;
  }
}

// CHANGE TEXT DEPENDING ON VALUE OF MODE
function findMode(){
  if(mode==0){
    modeText = "Average";
  }else if(mode==2){
    modeText = "Coldest";
  }else{
    modeText = "Warmest";
  }
}

// RESIZES CANVAS ON WINDOW RESIZE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}