const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const letterDisplay = document.getElementById("letter");
const sentenceDisplay = document.getElementById("sentence");

let sentence = "";

let dataset = [];
let labels = [];

let model;

canvas.width = 640;
canvas.height = 480;

function flattenLandmarks(landmarks){

let arr = [];

for(let p of landmarks){

arr.push(p.x);
arr.push(p.y);
arr.push(p.z);

}

return arr;
}

function collectSample(){

const label = document.getElementById("gestureLabel").value;

if(!currentLandmarks) return;

dataset.push(flattenLandmarks(currentLandmarks));
labels.push(label);

alert("Sample Collected");

}

async function trainModel(){

const xs = tf.tensor(dataset);
const ys = tf.tensor(labels.map(l => l.charCodeAt(0)-65));

model = tf.sequential();

model.add(tf.layers.dense({units:128,inputShape:[63],activation:'relu'}));
model.add(tf.layers.dense({units:64,activation:'relu'}));
model.add(tf.layers.dense({units:26,activation:'softmax'}));

model.compile({
optimizer:'adam',
loss:'sparseCategoricalCrossentropy',
metrics:['accuracy']
});

await model.fit(xs,ys,{epochs:50});

alert("Training Complete");

}

let currentLandmarks=null;

async function predictGesture(landmarks){

if(!model) return;

const input = tf.tensor([flattenLandmarks(landmarks)]);

const prediction = model.predict(input);

const index = prediction.argMax(1).dataSync()[0];

const letter = String.fromCharCode(index+65);

letterDisplay.innerText = letter;

}

function addLetter(){

const letter = letterDisplay.innerText;

sentence += letter;

sentenceDisplay.innerText = sentence;

}

function speakSentence(){

const speech = new SpeechSynthesisUtterance(sentence);

speechSynthesis.speak(speech);

}

function clearSentence(){

sentence="";
sentenceDisplay.innerText="";
}

function onResults(results){

ctx.clearRect(0,0,canvas.width,canvas.height);

if(results.multiHandLandmarks){

for(const landmarks of results.multiHandLandmarks){

currentLandmarks = landmarks;

drawConnectors(ctx, landmarks, HAND_CONNECTIONS);
drawLandmarks(ctx, landmarks);

predictGesture(landmarks);

}

}

}

const hands = new Hands({
locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
maxNumHands:1,
minDetectionConfidence:0.7,
minTrackingConfidence:0.7
});

hands.onResults(onResults);

const camera = new Camera(video,{
onFrame: async ()=>{
await hands.send({image:video});
},
width:640,
height:480
});

camera.start();