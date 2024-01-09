var count = 120;
var score = 0;
var random_objs = ["line", "candle", "pot", "tree", "cup"];
var currentobject = "";

function preload() {
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  background("white");

  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
  reset();
}

function reset() {
  document.querySelector("#timer p").innerHTML = "Time Left : 120 secs";
  document.querySelector("#score p").innerHTML = `Score : ${score}`;
  currentobject = random_objs[Math.floor(Math.random() * random_objs.length)];

  document.getElementById("label").innerHTML =
    "Sketch to be drawn : " + currentobject;
  count = 120;
  background("white");
}

const timer = setInterval(function () {
  count--;
  document.querySelector("#timer p").innerHTML = `Time Left : ${count} secs`;
  if (count === 0) {
    reset();
  }
}, 1000);
function draw() {
  strokeWeight(13);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
function classifyCanvas() {
  classifier.classify(canvas, gotResults);
}
function gotResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result);
  console.log(currentobject);
  labels = [];
  for (let i = 0; i < result.length; i++) {
    labels.push(result[i].label);
  }
  if (labels.includes(currentobject)) {
    score++;
    document.querySelector("#score p").innerHTML = `Score : ${score}`;
  }
  reset();
}

function clearCanvas() {
  background("white");
}
