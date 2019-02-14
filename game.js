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
  animateOnPress(this.id);
  userClickedPattern.push(this.id); //Storing User Input
  playSound(this.id);
  checkSequence(userClickedPattern.length - 1);
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

//Comparing User Input with Generated Sequence
function checkSequence(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    win = true;
  } else {
    win = false;
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
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  reset();
}

//Play Sound based on the button id/color
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
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
