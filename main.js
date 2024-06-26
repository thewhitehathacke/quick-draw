var scoreValue = 0;
var timerValue = 0;
var startTime;

function setup() {
  canvas = createCanvas(1000,900 );
 
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
  startTime = millis();
}

function clearCanvas() {
  background("white");
}

function preload() {
  classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
  strokeWeight(13);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  
  let currentTime = millis();
  let elapsedTime = (currentTime - startTime) / 1000; 
  document.getElementById('timerLabel').innerHTML = 'Time: ' + elapsedTime.toFixed(1) + 's';

}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
  document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

  // Calculate score based on confidence (for demonstration purposes)
  let confidenceScore = Math.round(results[0].confidence * 100);
  scoreValue += confidenceScore;
  document.getElementById('scoreLabel').innerHTML = 'Score: ' + scoreValue;

  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}
