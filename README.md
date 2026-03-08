# Sign-Language-Recognition
A browser-based project that uses the webcam and hand-tracking to recognize simple sign language gestures. Uses MediaPipe Hands for detecting hand landmarks and a simple rule-based classifier to recognize letters.

## Overview

AI Sign Language Translator is a browser-based project that recognizes hand gestures and converts them into letters and sentences using computer vision and machine learning. The system detects hand landmarks from a webcam feed and predicts sign language gestures in real time.

The project uses **MediaPipe Hands** for hand tracking and **TensorFlow.js** for gesture classification. Recognized letters can be combined into words and spoken aloud using the browser's text-to-speech capability.

This project runs completely in the browser and does not require a backend server.

---

## Features

### Real-time Hand Tracking

The webcam captures the user’s hand and MediaPipe detects **21 hand landmarks** to understand finger positions.

### AI Gesture Recognition

A TensorFlow.js neural network classifies hand landmark data to recognize **A–Z sign language gestures**.

### Sentence Builder

Recognized letters can be added to build words and sentences.

Example:

HELLO
WORLD

### Voice Output

The browser's **SpeechSynthesis API** converts the generated sentence into speech.

Example output:

HELLO WORLD → spoken aloud.

### Gesture Training Mode

Users can train their own gesture dataset by collecting hand samples and retraining the model directly in the browser.

### Browser-based AI

Everything runs locally:

* No server
* No Python required
* Works with only HTML, CSS, and JavaScript.

---

## Technologies Used

* HTML5
* CSS3
* JavaScript
* TensorFlow.js
* MediaPipe Hands
* Web Speech API
* WebRTC (Webcam access)

---

## How It Works

1. The webcam captures live video.
2. MediaPipe detects **21 hand landmarks**.
3. Landmark coordinates are converted into numerical input.
4. TensorFlow.js model predicts the corresponding letter.
5. The detected letter appears on screen.
6. Users can add letters to build sentences.
7. Sentences can be spoken using text-to-speech.

Each hand produces **63 features**:

21 landmarks × 3 coordinates (x, y, z)

These features are fed into a neural network classifier.

---

## Neural Network Architecture

Input Layer
63 Features

Hidden Layers
128 Neurons (ReLU)
64 Neurons (ReLU)

Output Layer
26 Classes (Softmax)

A – Z gesture prediction.

---

## Project Structure

sign-language-ai

sl.html
sl.css
sl.js

model
model.json

dataset/


## Installation

1. Download or clone the repository

git clone https://github.com/yourusername/sign-language-ai.git

2. Open the project folder.

3. Run the project by opening:

index.html

4. Allow webcam access when prompted.

The application will start detecting hand gestures automatically.

---

## Training Your Own Model

To improve recognition accuracy:

1. Enter a gesture label (A–Z).
2. Click **Collect Sample**.
3. Collect multiple samples for each letter.
4. Click **Train Model**.

Recommended dataset size:

26 letters × 200 samples = 5200 samples.

---

## Example Workflow

1. Show gesture **H**
2. Show gesture **E**
3. Show gesture **L**
4. Show gesture **L**
5. Show gesture **O**

Sentence output:

HELLO

Click **Speak** to hear the result.

## Future Improvements

* Full ASL gesture dataset
* Word prediction using NLP
* Dynamic gesture recognition
* Save/load trained models
* Mobile support
* Sign language dictionary
* Gesture accuracy improvement
* Multi-hand gesture recognition
## Applications

* Communication assistance for deaf or mute individuals
* AI computer vision learning projects
* Gesture-controlled interfaces
* Educational tools for sign language learning
