var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  var rn = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[rn];
  gamePattern.push(randomChosenColor);
}
