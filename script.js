const width = 640;
const height = 640;
let startWidth = 640;
let minWidth = 6.25;
let container = document.getElementById("container");
//let arr = [-3,-2, -1, 1, 2,3];
let arr = [-3, -2, -1, 1, 2, 3];
//let arr = [-1,1];

let counter = 0;
//5/10/20/40/80/160/320/640

let ryb = [
  "#FE2712",
  "#FC600A",
  "#FB9902",
  "#FCCC1A",
  "#FEFE33",
  "#B2D732",
  "#66B032",
  "#347C98",
  "#0247FE",
  "#4424D6",
  "#8601AF",
  "#C21460"
];

let differenceColor = 10;

function drawCube(lenght, x, y, colour) {
  if (lenght > 4) {
    counter++;
    let colourNumber = Math.floor(Math.random() * ryb.length);
    colour = changeHue(ryb[colourNumber], randomIntFromInterval(-differenceColor, differenceColor));
    colour = pSBC((0.5 - Math.random())/2, colour);
    c = color(colour);
    //


    //
    c.setAlpha(255 - lenght / 1.2);
    fill(c);
    noStroke();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = lenght / 8;
    drawingContext.shadowColor = "rgba(0,0,0,0.25)";
    //blendMode(OVERLAY );
    drawShape(x, y, lenght,c);
    //square(x, y, lenght);
    
    //drawShape(x, y, lenght);

    colourNumber = (colourNumber + 6) % 12;
    colour = changeHue(ryb[colourNumber], randomIntFromInterval(-differenceColor, differenceColor));
    colour = pSBC((0.5 - Math.random()) / 2, colour);
    c = color(colour);
    c.setAlpha(255 - lenght / 4);
    fill(c)
    noStroke();
    //drawingContext.shadowOffsetX = lenght / 8;
    //drawingContext.shadowOffsetY = lenght / 8;
    //drawingContext.shadowBlur = lenght / 8;
    //drawingContext.shadowColor = "rgba(0,0,0,1)";
    //blendMode(BLEND );

    extra = randomIntFromInterval(-lenght/4, lenght/4);

    square(x + lenght / 4, y + lenght / 4, lenght/2);
    
    
    //blendMode(DIFFERENCE );
    let randomPlaceArray = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    shuffleArray(randomPlaceArray);

    let atimes = 2;

    if (lenght > 8) {
      atimes = 3;
    }
    if (lenght > 16) {
      atimes = 4;
    }
    if (lenght > 32) {
      atimes = 5;
    }

    for (let a = 0; a < atimes; a++) {
      //let randomx = arr[Math.floor(Math.random() * arr.length)];
      //let randomy = arr[Math.floor(Math.random() * arr.length)];
      let randomx = randomPlaceArray[a][0];
      let randomy = randomPlaceArray[a][1];
      //chose from random array
      x = x + (lenght / 2) * randomx;
      y = y + (lenght / 2) * randomy;
      if (x + lenght / 2 > 640) {
        x = 0;
      }
      if (y + lenght / 2 > 640) {
        y = 0;
      }
      if (x < 0) {
        x = 640 - lenght / 2;
      }
      if (y < 0) {
        y = 640 - lenght / 2;
      }
      drawCube(lenght / 2, x, y, colour);
    }
  }
}

function setup() {
  createCanvas(width, height);
  noStroke();
  noLoop();
}

function draw() {
  drawCube(1280, 0, 0, 0);
  document.getElementById("counter").innerHTML = counter;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function drawShape(x, y, lenght, colour) {
  lenght = lenght / 2;
  translate(x+lenght, y+lenght);
  noStroke();
  beginShape();
  //fill(colour)
  // Exterior part of shape, clockwise winding
  vertex(-lenght, -lenght);
  vertex(lenght, -lenght);
  vertex(lenght, lenght);
  vertex(-lenght, lenght);
  // Interior part of shape, counter-clockwise winding
  beginContour();
  vertex(-lenght/2, -lenght/2);
  vertex(-lenght/2, lenght/2);
  vertex(lenght/2, lenght/2);
  vertex(lenght/2, -lenght/2);
  endContour();
  endShape(CLOSE);
  translate(-x-+lenght, -y-+lenght);

}
