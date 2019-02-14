var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var win = false;

//Starting a Game
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//Adding Click Event to Buttons
$(".btn").click(function() {
  storeSequence(this.id);
  animateOnPress(this.id);
});

//Generating Next Random Sequence
function nextSequence() {
  var rn = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[rn];
  gamePattern.push(randomChosenColor);
  //Animating button according to the gamePattern
  $("#" + randomChosenColor).fadeOut(150);
  $("#" + randomChosenColor).fadeIn(150);
  playSound(randomChosenColor);
  level++;
  //Displaying Level in h1
  $("#level-title").text("Level " + level);
}

//Storing User Input
function storeSequence(color) {
  userClickedPattern.push(color);
  playSound(color);
  console.log("Game:" + gamePattern);
  console.log("User:" + userClickedPattern);
  var index = userClickedPattern.length - 1;
  checkSequence(index);
}

//Comparing User Input with Generated Sequence
function checkSequence(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    win = true;
    console.log("Right!");
  } else {
    win = false;
    console.log("Wrong!");
    wrongAns();
  }
  if (index + 1 === level && win === true) {
    userClickedPattern = [];
    console.log("Level Up!");
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function wrongAns() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  reset();
}

//Play Sound based on the button id/color
function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

//Animate Buttons
function animateOnPress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function reset() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
