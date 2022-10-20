let data = [10,103,80,160,30,50];

function setup() {
    createCanvas(800, 800);
    rectMode(CENTER);
    noStroke();
    fill(0,0,255)
    }
  
  function draw() {
    background(0);
    for(let i=0;i<data.length;i++){
      rect(i*120+80,height/2,100,data[i]*2);
    }
    }